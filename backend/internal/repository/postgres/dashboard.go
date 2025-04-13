package postgres

import (
	"database/sql"
	"encoding/json"
	"fmt"
	"log/slog"
	"sync"

	"github.com/qwaq-dev/culina/pkg/logger/sl"
	"github.com/qwaq-dev/culina/structures"
)

type PostgresDashboardRepository struct {
	DB *sql.DB
}

func (p *PostgresDashboardRepository) InsertRecipe(recipe structures.Recipes, log *slog.Logger) (int, error) {
	var recipeId int

	ingredientsJSON, _ := json.Marshal(recipe.Ingredients)
	stepsJSON, _ := json.Marshal(recipe.Steps)
	imagesJSON, _ := json.Marshal(recipe.Imgs)
	filtersJSON, _ := json.Marshal(recipe.Filters)

	query := `INSERT INTO recipes (name, descr, diff, filters, ingredients, steps, author_id, imgs) 
          VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING id`

	err := p.DB.QueryRow(query, recipe.Name, recipe.Descr, recipe.Diff, string(filtersJSON), string(ingredientsJSON), string(stepsJSON), recipe.AuthorID, string(imagesJSON)).Scan(&recipeId)
	if err != nil {
		log.Error("Error with inserting data", sl.Err(err))
		return 0, err
	}

	recipe.Id = recipeId

	log.Info("Recipe was upload to db", slog.Any("recipe", recipe))

	return recipeId, nil
}

func (p *PostgresDashboardRepository) SelectAllRecipes(page, pageSize int, log *slog.Logger) ([]structures.Recipes, error) {
	var recipes []structures.Recipes

	offset := (page - 1) * pageSize

	query := `SELECT r.id, r.name, r.descr, r.diff, r.filters, r.imgs, r.author_id, 
                 r.ingredients, r.steps, r.created_at, r.review_count, r.avg_rating, u.username
          	  FROM recipes r
          	  JOIN users u ON r.author_id = u.id
         	  ORDER BY r.id DESC
         	  LIMIT $1 OFFSET $2`

	rows, err := p.DB.Query(query, pageSize, offset)
	if err != nil {
		log.Error("Error with selecting recipes", sl.Err(err))
		return nil, err
	}
	defer rows.Close()

	recipesMap := make(map[int]*structures.Recipes)
	var recipeIds []int

	for rows.Next() {
		var recipe structures.Recipes
		var filtersJSON, imgsJSON, ingredientsJSON, stepsJSON []byte

		err := rows.Scan(&recipe.Id, &recipe.Name, &recipe.Descr, &recipe.Diff,
			&filtersJSON, &imgsJSON, &recipe.AuthorID, &ingredientsJSON,
			&stepsJSON, &recipe.Created_at, &recipe.Review_count, &recipe.Avg_rating, &recipe.AuthorName)
		if err != nil {
			log.Error("Error scanning row", sl.Err(err))
			continue
		}

		json.Unmarshal(filtersJSON, &recipe.Filters)
		json.Unmarshal(imgsJSON, &recipe.Imgs)
		json.Unmarshal(ingredientsJSON, &recipe.Ingredients)
		json.Unmarshal(stepsJSON, &recipe.Steps)

		recipesMap[recipe.Id] = &recipe
		recipeIds = append(recipeIds, recipe.Id)
	}

	if len(recipeIds) == 0 {
		return nil, nil
	}

	var wg sync.WaitGroup
	var mu sync.Mutex

	for _, id := range recipeIds {
		wg.Add(1)

		go func(recipeId int) {
			defer wg.Done()
			reviews, err := p.SelectReviewsByRecipeId(recipeId, log)
			if err != nil {
				log.Error("Error with fetching results", sl.Err(err))
				return
			}

			mu.Lock()
			if recipe, ok := recipesMap[recipeId]; ok {
				recipe.Reviews = reviews
			}
			mu.Unlock()
		}(id)
	}
	wg.Wait()

	for _, recipe := range recipesMap {
		recipes = append(recipes, *recipe)
	}

	return recipes, nil
}

