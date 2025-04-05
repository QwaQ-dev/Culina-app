package verifytoken

import "github.com/golang-jwt/jwt/v5"

func VerifyToken(tokenString, secretKey string) (bool, error) {
	token, err := jwt.Parse(tokenString, func(t *jwt.Token) (interface{}, error) {
		return []byte(secretKey), nil
	})
	if err != nil {
		return false, err
	}

	return token.Valid, err
}
