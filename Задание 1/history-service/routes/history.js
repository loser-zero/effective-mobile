const express = require('express');
const ActionHistory = require('../models/actionHistory');
const router = express.Router();

router.get('/', async (req, res) => {
const { shop_id, plu, startDate, endDate, action, page, limit } = req.query;

try {
    const history = await ActionHistory.getHistory({
        shop_id,
        plu,
        startDate,
        endDate,
        action, 
        page: parseInt(page) || 1,
        limit: parseInt(limit) || 10
    });
    res.json(history);
} catch (error) {
    console.error(error);
    res.status(500).send('Ошибка сервера');
}
});

module.exports = router;