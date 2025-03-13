package typesense

import (
	"context"
	"encoding/json"
	"log/slog"
	"strings"

	"github.com/gofiber/fiber/v2/log"
	"github.com/qwaq-dev/culina/internal/repository/postgres"
	"github.com/qwaq-dev/culina/pkg/config"
	"github.com/qwaq-dev/culina/pkg/logger/sl"
	"github.com/qwaq-dev/culina/structures"
	"github.com/typesense/typesense-go/v3/typesense"
	"github.com/typesense/typesense-go/v3/typesense/api"
	"github.com/typesense/typesense-go/v3/typesense/api/pointer"
)

type Typesense struct {
	dashboardRepo postgres.PostgresDashboardRepository
	log           *slog.Logger
	cfg           config.Typesense
}

func NewTypesense(repo postgres.PostgresDashboardRepository, log *slog.Logger, cfg config.Typesense) *Typesense {
	return &Typesense{
		dashboardRepo: repo,
		log:           log,
		cfg:           cfg,
	}
}

func (t *Typesense) ConnectToTypesense() error {
	client := typesense.NewClient(
		typesense.WithServer(t.cfg.Host),
		typesense.WithAPIKey(t.cfg.APIKey),
	)

	schema := &api.CollectionSchema{
		Name: "recipes",
		Fields: []api.Field{
			{Name: "id", Type: "string"},
			{Name: "name", Type: "string", Index: pointer.True(), Locale: pointer.String("Ru")},
			{Name: "descr", Type: "string", Index: pointer.True(), Locale: pointer.String("Ru")},
			{Name: "diff", Type: "string"},
			{Name: "filters", Type: "string[]", Facet: pointer.True()},
			{Name: "imgs", Type: "string"},
			{Name: "authorid", Type: "string"},
			{Name: "ingredients", Type: "string"},
			{Name: "steps", Type: "string"},
			{Name: "review_count", Type: "int32"},
			{Name: "avg_rating", Type: "float"},
		},
	}

	_, err := client.Collections().Create(context.Background(), schema)
	if err != nil {
		client.Collection("recipes").Delete(context.Background())
	}

	collections, err := client.Collections().Create(context.Background(), schema)
	if err != nil {
		return err
	}
	collectionsJSON, err := json.MarshalIndent(collections.Name, "", "  ")
	if err != nil {
		log.Error("Error marshalling collections:", sl.Err(err))
		return err
	}

	t.log.Info("Collection", slog.String("Name:", string(collectionsJSON)))

	recipes, err := t.dashboardRepo.SelectAllRecipes(1, 10000000000, t.log)
	if err != nil {
		t.log.Error("Error with selecting recipes")
		return err
	}

	for _, recipe := range recipes {
		typesenseRecipe, err := recipe.ToTypesense()
		if err != nil {
			t.log.Error("Error converting recipe to Typesense format", sl.Err(err))
			continue
		}

		res, err := client.Collection("recipes").Documents().Create(context.Background(), typesenseRecipe, &api.DocumentIndexParameters{})
		if err != nil {
			t.log.Error("Error inserting recipe into Typesense", sl.Err(err))
		} else {
			jsonRes, _ := json.MarshalIndent(res, "", "  ")
			t.log.Info("Successfully inserted recipe into Typesense", slog.String("response", string(jsonRes)))
		}
	}

	return nil
}

func (t *Typesense) AddRecipeToTypesense(recipe structures.Recipes) error {
	client := typesense.NewClient(
		typesense.WithServer(t.cfg.Host),
		typesense.WithAPIKey(t.cfg.APIKey),
	)

	typesenseRecipe, err := recipe.ToTypesense()
	if err != nil {
		return err
	}

	res, err := client.Collection("recipes").Documents().Create(context.Background(), typesenseRecipe, &api.DocumentIndexParameters{})
	if err != nil {
		t.log.Error("Error inserting recipe into Typesense", sl.Err(err))
	} else {
		jsonRes, _ := json.MarshalIndent(res, "", "  ")
		t.log.Info("Successfully inserted recipe into Typesense", slog.String("response", string(jsonRes)))
	}

	return nil
}

