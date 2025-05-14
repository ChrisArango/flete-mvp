// Importar Express para crear un servidor 
// y manejar peticiones GET, POST, PUT, DELETE.
const express = require('express');

// ------------------------------------------

// router -> organizo rutas por grupo (ruta propietario, ruta viajes, ruta reporte).
// express.Router() -> me da un mini servisor especializado en rutas.
const router = express.Router();

// ---------------------------------

// importa archivo ownerController.js que tiene logica especifica de esta ruta.
const ownerController = require('../controllers/ownerController');

// --------------------------------------------

// define ruta POST que se activa cuando hacen envio de datos al endpoint(/registro).
// '/registro' -> Es la URL del endpoint.
// ownerController.registrarPropietario -> función que manejará solicitud, y validará o guardará datos de formulario de registro.
router.post('/registro', ownerController.registrarPropietario);

// --------------------------------------------

// Permite exportat la variabe router, asi otraspartes del codigo pueden usar el consjuto de rutas.
module.exports = router;