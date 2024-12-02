// models/actionHistory.js
const { Pool } = require('pg');

// Создание пула подключений к базе данных PostgreSQL
const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'inventory_db',
    password: '12345678',
    port: 5432,
});

class ActionHistory {
    static async getHistory({ shop_id, plu, startDate, endDate, action, page = 1, limit = 10 }) {
        let query = 'SELECT * FROM action_history WHERE 1=1';
        const params = [];

        if (shop_id) {
            query += ' AND shop_id = $' + (params.length + 1);
            params.push(shop_id);
        }

        if (plu) {
            query += ' AND plu = $' + (params.length + 1);
            params.push(plu);
        }

        if (startDate) {
            query += ' AND date >= $' + (params.length + 1);
            params.push(startDate);
        }

        if (endDate) {
            query += ' AND date <= $' + (params.length + 1);
            params.push(endDate);
        }

        if (action) {
            query += ' AND action = $' + (params.length + 1);
            params.push(action);
        }

        const offset = (page - 1) * limit;
        query += ' LIMIT $' + (params.length + 1) + ' OFFSET $' + (params.length + 2);
        params.push(limit, offset);

        const { rows } = await pool.query(query, params);
        return rows;
    }

    // Запись действий в таблицу
    static async logAction(shop_id, plu, action) {
        const query = 'INSERT INTO action_history (shop_id, plu, action) VALUES (\$1, \$2, \$3)';
        await pool.query(query, [shop_id, plu, action]);
    }
}

module.exports = ActionHistory;