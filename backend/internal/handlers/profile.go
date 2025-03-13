package handlers

import (
	"log/slog"

	"github.com/gofiber/fiber/v2"
	"github.com/qwaq-dev/culina/internal/repository"
	"github.com/qwaq-dev/culina/pkg/logger/sl"
	"golang.org/x/crypto/bcrypt"
)

type ProfileHandler struct {
	repo repository.ProfileRepository
	log  *slog.Logger
}

func NewProfileHandler(repo repository.ProfileRepository, log *slog.Logger) *ProfileHandler {
	return &ProfileHandler{repo: repo, log: log}
}

//	JSON: {
//		"username": "",
//		"new_username: ""
//	}
func (h *ProfileHandler) ChangeUsername(c *fiber.Ctx) error {
	req := struct {
		NewUsername string `json:"new_username"`
		Username    string `json:"username"`
	}{}

	if err := c.BodyParser(&req); err != nil {
		return c.Status(400).JSON(fiber.Map{"error": "Invalid request format"})
	}

	user, err := h.repo.ChangeProfileData("username", req.NewUsername, req.Username, h.log)
	if err != nil {
		h.log.Error("No user with this username", sl.Err(err))
		return c.Status(500).JSON(fiber.Map{"error": "Error with changing user data"})
	}

	h.log.Info("User has change username", slog.String("username", user.Username))
	return c.Status(200).JSON(fiber.Map{"Uername was update successfully": user})
}

//	JSON: {
//		"username": "",
//		"new_password: ""
//	}
func (h *ProfileHandler) ChangePassword(c *fiber.Ctx) error {
	req := struct {
		NewPassword string `json:"new_password"`
		Username    string `json:"username"`
	}{}

	if err := c.BodyParser(&req); err != nil {
		return c.Status(400).JSON(fiber.Map{"error": "Invalid request format"})
	}

	hash, err := bcrypt.GenerateFromPassword([]byte(req.NewPassword), bcrypt.DefaultCost)
	if err != nil {
		h.log.Error("Error with generating hash", sl.Err(err))
		return err
	}

	user, err := h.repo.ChangeProfileData("password", string(hash), req.Username, h.log)
	if err != nil {
		h.log.Error("Error with chaging password", sl.Err(err))
		return c.Status(500).JSON(fiber.Map{"error": "Error with chaging password"})
	}

	return c.Status(200).JSON(fiber.Map{"message": "Password was updating successfully", "user": user})
}

//	JSON: {
//		"username": "",
//		"new_sex: ""
//	}
func (h *ProfileHandler) ChangeSex(c *fiber.Ctx) error {
	req := struct {
		NewSex   string `json:"new_sex"`
		Username string `json:"username"`
	}{}

	if err := c.BodyParser(&req); err != nil {
		c.Status(400).JSON(fiber.Map{"error": "Invalid request format"})
	}

	user, err := h.repo.ChangeProfileData("sex", req.NewSex, req.Username, h.log)
	if err != nil {
		h.log.Error("Error with changing sex", sl.Err(err))
		return c.Status(500).JSON(fiber.Map{"error": "error with changing sex"})
	}

	return c.Status(200).JSON(fiber.Map{"Sex was updated successfully": user})
}

func (h *ProfileHandler) RecipesFromThisAutor(c *fiber.Ctx) error {
	return nil
}
