package postgres

import (
	"database/sql"
	"errors"
	"log/slog"

	"github.com/qwaq-dev/culina/pkg/logger/sl"
	"github.com/qwaq-dev/culina/structures"
)

type PostgresUserRepository struct {
	DB *sql.DB
}

func (r *PostgresUserRepository) InsertUser(user *structures.User, log *slog.Logger) (int, error) {
	var userID int

	err := r.DB.QueryRow("INSERT INTO users (email, username, password) VALUES ($1, $2, $3) RETURNING id",
		user.Email, user.Username, user.Password).Scan(&userID)

	if err != nil {
		return 0, err
	}

	return userID, nil
}

func (r *PostgresUserRepository) SelectUser(username string, log *slog.Logger) (*structures.User, error) {
	user := new(structures.User)

	err := r.DB.QueryRow("SELECT id, email, username, password, role, sex, recipes_count FROM users WHERE username=$1", username).
		Scan(&user.Id, &user.Email, &user.Username, &user.Password, &user.Role, &user.Sex, &user.Recipes_count)
	if err != nil {
		if errors.Is(err, sql.ErrNoRows) {
			return nil, nil
		}
		log.Error("Error with selecting user", sl.Err(err))
		return nil, err
	}
	return user, nil
}
