Что вышло с первым заданием: Все эндпоинты работают и их можно проверить
Получить все продукты

Метод: GET
URL: http://localhost:3000/api/products

Добавить новый продукт

Метод: POST
URL: http://localhost:3000/api/products
Тело (Body): (выберите raw и JSON)

{
    "PLU": "123456",
    "name": "Продукт 1"
}
Фильтрация продуктов

Метод: GET
URL: http://localhost:3000/api/products/filter?name=Продукт&plu=123456

b. Магазины
Получить все магазины

Метод: GET
URL: http://localhost:3000/api/shops

Добавить новый магазин

Метод: POST
URL: http://localhost:3000/api/shops
Тело (Body):

{
    "name": "Магазин 1",
    "location": "Улица 1"
}
c. Остатки товаров
Получить все остатки товаров

Метод: GET
URL: http://localhost:3000/api/stocks

Добавить новый остаток товара

Метод: POST
URL: http://localhost:3000/api/stocks
Тело (Body):

{
    "product_id": 1,
    "shop_id": 1,
    "quantity_on_shelf": 50,
    "quantity_in_order": 10
}
Увеличение остатка товара

Метод: PUT
URL: http://localhost:3000/api/stocks/{id}/increase (замените {id} на реальный ID остатка)
Тело (Body):

{
    "quantity": 10
}
Уменьшение остатка товара

Метод: PUT
URL: http://localhost:3000/api/stocks/{id}/decrease (замените {id} на реальный ID остатка)
Тело (Body):

{
    "quantity": 5
}

Фильтрация остатков http://localhost:3000/api/stocks/filter?plu=123456&shop_id=1&quantity_from=5&quantity_to=100&page=1&limit=10

История http://localhost:3001/api/history?shop_id=1&plu=123456&startDate=2023-01-01&endDate=2023-12-31

Задание 2.

Я сделал миграцию, сделал базу данных, но появилась глупая ошибка, показываю: 
![eaead520-3616-44ff-a8a2-07e62998dfd0](https://github.com/user-attachments/assets/f853d90d-b728-43df-94a3-99fc722ec77d)
![2ea4abb6-abba-4cc7-81e5-f5aed01e2fd9](https://github.com/user-attachments/assets/2a1b2085-11d4-4cc3-b710-d844054cde35)
![0380ec0c-2ca0-47db-b1a9-b88090cb9679](https://github.com/user-attachments/assets/5d4d68eb-39f4-437a-b409-ca88d545c6f2)
![925dcf74-bf49-43ac-8d89-dcb475415e9f](https://github.com/user-attachments/assets/b3137375-c874-4fec-a27c-27892d1a3105)
Код жалуется что столбец Null, Хотя он NOTNULL, и заполнен данными, такие дела...
