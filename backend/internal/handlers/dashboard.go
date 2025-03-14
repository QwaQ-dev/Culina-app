package handlers

import (
	"encoding/json"
	"log/slog"
	"os"
	"strconv"

	"github.com/gofiber/fiber/v2"
	"github.com/qwaq-dev/culina/internal/repository"
	"github.com/qwaq-dev/culina/internal/repository/typesense"
	"github.com/qwaq-dev/culina/internal/service"
	"github.com/qwaq-dev/culina/pkg/logger/sl"
	"github.com/qwaq-dev/culina/structures"
)

type DashboardHandler struct {
	repo repository.DashboardRepository
	ts   typesense.Typesense
	log  *slog.Logger
}

func NewDashboardHandler(repo repository.DashboardRepository, log *slog.Logger, ts typesense.Typesense) *DashboardHandler {
	return &DashboardHandler{
		repo: repo,
		log:  log,
		ts:   ts,
	}
}

/*
	FORM-DATA{
		"name":"",
		"descr":"",
		"diff":"",
		"filters":["", ""],
		"images":"{auto}",
		"authorid":"from token",
		"ingredients":{"first":"ingr", },
		"steps":{"first":"step"},
	}
*/
func (h *DashboardHandler) CreateRecipe(c *fiber.Ctx) error {
	name := c.FormValue("name")
	descr := c.FormValue("descr")
	diff := c.FormValue("diff")
	authorId, _ := strconv.Atoi(c.FormValue("authorid"))

	var filters []string
	ingredients := make(map[string]string)
	steps := make(map[string]string)

	if err := json.Unmarshal([]byte(c.FormValue("filters")), &filters); err != nil {
		return c.Status(400).JSON(fiber.Map{
			"error": "Ivalid filers format",
		})
	}

	if err := json.Unmarshal([]byte(c.FormValue("ingredients")), &ingredients); err != nil {
		return c.Status(400).JSON(fiber.Map{
			"error": "Ivalid ingredients format",
		})
	}

	if err := json.Unmarshal([]byte(c.FormValue("steps")), &steps); err != nil {
		return c.Status(400).JSON(fiber.Map{
			"error": "Ivalid ingredients format",
		})
	}

	form, err := c.MultipartForm()
	if err != nil {
		return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{
			"error": "Invalid form data",
		})
	}

	imgs, dirName, err := service.UploadImagesForReceip(form, authorId, c)
	if err != nil {
		h.log.Error("error with directory", sl.Err(err))
		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{
			"error": "Error with creating directory",
		})
	}

	h.log.Info("", slog.Any("authorId", authorId))

	recipe := structures.Recipes{
		Name:        name,
		Descr:       descr,
		Diff:        diff,
		Filters:     filters,
		Imgs:        imgs,
		AuthorID:    authorId,
		Ingredients: ingredients,
		Steps:       steps,
	}

	id, err := h.repo.InsertRecipe(recipe, h.log)
	if err != nil {
		os.Remove(dirName)
		return c.Status(500).JSON(fiber.Map{"error": "Failed to save recipe"})
	}

	recipe.Id = id

	h.ts.AddRecipeToTypesense(recipe)

	return c.Status(fiber.StatusOK).JSON(fiber.Map{
		"message": "Recipe was upload successfully",
		"recipe":  recipe,
	})
}

/*
	JSON{
	    "review_text": "text",
	    "rating_value": 5,
	    "author_id": 1,
	    "recipe_id": 1
	}
*/
func (h *DashboardHandler) AddReview(c *fiber.Ctx) error {
	review := new(structures.Review)

	if err := c.BodyParser(review); err != nil {
		h.log.Error("Ivalid review format", sl.Err(err))
		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{
			"error": "Invalid review format",
		})
	}

	err := h.repo.InsertReview(*review, h.log)
	if err != nil {
		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{
			"error": "error with inserting review",
		})
	}

	return c.Status(fiber.StatusOK).JSON(fiber.Map{
		"message": "review sucessfully add",
	})
}

/*
	JSON{
		"filters":["", ""]
	}
*/
func (h *DashboardHandler) Filter(c *fiber.Ctx) error {
	req := struct {
		Filters []string `json:"filters"`
	}{}

	if err := c.BodyParser(&req); err != nil {
		return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{"error": "Invalid request params"})
	}

	recipes, err := h.ts.FilterByTypesense(req.Filters)
	if err != nil {
		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{"error": "Error with filter"})
	}

	return c.Status(fiber.StatusOK).JSON(fiber.Map{"filtered recipes": recipes})
}

func (h *DashboardHandler) SortBy(c *fiber.Ctx) error {
	return nil
}

func (h *DashboardHandler) SearchByTypesense(c *fiber.Ctx) error {
	searchText := c.Params("query")

	recipes, err := h.ts.SearchWithTypesense(searchText)
	if err != nil {
		h.log.Error("Error with searching", sl.Err(err))
		return err
	}

	return c.Status(fiber.StatusOK).JSON(fiber.Map{
		"recipes found": recipes,
	})
}

func (h *DashboardHandler) AllRecipes(c *fiber.Ctx) error {
	page, err := strconv.Atoi(c.Query("page", "1"))
	if err != nil || page < 1 {
		page = 1
	}

	pageSize, err := strconv.Atoi(c.Query("pageSize", "10"))
	if err != nil || page < 1 {
		pageSize = 10
	}

	recipes, err := h.repo.SelectAllRecipes(page, pageSize, h.log)
	if err != nil {
		h.log.Error("Error with getting all recipe", sl.Err(err))
		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{
			"error": "Error with getting recipe",
		})
	}

	return c.Status(fiber.StatusOK).JSON(fiber.Map{
		"page":     page,
		"pageSize": pageSize,
		"recipes":  recipes,
	})
}

func (h *DashboardHandler) RecipeById(c *fiber.Ctx) error {
	id, _ := strconv.Atoi(c.Params("id"))

	recipe, err := h.repo.SelectRecipeById(id, h.log)
	if err != nil {
		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{
			"error": "Error with getting recipe by id",
		})
	}

	return c.Status(fiber.StatusOK).JSON(fiber.Map{
		"recipe": recipe,
	})
}
