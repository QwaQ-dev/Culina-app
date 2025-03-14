package postgres

import (
	"database/sql"
	"fmt"
	"log/slog"

	_ "github.com/lib/pq"
	"github.com/qwaq-dev/culina/pkg/config"
	"github.com/qwaq-dev/culina/pkg/logger/sl"
)

func InitDataBase(cfg config.Database, log *slog.Logger) (*sql.DB, error) {
	db, err := sql.Open("postgres", fmt.Sprintf("host=%s port=%s user=%s dbname=%s password=%s sslmode=%s",
		cfg.DBhost, cfg.Port, cfg.DBusername, cfg.DBname, cfg.DBpassword, cfg.SSLMode))
	if err != nil {
		log.Error("Error with connecting to database", sl.Err(err))
		return nil, err
	}

	err = db.Ping()

	if err != nil {
		log.Error("Error with pinging database", sl.Err(err))
		return nil, err
	}

	log.Info("Database connect successfully")
	return db, nil
}
