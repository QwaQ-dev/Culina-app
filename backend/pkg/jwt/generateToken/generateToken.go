package generatetoken

import (
	"time"

	"github.com/golang-jwt/jwt/v5"
)

func GenerateAccessToken(id int, secretKey string) (string, error) {
	token := jwt.NewWithClaims(jwt.SigningMethodHS256, jwt.MapClaims{
		"userId": id,
		"exp":    time.Now().Add(time.Minute * 15).Unix(),
		"type":   "access",
	})

	t, err := token.SignedString([]byte(secretKey))
	if err != nil {
		return "", err
	}

	return t, nil
}

func GenerateRefreshToken(id int, secretKey string) (string, error) {
	token := jwt.NewWithClaims(jwt.SigningMethodHS256, jwt.MapClaims{
		"userId": id,
		"exp":    time.Now().Add(time.Hour * 120).Unix(),
		"type":   "refresh",
	})

	t, err := token.SignedString([]byte(secretKey))
	if err != nil {
		return "", err
	}

	return t, nil
}
