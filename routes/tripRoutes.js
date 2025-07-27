const express = require ("express");
const router = express.Router();
const tripController = require('../controllers/tripController');

// POST: agregar viaje
router.post("/", tripController.addTrip);

// GET: obtener todo los viajes
router.get("/", tripController.getAllTrip);

// rutas especificas primero con query
// GET: obtener viajes por empresa (query)
router.get("/by-empresa", tripController.getTripByEmpresa);
// GET: buscar viajes con filtros combinados (query)
router.get("/buscar", tripController.getTripByFilters);// posiblemte lo borrare

// Luego rutas genericas con params
// GET: obtener viajes por placa(params)
router.get("/:placa", tripController.getTripByPlaca);


module.exports = router;
