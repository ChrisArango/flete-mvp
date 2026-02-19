const express = require("express");
const router = express.Router();
const vehicleController = require('../controllers/vehicleController');
const authMiddleware = require('../middlewares/authMiddleware');

// Crear o registrar vehiculos (solo autenticado)
router.post("/register",
  authMiddleware,
  vehicleController.registerVehicle);

// Rutas especificas o repuestas unica van primero que son con query
// Obtener vehiculos por id propietario autenticado
// router.get("/owner/:ownerId",
//   authMiddleware,
//   vehicleController.getVehicleByOwner);
router.get("/my",
  authMiddleware,
  vehicleController.getVehicleByOwner);

// rutas genericas  o varis respuestas van luego con params

// Obtener el vehiculo por placa
router.get("/placa/:placa",
  authMiddleware,
  vehicleController.getVehicleByPlaca);

// Obtener vehiculo por id
router.get('/id/:id',
  authMiddleware,
  vehicleController.getVehicleById);

// PUT: Actualizar vehiculos por id
router.put('/id/:id',
  authMiddleware,
  vehicleController.updateVehicle);

// DELETE: eliminar vehiculo por id
router.delete('/id/:id',
  authMiddleware,
  vehicleController.deleteVehicle);

module.exports = router;
