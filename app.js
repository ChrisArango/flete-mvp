// ver informacion detallada en proyecto flet-notion
const express = require('express');
const userRoutes = require("./routes/userRoutes");
const ownerRoutes = require("./routes/ownerRoutes");

const app = express();

app.use(express.json());

// Toda ruta que empiece con /api será redirigida a userRoutes.
app.use("/api", userRoutes);
app.use("/api/owners", ownerRoutes);

app.get('/', (req, res) => {
    res.send('¡Servidor funcionando correctamente!');
});

module.exports = app;
