package routes

import (
	"log/slog"

	"github.com/gofiber/fiber/v2"
	"github.com/qwaq-dev/culina/internal/handlers"
	"github.com/qwaq-dev/culina/internal/repository"
	"github.com/qwaq-dev/culina/internal/repository/typesense"
)

func InitRoutes(
	app *fiber.App, log *slog.Logger,
	userRepo repository.UserRepository,
	profileRepo repository.ProfileRepository,
	dashboardRepo repository.DashboardRepository,
	ts typesense.Typesense,
) {
	dashboard := app.Group("/dashboard")
	profile := app.Group("/profile")
	user := app.Group("/user")
	userHandler := handlers.NewUserHandler(userRepo, log)
	profileHandler := handlers.NewProfileHandler(profileRepo, log)
	dashboardHandler := handlers.NewDashboardHandler(dashboardRepo, log, ts)

	//Routes for dashboard page
	dashboard.Post("/create-recipe", dashboardHandler.CreateRecipe)
	dashboard.Post("/add-review", dashboardHandler.AddReview)
	dashboard.Post("/filter", dashboardHandler.Filter)
	dashboard.Get("/search-recipes/:query", dashboardHandler.SearchByTypesense)
	dashboard.Get("/recipes", dashboardHandler.AllRecipes) // localhost:8080/dashboard/recipes?page=*&pageSize=*
	dashboard.Get("/recipe/:id", dashboardHandler.RecipeById)

	//Routes for profile page
	profile.Post("/username", profileHandler.ChangeUsername)
	profile.Post("/password", profileHandler.ChangePassword)
	profile.Post("/sex", profileHandler.ChangeSex)
	profile.Get("/recipe/:author", profileHandler.RecipesFromThisAutor)

	//Routes for user
	user.Post("/sign-in", userHandler.SignIn)
	user.Post("/sign-up", userHandler.SignUp)
	user.Get("/auth", userHandler.Auth)

	log.Debug("All routes was initialized")
}
