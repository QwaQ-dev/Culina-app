package postgres

import (
	"database/sql"
	"encoding/json"
	"fmt"
	"log/slog"

	"github.com/qwaq-dev/culina/pkg/logger/sl"
	"github.com/qwaq-dev/culina/structures"
)

type PostgresProfileRepository struct {
	DB *sql.DB
}

var allowedColumns = map[string]string{
	"username": "username",
	"sex":      "sex",
	"password": "password",
}

func (r *PostgresProfileRepository) ChangeProfileData(column, newData, username string, log *slog.Logger) (*structures.User, error) {
	user := new(structures.User)

	col, ok := allowedColumns[column]
	if !ok {
		return nil, fmt.Errorf("invalid column name")
	}

	query := fmt.Sprintf("UPDATE users SET %s = $1 WHERE username = $2 RETURNING *", col)
	err := r.DB.QueryRow(query, newData, username).Scan(&user.Id, &user.Email, &user.Username, &user.Password, &user.Role, &user.Sex, &user.Recipes_count)
	if err != nil {
		log.Error("Error with updating user data")
		return nil, err
	}

	return user, nil
}

func (r *PostgresProfileRepository) SelectUserRecipes(authorId int, log *slog.Logger) ([]structures.Recipes, error) {
	var recipes []structures.Recipes
	recipesMap := make(map[int]*structures.Recipes)

	query := `SELECT r.id, r.name, r.descr, r.diff, r.filters, r.imgs, 
                 r.ingredients, r.steps, r.created_at, r.review_count, r.avg_rating, u.username
          	  FROM recipes r
          	  JOIN users u ON r.author_id = u.id
			  WHERE r.author_id = $1`

	rows, err := r.DB.Query(query, authorId)
	if err != nil {
		return nil, err
	}

	for rows.Next() {
		var recipe structures.Recipes
		var filtersJSON, imgsJSON, ingredientsJSON, stepsJSON []byte

		err := rows.Scan(&recipe.Id, &recipe.Name, &recipe.Descr, &recipe.Diff,
			&filtersJSON, &imgsJSON, &ingredientsJSON,
			&stepsJSON, &recipe.Created_at, &recipe.Review_count, &recipe.Avg_rating, &recipe.AuthorName)
		if err != nil {
			log.Error("Error scanning row", sl.Err(err))
			continue
		}

		json.Unmarshal(filtersJSON, &recipe.Filters)
		json.Unmarshal(imgsJSON, &recipe.Imgs)
		json.Unmarshal(ingredientsJSON, &recipe.Ingredients)
		json.Unmarshal(stepsJSON, &recipe.Steps)

		recipe.AuthorID = authorId

		recipesMap[recipe.Id] = &recipe
	}

	for _, recipe := range recipesMap {
		recipes = append(recipes, *recipe)
	}

	return recipes, nil
}
