// ver informacion detallada en proyecto flet-notion
const express = require('express');
const authRoutes = require("./routes/authRoutes");
const ownerRoutes = require("./routes/ownerRoutes");

const app = express();

app.use(express.json());

// Toda ruta que empiece con /api será redirigida a authRoutes.
app.use("/api", authRoutes);
app.use("/api/owners", ownerRoutes);

app.get('/', (req, res) => {
    res.send('¡Servidor funcionando correctamente!');
});

module.exports = app;
