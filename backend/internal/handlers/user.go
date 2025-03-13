package handlers

import (
	"log/slog"

	"github.com/gofiber/fiber/v2"
	"github.com/qwaq-dev/culina/internal/repository"
	"github.com/qwaq-dev/culina/pkg/logger/sl"
	"github.com/qwaq-dev/culina/structures"
	"golang.org/x/crypto/bcrypt"
)

type UserHandler struct {
	repo repository.UserRepository
	log  *slog.Logger
}

func NewUserHandler(repo repository.UserRepository, log *slog.Logger) *UserHandler {
	return &UserHandler{repo: repo, log: log}
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
		return c.Status(500).JSON(fiber.Map{"error": "Server error"})
	}

	if user == nil {
		return c.Status(401).JSON(fiber.Map{"error": "invalid username or password"})
	}

	if err := bcrypt.CompareHashAndPassword([]byte(user.Password), []byte(req.Password)); err != nil {
		h.log.Error("error", sl.Err(err))
		return c.Status(401).JSON(fiber.Map{"error": "Invalid password"})
	}

	h.log.Info("User has signed in", slog.String("username", user.Username))
	return c.Status(200).JSON(fiber.Map{"message": "Successfully signed in", "user": user})
}

//	JSON: {
//		"email": ""
//		"username": "",
//		"password: ""
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

	h.log.Info("User has signed up", slog.String("username", user.Username))
	return c.Status(200).JSON(fiber.Map{"userID": userId, "user": user})
}

func (h *UserHandler) Auth(c *fiber.Ctx) error {
	return nil
}
