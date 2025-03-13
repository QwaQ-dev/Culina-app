package main

import (
	"log/slog"
	"os"

	"github.com/gofiber/fiber/v2"
	"github.com/qwaq-dev/culina/internal/repository/postgres"
	"github.com/qwaq-dev/culina/internal/repository/typesense"
	"github.com/qwaq-dev/culina/internal/routes"
	"github.com/qwaq-dev/culina/pkg/config"
	"github.com/qwaq-dev/culina/pkg/logger/handlers/slogpretty"
	"github.com/qwaq-dev/culina/pkg/logger/sl"
)

const (
	envDev  = "dev"
	envProd = "prod"
)

func main() {
	app := fiber.New()
	cfg := config.MustLoad()
	log := setupLoger(cfg.Env)

	db, err := postgres.InitDataBase(cfg.Database, log)
	if err != nil {
		log.Error("Error connecting to database", slog.String("error", err.Error()))
		os.Exit(1)
	}

	userRepo := &postgres.PostgresUserRepository{DB: db}
	profileRepo := &postgres.PostgresProfileRepository{DB: db}
	dashboardRepo := &postgres.PostgresDashboardRepository{DB: db}
	ts := typesense.NewTypesense(*dashboardRepo, log, cfg.Typesense)

	if err := ts.ConnectToTypesense(); err != nil {
		log.Error("Error with connecting to typesense", sl.Err(err))
	} else {
		log.Info("Successful connect to typesense")
	}

	dashboardRepo.StartReviewWorker(log)

	routes.InitRoutes(app, log, userRepo, profileRepo, dashboardRepo, *ts)

	log.Info("Server started", slog.String("port", cfg.Server.Port))
	app.Listen(cfg.Server.Port)
}

func setupLoger(env string) *slog.Logger {
	var log *slog.Logger

	switch env {
	case envDev:
		log = setupPrettySlog()
	case envProd:
		log = slog.New(
			slog.NewJSONHandler(os.Stdout, &slog.HandlerOptions{Level: slog.LevelInfo}),
		)
	}

	return log
}

func setupPrettySlog() *slog.Logger {
	opts := slogpretty.PrettyHandlerOptions{
		SlogOpts: &slog.HandlerOptions{
			Level: slog.LevelDebug,
		},
	}

	handler := opts.NewPrettyHandler(os.Stdout)

	return slog.New(handler)
}
