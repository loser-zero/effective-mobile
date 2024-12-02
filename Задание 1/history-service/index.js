const express = require('express');
const bodyParser = require('body-parser');
const ActionHistory = require('./models/actionHistory'); // Импортируем модель
const historyRoutes = require('./routes/history');

const app = express();
const PORT = process.env.PORT || 3001;

app.use(bodyParser.json());

// Подключение маршрутов
app.use('/api/history', historyRoutes);

app.listen(PORT, () => {
    console.log(`Сервер запущен на http://localhost:${PORT}`);
});