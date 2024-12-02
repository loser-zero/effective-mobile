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

// Получение всех магазинов
router.get('/', async (req, res) => {
try {
const result = await pool.query('SELECT * FROM shops');
res.json(result.rows);
} catch (error) {
console.error(error);
res.status(500).send('Ошибка сервера');
}
});

// Добавление нового магазина
router.post('/', async (req, res) => {
    const { name, location } = req.body; 
    try {
        const result = await pool.query('INSERT INTO shops (name, location) VALUES (\$1, \$2) RETURNING *', [name, location]);
        res.status(201).json(result.rows[0]);
    } catch (error) {
        console.error(error);
        res.status(500).send('Ошибка сервера');
    }
});

module.exports = router;