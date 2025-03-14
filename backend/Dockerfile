# Используем официальный образ Go для сборки
FROM golang:1.23.6 AS builder

# Устанавливаем рабочую директорию в контейнере
WORKDIR /app

# Копируем файлы модулей и загружаем зависимости
COPY go.mod go.sum ./
RUN go mod download

# Копируем весь исходный код
COPY . .

# Собираем бинарник
RUN go build -o /app/main ./cmd/main.go

# Проверяем, что бинарник существует
RUN ls -lah /app/main

# Используем минимальный образ для финального контейнера
FROM alpine:latest
WORKDIR /root/

# Копируем бинарный файл
COPY --from=builder /app/main .

# Даем права на выполнение
RUN chmod +x main

# Проверяем, что файл есть в финальном контейнере
RUN ls -lah main

# Запускаем исполняемый файл
CMD ["./main"]
