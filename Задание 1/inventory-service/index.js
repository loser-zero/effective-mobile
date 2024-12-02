const express = require('express');
const bodyParser = require('body-parser');
const productsRoutes = require('./routes/products');
const shopsRoutes = require('./routes/shops');
const stocksRoutes = require('./routes/stocks');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());

// Подключение маршрутов
app.use('/api/products', productsRoutes);
app.use('/api/shops', shopsRoutes);
app.use('/api/stocks', stocksRoutes);

app.listen(PORT, () => {
console.log(`Сервер запущен на http://localhost:${PORT}`);
});