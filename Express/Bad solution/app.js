const express = require('express');
const mysql = require('mysql2');


const API_SECRET = 'SECRET_KEY'

const app = express();
const port = 3000;

app.post('/user-info', (req, res) =>
{
    const connection = mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: 'password',
        database: 'mydatabase'
    });
    const userId = req.query.userId;
    const sql = `SELECT * FROM users WHERE id = ${userId};`;
    console.log('Старутуємо процесс юзера');
    connection.query(sql, (err, results) => {
        if (err) {
            res.status(500).send("Щось пішло не так!");
        } else {
            if (results.length > 0) {
                const user = results[0];
                const userDetails = {
                    name: user.name,
                    email: user.email,
                    orders: `https://example.com/orders/${userId}`
                };
                res.send(userDetails);
            } else {
                res.status(404).send("Користувача не знайдено!");
            }
        }
    });
});

app.post('/status', (req, res) => {
    res.send({status: 'Ok'});
});


// Запускаємо сервер на порту
app.listen(port, () => {
    console.log(`Сервер запущено на http://localhost:${port}`);
});