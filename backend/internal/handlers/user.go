package handlers

import (
	"log/slog"

	"github.com/gofiber/fiber/v2"
	"github.com/qwaq-dev/culina/internal/config"
	"github.com/qwaq-dev/culina/internal/repository"
	generatetoken "github.com/qwaq-dev/culina/pkg/jwt/generateToken"
	"github.com/qwaq-dev/culina/pkg/logger/sl"
	"github.com/qwaq-dev/culina/structures"
	"golang.org/x/crypto/bcrypt"
)

type UserHandler struct {
	repo repository.UserRepository
	log  *slog.Logger
	cfg  config.Config
}

func NewUserHandler(repo repository.UserRepository, log *slog.Logger, cfg config.Config) *UserHandler {
	return &UserHandler{repo: repo, log: log, cfg: cfg}
}

//	JSON: {
//		"username": "",
//		"password": ""
//	}
func (h *UserHandler) SignIn(c *fiber.Ctx) error {
	req := struct {
		Username string `json:"username"`
		Password string `json:"password"`
	}{}

	if err := c.BodyParser(&req); err != nil {
		h.log.Error("Invalid request format", sl.Err(err))
		return c.Status(400).JSON(fiber.Map{"error": "Invalid request format"})
	}

	if req.Password == "" || req.Username == "" {
		return c.Status(400).JSON(fiber.Map{"error": "username and password are required"})
	}

	user, err := h.repo.SelectUser(req.Username, h.log)
	if err != nil {
		return c.Status(500).JSON(fiber.Map{"error": "user not found"})
	}

	if user == nil {
		return c.Status(401).JSON(fiber.Map{"error": "invalid username or password"})
	}

	if err := bcrypt.CompareHashAndPassword([]byte(user.Password), []byte(req.Password)); err != nil {
		h.log.Error("error", sl.Err(err))
		return c.Status(401).JSON(fiber.Map{"error": "Invalid password"})
	}

	token, err := generatetoken.GenerateToken(req.Username, h.cfg.JWTSecretKey)
	if err != nil {
		h.log.Error("Error with generating token wile sign in", sl.Err(err))
		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{"error": "Error with generating token wile sign in"})
	}

	h.log.Info("User has signed in", slog.String("username", user.Username))
	return c.Status(200).JSON(fiber.Map{"message": "Successfully signed in", "jwt": token})
}

//	JSON: {
//		"email": ""
//		"username": "",
//		"password": ""
//	}
func (h *UserHandler) SignUp(c *fiber.Ctx) error {
	user := new(structures.User)
	if err := c.BodyParser(user); err != nil {
		h.log.Error("Error with parse body request", sl.Err(err))
		return c.Status(400).JSON(fiber.Map{"error": "Error with parsing body"})
	}

	hash, err := bcrypt.GenerateFromPassword([]byte(user.Password), bcrypt.DefaultCost)
	if err != nil {
		h.log.Error("Error with generating hash", sl.Err(err))
		return err
	}
	user.Password = string(hash)

	userExists, _ := h.repo.SelectUser(user.Username, h.log)
	if userExists != nil {
		if userExists.Username == user.Username {
			h.log.Info("User already exists")
			return c.Status(409).JSON(fiber.Map{"message": "User already exists"})
		}
	}

	userId, err := h.repo.InsertUser(user, h.log)
	if err != nil {
		h.log.Error("Error with inserting user data into database", sl.Err(err))
	}

	user.Id = userId

	token, err := generatetoken.GenerateToken(user.Username, h.cfg.JWTSecretKey)
	if err != nil {
		h.log.Error("Error with generating token wile sign up", sl.Err(err))
		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{"error": "Error with generating token wile sign up"})
	}

	h.log.Info("User has signed up", slog.String("username", user.Username))
	return c.Status(200).JSON(fiber.Map{"jwt": token})
}
