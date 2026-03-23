# Используем Node.js 20 (или 22 - последняя LTS)
FROM node:20

WORKDIR /app

# Копируем package.json и package-lock.json
COPY package*.json ./

# Устанавливаем зависимости
RUN npm install

# Копируем весь проект
COPY . .

EXPOSE 3000

# Для Create React App
CMD ["npm", "start"]