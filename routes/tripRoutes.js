const express = require("express");
const router = express.Router();
const tripController = require('../controllers/tripController');
const authMiddleware = require('../middlewares/authMiddleware');


// registar viaje
router.post('/register',
  authMiddleware,
  tripController.registerTrip);

// obtener viajes por propietario -> consulta varias ( con filtros especiales)
router.get('/my',
  authMiddleware,
  tripController.getTripsByOwner);

// NOTA: las consultas especificas o exactas deben ir antes que las generales.

// obtener viaje por id -> consulta especifica, un resultado
router.get('/id/:id',
  authMiddleware,
  tripController.getTripById);

// actualizar viaje por id
router.put('/id/:id',
  authMiddleware,
  tripController.updateTrip);

// eliminar viaje por id
router.delete('/id/:id',
  authMiddleware,
  tripController.deleteTrip);

module.exports = router;
