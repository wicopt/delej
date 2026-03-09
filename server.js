// Подключаем Express
const express = require('express');
const app = express();

// Определяем порт
const PORT = 3000;

// Главная страница
app.get('/', (req, res) => {
  res.send('Hello World!');
});

// Запуск сервера
app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});