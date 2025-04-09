package redis

import (
	"github.com/gofiber/fiber/v2/log"
	"github.com/redis/go-redis/v9"
)

func InitRedis(addr, pass string) (redis.Client, error) {
	client := redis.NewClient(&redis.Options{
		Addr:     addr,
		Password: pass,
		DB:       0,
		Protocol: 2,
	})

	log.Info("Redis connect successfully")

	return *client, nil
}
