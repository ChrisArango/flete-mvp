const express = require("express");
const router = express.Router();
const tripController = require('../controllers/tripController');

// registar viaje
router.post('/register', tripController.registerTrip);

// NOTA: las consultas especificas o exactas deben ir antes que las generales.

// obtener viaje por id -> consulta especifica
router.get('/id/:id', tripController.getTripById);

// obtener viajes por No. manifiesto -> consulta especifica
router.get('/manifiesto/:manifiesto', tripController.getTripByManifiesto);


// obtener viajes por placa -> consulta varias
router.get('/placa/:placa', tripController.getTripByPlaca);

// obtener viajes por propietario -> consulta varias
router.get('/owner/:ownerId', tripController.getTripByOwner);

// obtener viajes por empresa -> consulta varias
router.get('/nombreEmpresa/:nombreEmpresa', tripController.getTripByEmpresa);


// actualizar viaje por id
router.put('/id/:id', tripController.updateTrip);

// eliminar viaje por id
router.delete('/id/:id', tripController.deleteTrip);

module.exports = router;
