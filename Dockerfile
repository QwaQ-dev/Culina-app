FROM node:22.11.0-alpine

WORKDIR /app/backend

# Копируем package.json и package-lock.json в папку backend
COPY package*.json /app/backend/

# Устанавливаем зависимости
RUN npm install

# Копируем всю папку backend в контейнер
COPY ./backend /app/backend

EXPOSE 8080

CMD ["node", "server.js"]
