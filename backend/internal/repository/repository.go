package repository

import (
	"log/slog"

	"github.com/qwaq-dev/culina/structures"
)

type UserRepository interface {
	InsertUser(user *structures.User, log *slog.Logger) (int, error)
	SelectUser(username string, log *slog.Logger) (*structures.User, error)
}

type DashboardRepository interface {
	InsertRecipe(recipe structures.Recipes, log *slog.Logger) (int, error)
	SelectAllRecipes(page, pageSize int, log *slog.Logger) ([]structures.Recipes, error)
	SelectRecipeById(id int, log *slog.Logger) (structures.Recipes, error)
	InsertReview(review structures.Review, log *slog.Logger) error
}

type ProfileRepository interface {
	ChangeProfileData(column, newData, userId string, log *slog.Logger) (*structures.User, error)
	InsertUserRecipes(user *structures.User, log *slog.Logger) (*structures.Recipes, error)
}
