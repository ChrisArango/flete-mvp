const express = require("express");
const router = express.router();
const tripController = require('../controllers/tripController');

// POST: agregar viaje
router.post("/", tripController.addTrip);

// GET: obtener todo los viajes
router.get("/", tripController.getAllTrip);
// GET: obtener viajes por placa
router.get("/:placa", tripController.getTripByPlaca);
// GET: obtener viajes por empresa
router.get("/by-empresa", tripController.getTripByEmpresa);

module.exports = router;
