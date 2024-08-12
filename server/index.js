const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');
require('dotenv').config();

const app = express();

app.use(express.json());

app.use(cors({
    origin:'https://flashcards-two-red.vercel.app',
}));

const db = mysql.createConnection({
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  connectTimeout: 10000  // Optional: Set connection timeout to 10 seconds
});

db.connect(err => {
    if (err) throw err;
    console.log('MySQL Connected...');
});

app.get('/api/flashcards', (req, res) => {
    const sql = 'SELECT * FROM flashcards';
    db.query(sql, (err, result) => {
        if (err) throw err;
        res.json(result);
    });
});

app.post('/api/flashcards', (req, res) => {
    const { question, answer } = req.body;
    const sql = 'INSERT INTO flashcards (question, answer) VALUES (?, ?)';
    db.query(sql, [question, answer], (err, result) => {
        if (err) throw err;
        res.json({ id: result.insertId });
    });
});

app.put('/api/flashcards/:id', (req, res) => {
    const { id } = req.params;
    const { question, answer } = req.body;
    const sql = 'UPDATE flashcards SET question = ?, answer = ? WHERE id = ?';
    db.query(sql, [question, answer, id], (err, result) => {
        if (err) throw err;
        res.json(result);
    });
});

app.delete('/api/flashcards/:id', (req, res) => {
    const { id } = req.params;
    const sql = 'DELETE FROM flashcards WHERE id = ?';
    db.query(sql, [id], (err, result) => {
        if (err) throw err;
        res.json(result);
    });
});

app.listen(5000, () => {
    console.log('Server started on port 5000');
});
