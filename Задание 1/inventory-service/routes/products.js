const express = require('express');
const router = express.Router();
const { Client } = require('pg');

const client = new Client({
    user: 'postgres',
    host: 'localhost',
    database: 'inventory_db',
    password: '12345678',
    port: 5432,
});

client.connect();

// Получение всех продуктов
router.get('/', async (req, res) => {
    try {
        const result = await client.query('SELECT * FROM Products');
        res.json(result.rows);
    } catch (err) {
        console.error(err);
        res.status(500).send('Ошибка сервера');
    }
});

// Добавление нового продукта
router.post('/', async (req, res) => {
    const { PLU, name } = req.body;
    try {
        const result = await client.query('INSERT INTO Products (PLU, name) VALUES (\$1, \$2) RETURNING *', [PLU, name]);
        res.status(201).json(result.rows[0]);
    } catch (err) {
        console.error(err);
        res.status(500).send('Ошибка сервера');
    }
});

// Получение товаров по фильтрам
router.get('/filter', async (req, res) => {
    const { name, plu } = req.query;
    let query = 'SELECT * FROM Products WHERE 1=1';
    const params = [];

    if (name) {
        query += ' AND name ILIKE \$1'; // ILIKE для нечувствительного к регистру поиска
        params.push(`%${name}%`);
    }
    if (plu) {
        query += ' AND PLU = \$2';
        params.push(plu);
    }

    try {
        const result = await client.query(query, params);
        res.json(result.rows);
    } catch (err) {
        console.error(err);
        res.status(500).send('Ошибка сервера');
    }
});

// Экспорт маршрута
module.exports = router;
