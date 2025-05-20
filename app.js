// ver informacion detallada en proyecto flet-notion
const express = require('express');

const app = express();

app.use(express.json());

app.get('/', (req, res) => {
    res.send('¡Servidor funcionando correctamente!');
});

module.exports = app;
