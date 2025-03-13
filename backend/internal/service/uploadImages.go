package service

import (
	"fmt"
	"log"
	"mime/multipart"
	"os"
	"strconv"
	"sync"
	"time"

	"github.com/gofiber/fiber/v2"
)

func UploadImagesForReceip(form *multipart.Form, authorID int, c *fiber.Ctx) (map[string]string, string, error) {
	imgs := make(map[string]string)
	dirName := fmt.Sprintf("./uploads/%d", authorID)

	files, ok := form.File["images"]
	if !ok || len(files) == 0 {
		return imgs, "", fmt.Errorf("no files upload")
	}

	if _, err := os.Stat(dirName); os.IsNotExist(err) {
		err := os.Mkdir(dirName, os.ModePerm)
		if err != nil {
			log.Println("Ошибка при создании папки:", err)
			return imgs, "", fmt.Errorf("error with creating folder")
		}
	}

	var wg sync.WaitGroup
	var mu sync.Mutex

	for i, file := range files {
		if i+1 >= 4 {
			break
		}

		wg.Add(1)
		go func(i int, file *multipart.FileHeader) {
			defer wg.Done()

			filename := fmt.Sprintf("%s/%d_%s", dirName, time.Now().Unix(), file.Filename)

			if err := c.SaveFile(file, filename); err != nil {
				return
			}

			mu.Lock()
			imgs[strconv.Itoa(i+1)] = filename
			mu.Unlock()
		}(i, file)
	}

	wg.Wait()

	return imgs, dirName, nil
}
