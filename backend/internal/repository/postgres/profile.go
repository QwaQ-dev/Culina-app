package postgres

import (
	"database/sql"
	"fmt"
	"log/slog"

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

func (r *PostgresProfileRepository) InsertUserRecipes(user *structures.User, log *slog.Logger) (*structures.Recipes, error) {
	return nil, nil
}
