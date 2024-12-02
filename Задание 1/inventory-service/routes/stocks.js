const express = require('express');
const router = express.Router();
const { Pool } = require('pg');

// Настройка подключения к базе данных
const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'inventory_db',
    password: '12345678',
    port: 5432,
});

// Получение всех остатков товаров
router.get('/', async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM stocks');
        res.json(result.rows);
    } catch (error) {
        console.error(error);
        res.status(500).send('Ошибка сервера');
    }
});

// Добавление нового остатка товара
router.post('/', async (req, res) => {
    const { product_id, shop_id, quantity_on_shelf, quantity_in_order } = req.body; 
    try {
        const result = await pool.query(
            'INSERT INTO stocks (product_id, shop_id, quantity_on_shelf, quantity_in_order) VALUES (\$1, \$2, \$3, \$4) RETURNING *', 
            [product_id, shop_id, quantity_on_shelf, quantity_in_order]
        );
        res.status(201).json(result.rows[0]);
    } catch (error) {
        console.error(error);
        res.status(500).send('Ошибка сервера');
    }
});

// Увеличение остатка товара
router.put('/:id/increase', async (req, res) => {
    const { id } = req.params; 
    const { quantity } = req.body; 

    if (!quantity || quantity <= 0) {
        return res.status(400).send('Количество должно быть положительным');
    }

    try {
        await pool.query('UPDATE stocks SET quantity_on_shelf = quantity_on_shelf + \$1 WHERE id = \$2', [quantity, id]);
        res.status(200).send(`Остаток товара с ID ${id} увеличен на ${quantity}`);
    } catch (error) {
        console.error(error);
        res.status(500).send('Ошибка сервера');
    }
});

// Уменьшение остатка товара
router.put('/:id/decrease', async (req, res) => {
    const { id } = req.params; 
    const { quantity } = req.body; 

    if (!quantity || quantity <= 0) {
        return res.status(400).send('Количество должно быть положительным');
    }

    try {
        await pool.query('UPDATE stocks SET quantity_on_shelf = quantity_on_shelf - \$1 WHERE id = \$2', [quantity, id]);
        res.status(200).send(`Остаток товара с ID ${id} уменьшен на ${quantity}`);
    } catch (error) {
        console.error(error);
        res.status(500).send('Ошибка сервера');
    }
});

// Получение остатков по фильтрам
// Получение остатков по фильтрам
router.get('/filter', async (req, res) => {
    const { plu, shop_id, quantity_from, quantity_to, page = 1, limit = 10 } = req.query; // Добавлено значение по умолчанию
    const pageNumber = parseInt(page) || 1;
    const limitNumber = parseInt(limit) || 10;

    let query = 'SELECT * FROM stocks WHERE 1=1';
    const params = [];

    if (plu) {
        query += ' AND product_id IN (SELECT id FROM products WHERE PLU = \$1)';
        params.push(plu);
    }
    if (shop_id) {
        query += ' AND shop_id = \$2';
        params.push(shop_id);
    }
    if (quantity_from) {
        query += ' AND quantity_on_shelf >= \$3';
        params.push(quantity_from);
    }
    if (quantity_to) {
        query += ' AND quantity_on_shelf <= \$4';
        params.push(quantity_to);
    }

    const offset = (pageNumber - 1) * limitNumber;
    query += ' LIMIT $' + (params.length + 1) + ' OFFSET $' + (params.length + 2);
    params.push(limitNumber, offset);

    // Выводим SQL-запрос и параметры в консоль
    console.log('SQL Query:', query);
    console.log('Params:', params);

    try {
        const result = await pool.query(query, params);
        res.json(result.rows);
    } catch (error) {
        console.error(error);
        res.status(500).send('Ошибка сервера');
    }
});


module.exports = router;