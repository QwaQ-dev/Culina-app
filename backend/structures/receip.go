package structures

import (
	"encoding/json"
	"strconv"
)

type Recipes struct {
	Id           int               `json:"id"`
	Name         string            `json:"name"`
	Descr        string            `json:"descr"`
	Diff         string            `json:"diff"` //difficult
	Filters      []string          `json:"filters"`
	Imgs         map[string]string `json:"imgs"`
	AuthorID     int               `json:"authorid,omitempty"`
	AuthorName   string            `json:"author_name"`
	Ingredients  map[string]string `json:"ingredients"`
	Steps        map[string]string `json:"steps"`
	Review_count int               `json:"review_count,omitempty"`
	Avg_rating   float32           `json:"avg_rating,omitempty"`
	Reviews      []Review          `json:"reviews,omitempty"`
	Created_at   string            `json:"created_at,omitempty"`
}

type TypesenseRecipe struct {
	Id           string   `json:"id"`
	Name         string   `json:"name"`
	Descr        string   `json:"descr"`
	Diff         string   `json:"diff"`
	Filters      []string `json:"filters"`
	Imgs         string   `json:"imgs"`
	AuthorID     string   `json:"authorid"`
	Ingredients  string   `json:"ingredients"`
	Steps        string   `json:"steps"`
	Review_count int      `json:"review_count"`
	Avg_rating   float32  `json:"avg_rating"`
}

func (r Recipes) ToTypesense() (*TypesenseRecipe, error) {
	imgsJSON, err := json.Marshal(r.Imgs)
	if err != nil {
		return nil, err
	}
	ingredientsJSON, err := json.Marshal(r.Ingredients)
	if err != nil {
		return nil, err
	}
	stepsJSON, err := json.Marshal(r.Steps)
	if err != nil {
		return nil, err
	}

	return &TypesenseRecipe{
		Id:           strconv.Itoa(r.Id),
		Name:         r.Name,
		Descr:        r.Descr,
		Diff:         r.Diff,
		Filters:      r.Filters,
		Imgs:         string(imgsJSON),
		AuthorID:     strconv.Itoa(r.AuthorID),
		Ingredients:  string(ingredientsJSON),
		Steps:        string(stepsJSON),
		Review_count: r.Review_count,
		Avg_rating:   r.Avg_rating,
	}, nil
}
