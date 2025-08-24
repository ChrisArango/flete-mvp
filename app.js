const express = require('express');
const userRoutes = require("./routes/userRoutes");
const ownerRoutes = require("./routes/ownerRoutes");
const vehicleRoutes = require("./routes/vehicleRoutes");
const tripRoutes = require("./routes/tripRoutes");
require("./db/tripData");

const app = express();

app.use(express.json());

// Toda ruta que empiece con /api será redirigida a userRoutes.
app.use("/api", userRoutes);
app.use("/api/owners", ownerRoutes);
app.use("/api/vehicles", vehicleRoutes);
app.use("/api/trips", tripRoutes);

app.get('/', (req, res) => {
    res.send('¡Servidor funcionando correctamente!');
});

module.exports = app;