func (t *Typesense) SearchWithTypesense(query string) ([]structures.TypesenseRecipe, error) {
	client := typesense.NewClient(
		typesense.WithServer(t.cfg.Host),
		typesense.WithAPIKey(t.cfg.APIKey),
	)

	searchParameters := &api.SearchCollectionParams{
		Q:       pointer.String(query),
		QueryBy: pointer.String("name,descr"),
	}

	res, err := client.Collection("recipes").Documents().Search(context.Background(), searchParameters)
	if err != nil {
		t.log.Error("Error searching in Typesense", sl.Err(err))
		return nil, err
	}

	if res.Hits == nil {
		t.log.Warn("No results found in Typesense")
		return []structures.TypesenseRecipe{}, nil
	}

	// Разыменовываем указатель
	hits := *res.Hits

	recipes := make([]structures.TypesenseRecipe, len(hits))
	for i, hit := range hits {
		if hit.Document == nil {
			t.log.Error("Search result document is nil")
			continue
		}

		doc := *hit.Document // Разыменовываем указатель

		recipe := structures.TypesenseRecipe{
			Id:           getString(doc, "id"),
			Name:         getString(doc, "name"),
			Descr:        getString(doc, "descr"),
			Diff:         getString(doc, "diff"),
			Filters:      toStringSlice(doc["filters"]),
			Imgs:         getString(doc, "imgs"),
			AuthorID:     getString(doc, "authorid"),
			Ingredients:  getString(doc, "ingredients"),
			Steps:        getString(doc, "steps"),
			Review_count: getInt(doc, "review_count"),
			Avg_rating:   getFloat(doc, "avg_rating"),
		}

		recipes[i] = recipe
	}

	log.Info(recipes)

	return recipes, nil
}

func (t *Typesense) FilterByTypesense(filters []string) ([]structures.TypesenseRecipe, error) {
	client := typesense.NewClient(
		typesense.WithServer(t.cfg.Host),
		typesense.WithAPIKey(t.cfg.APIKey),
	)

	searchParameters := &api.SearchCollectionParams{
		Q:       pointer.String(strings.Join(filters, " ")), // Поиск всех элементов
		QueryBy: pointer.String("filters"),
	}

	res, err := client.Collection("recipes").Documents().Search(context.Background(), searchParameters)
	if err != nil {
		t.log.Error("Ошибка при фильтрации в Typesense", sl.Err(err))
		return nil, err
	}

	if res.Hits == nil {
		t.log.Warn("Фильтр не дал результатов")
		return nil, nil
	}

	recipes := make([]structures.TypesenseRecipe, len(*res.Hits))
	for i, hit := range *res.Hits {
		if hit.Document == nil {
			t.log.Error("Документ в результате поиска пуст")
			continue
		}

		doc := *hit.Document
		recipes[i] = structures.TypesenseRecipe{
			Id:           getString(doc, "id"),
			Name:         getString(doc, "name"),
			Descr:        getString(doc, "descr"),
			Diff:         getString(doc, "diff"),
			Filters:      toStringSlice(doc["filters"]),
			Imgs:         getString(doc, "imgs"),
			AuthorID:     getString(doc, "authorid"),
			Ingredients:  getString(doc, "ingredients"),
			Steps:        getString(doc, "steps"),
			Review_count: getInt(doc, "review_count"),
			Avg_rating:   getFloat(doc, "avg_rating"),
		}
	}

	return recipes, nil
}

func getString(doc map[string]interface{}, key string) string {
	if v, ok := doc[key].(string); ok {
		return v
	}
	return ""
}

func getInt(doc map[string]interface{}, key string) int {
	if v, ok := doc[key].(float64); ok {
		return int(v)
	}
	return 0
}

func getFloat(doc map[string]interface{}, key string) float32 {
	if v, ok := doc[key].(float64); ok {
		return float32(v)
	}
	return 0
}

func toStringSlice(value interface{}) []string {
	if value == nil {
		return nil
	}
	interfaceSlice, ok := value.([]interface{})
	if !ok {
		return nil
	}
	strSlice := make([]string, len(interfaceSlice))
	for i, v := range interfaceSlice {
		strSlice[i] = v.(string)
	}
	return strSlice
}