func (p *PostgresDashboardRepository) SelectRecipeById(id int, log *slog.Logger) (structures.Recipes, error) {
	var recipe structures.Recipes
	var filtersJSON, imgsJSON, ingredientsJSON, stepsJSON, reviewCount, avgRating []byte

	query := `SELECT r.id, r.name, r.descr, r.diff, r.filters, r.imgs, 
				r.ingredients, r.steps, r.created_at, u.username
		      FROM recipes r
		      JOIN users u ON r.author_id = u.id
			  WHERE id = $1`

	rows, err := p.DB.Query(query, id)
	if err != nil {
		log.Error("error with getting recipe by id", sl.Err(err))
		return recipe, nil
	}
	defer rows.Close()

	for rows.Next() {
		err := rows.Scan(&recipe.Id, &recipe.Name, &recipe.Descr, &recipe.Diff, &filtersJSON,
			&imgsJSON, &recipe.AuthorID, &ingredientsJSON, &stepsJSON, &reviewCount,
			&avgRating, &recipe.Created_at, &recipe.AuthorID)
		if err != nil {
			log.Error("Error scanning row", sl.Err(err))
			continue
		}

		var wg sync.WaitGroup
		var mu sync.Mutex

		wg.Add(1)

		go func(recipeId int) {
			defer wg.Done()
			reviews, err := p.SelectReviewsByRecipeId(recipeId, log)
			if err != nil {
				log.Error("Error with fetching results", sl.Err(err))
				return
			}

			mu.Lock()
			recipe.Reviews = reviews
			mu.Unlock()
		}(id)

		wg.Wait()

		json.Unmarshal(filtersJSON, &recipe.Filters)
		json.Unmarshal(imgsJSON, &recipe.Imgs)
		json.Unmarshal(ingredientsJSON, &recipe.Ingredients)
		json.Unmarshal(stepsJSON, &recipe.Steps)
		json.Unmarshal(reviewCount, &recipe.Review_count)
		json.Unmarshal(avgRating, &recipe.Avg_rating)
	}

	return recipe, nil
}

var reviewQueue = make(chan structures.Review, 100)

func (p *PostgresDashboardRepository) StartReviewWorker(log *slog.Logger) {
	go func() {
		for review := range reviewQueue {
			var reviewId int
			err := p.DB.QueryRow(`
                INSERT INTO reviews (review_text, rating_value, author_id, recipe_id) 
                VALUES ($1, $2, $3, $4) RETURNING id
            `, review.Text, review.Rating_value, review.Reviewed_by, review.Recipe_id).Scan(&reviewId)

			if err != nil {
				log.Error("Error inserting review", sl.Err(err))
				continue
			}

			log.Info("Review successfully inserted", slog.Int("id", review.Recipe_id))

			_, err = p.DB.Exec(`
					UPDATE recipes 
					SET review_count = (SELECT COUNT(*) FROM reviews WHERE recipe_id = $1),
						avg_rating = (SELECT COALESCE(AVG(rating_value), 0) FROM reviews WHERE recipe_id = $1)
					WHERE id = $1
            `, review.Recipe_id)

			if err != nil {
				log.Error("Error updating review_count and avg_rating", sl.Err(err))
			} else {
				log.Info("Recipe review_count and avg_rating updated")
			}
		}
	}()
}

func (p *PostgresDashboardRepository) InsertReview(review structures.Review, log *slog.Logger) error {
	reviewQueue <- review
	return nil
}

func (p *PostgresDashboardRepository) SelectReviewsByRecipeId(recipeId int, log *slog.Logger) ([]structures.Review, error) {
	query := `SELECT id, review_text, rating_value, author_id, 
				recipe_id FROM reviews 
			  WHERE recipe_id = $1`
	rows, err := p.DB.Query(query, recipeId)
	if err != nil {
		return nil, err
	}
	defer rows.Close()

	var reviews []structures.Review
	for rows.Next() {
		var review structures.Review
		err := rows.Scan(&review.Id, &review.Text, &review.Rating_value, &review.Recipe_id, &review.Reviewed_by)
		if err != nil {
			log.Error("Error scanning review row", sl.Err(err))
			continue
		}
		reviews = append(reviews, review)
	}

	log.Info("Fetched reviews", slog.Any("reviews", reviews))

	return reviews, nil
}

func (p *PostgresDashboardRepository) DeleteRecipe(recipeId int, log *slog.Logger) error {
	err := p.DB.QueryRow("DELETE FROM recipes WHERE id = $1", recipeId)
	if err != nil {
		return fmt.Errorf("Error with deleting user")
	}

	return nil
}
