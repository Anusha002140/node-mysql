const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql');
const app = express();

app.use(bodyParser.urlencoded({ extended: true }));

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'Anusha'
});

db.connect((err) => {
    if (err) {
        console.log('Database connection failed:', err);
    } else {
        console.log('Connected to the database.');
    }
});

app.use(express.static('public'));

app.post('/signup', (req, res) => {
    const { email, password } = req.body;
    const query = 'INSERT INTO users (email, password) VALUES (?, ?)';
    
    db.query(query, [email, password], (err, result) => {
        if (err) {
            console.log(err);
            return res.send('Error occurred during signup.');
        }
        res.send('Signup successful! You can now <a href="/login.html">login</a>.');
    });
});

app.post('/login', (req, res) => {
    const { email, password } = req.body;
    const query = 'SELECT * FROM users WHERE email = ? AND password = ?';

    db.query(query, [email, password], (err, result) => {
        if (result.length > 0) {
            res.send('<h1>Welcome to the dashboard!</h1>');
        } else {
            res.send("Invalid email or password");
        }
    });
});

app.listen(4500, () => {
    console.log('http://localhost:4500/login.html');
});