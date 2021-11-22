var express = require('express');
var app = express();
var knex = require('knex')({
    client: 'mysql',
    connection: {
        host: '127.0.0.1',
        port: '3306',
        user: 'root',
        password: 'konvict',
        database: 'record_company'
    }
});

app.get('/', async (req, res) => {
    const result = await knex
        .select('name_of_album')
        .from('albums')
    res.json({
        users: result
    });
});

const PORT = 3000;

app.listen(PORT, () => {
    console.log(`Running on PORT ${PORT}`)
});