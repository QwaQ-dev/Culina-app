package handlers

import (
	"context"
	"fmt"
	"log/slog"
	"time"

	"github.com/gofiber/fiber/v2"
	"github.com/qwaq-dev/culina/internal/config"
	"github.com/qwaq-dev/culina/internal/repository"
	generatetoken "github.com/qwaq-dev/culina/pkg/jwt/generateToken"
	validatetoken "github.com/qwaq-dev/culina/pkg/jwt/validateToken"
	"github.com/qwaq-dev/culina/pkg/logger/sl"
	"github.com/qwaq-dev/culina/structures"
	"github.com/redis/go-redis/v9"
	"golang.org/x/crypto/bcrypt"
)

type UserHandler struct {
	repo        repository.UserRepository
	log         *slog.Logger
	cfg         config.Config
	redisClient redis.Client
}

func NewUserHandler(repo repository.UserRepository, log *slog.Logger, cfg config.Config, redisClient redis.Client) *UserHandler {
	return &UserHandler{repo: repo, log: log, cfg: cfg, redisClient: redisClient}
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

	accessToken, err := generatetoken.GenerateAccessToken(user.Id, h.cfg.JWTSecretKey)
	if err != nil {
		h.log.Error("Error with generating access token wile sign in", sl.Err(err))
		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{"error": "Error with generating token wile sign in"})
	}

	h.log.Info("User has signed in", slog.String("username", user.Username))
	return c.Status(200).JSON(fiber.Map{
		"access_token": accessToken,
	})
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
		return c.Status(500).JSON(fiber.Map{"error": "error with inserting data"})
	}

	accessToken, err := generatetoken.GenerateAccessToken(userId, h.cfg.JWTSecretKey)
	if err != nil {
		h.log.Error("Error with generating access token wile sign in", sl.Err(err))
		h.repo.DeleteUser(userId, h.log)
		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{"error": "Error with generating token wile sign in"})
	}

	refreshToken, err := generatetoken.GenerateRefreshToken(userId, h.cfg.JWTSecretKey)
	if err != nil {
		h.log.Error("Error with generating refresh token wile sign in", sl.Err(err))
		h.repo.DeleteUser(userId, h.log)
		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{"error": "Error with generating token wile sign in"})
	}

	ctx := context.Background()

	err = h.redisClient.Set(ctx, fmt.Sprintf("refresh_token:%d", userId), refreshToken, 120*time.Hour).Err()
	if err != nil {
		h.log.Error("Error with set refresh token to redis", sl.Err(err))
		h.repo.DeleteUser(userId, h.log)
		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{"error": "Error with refresh token"})
	}

	h.log.Info("User has signed up", slog.String("username", user.Username))
	return c.Status(200).JSON(fiber.Map{
		"access_token":  accessToken,
		"refresh_token": refreshToken,
	})
}
func (h *UserHandler) Refresh(c *fiber.Ctx) error {
	refreshToken := c.Get("Authorization")
	if refreshToken == "" {
		return c.Status(401).JSON(fiber.Map{"error": "Refresh token is missing"})
	}

	ctx := context.Background()

	claims, err := validatetoken.ValidateToken(refreshToken, h.cfg.JWTSecretKey)
	if err != nil {
		return c.Status(fiber.StatusUnauthorized).JSON(fiber.Map{"error": "Refresh token has expired"})
	}

	userID := int(claims["userId"].(float64))

	storedToken, err := h.redisClient.Get(ctx, fmt.Sprintf("refresh_token:%d", userID)).Result()

	if err == redis.Nil {
		return c.Status(401).JSON(fiber.Map{"error": "Refresh token not found"})
	} else if err != nil || storedToken != refreshToken {
		return c.Status(401).JSON(fiber.Map{"error": "Invalid or expired refresh token"})
	}

	newAccessToken, err := generatetoken.GenerateAccessToken(userID, h.cfg.JWTSecretKey)
	if err != nil {
		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{"error": "Error with generating new access token"})
	}

	newRefreshToken, err := generatetoken.GenerateRefreshToken(userID, h.cfg.JWTSecretKey)
	if err != nil {
		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{"error": "Error with generating new refresh token"})
	}

	err = h.redisClient.Set(ctx, fmt.Sprintf("refresh_token:%d", userID), newRefreshToken, time.Hour*24).Err()
	if err != nil {
		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{"error": "Failed to save refresh token"})
	}

	h.redisClient.Del(ctx, fmt.Sprintf("refresh_token:%d", userID))

	return c.Status(fiber.StatusOK).JSON(fiber.Map{
		"access_token":  newAccessToken,
		"refresh_token": newRefreshToken,
	})
}
