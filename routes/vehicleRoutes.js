const express = require("express");
const router = express.Router();
const vehicleController = require('../controllers/vehicleController');

// Crear o registrar vehiculos
router.post("/register", vehicleController.registertVehicle);

// Rutas especificas o repuestas unica van primero que son con query
// Obtener vehiculos por id propietario
router.get("/owner/:ownerId", vehicleController.getVehicleByOwner);

// rutas genericas  o varis respuestas van luego con params

// Obtener el vehiculo por placa
router.get("/placa/:placa", vehicleController.getVehicleByPlaca);

// Obtener vehiculo por id
router.get('/id/:id', vehicleController.getVehicleById);

// PUT: Actualizar vehiculos por placa
router.put('/id/:id', vehicleController.updateVehicle);

// DELETE: eliminar vehiculo por placa
router.delete('/id/:id', vehicleController.deleteVehicle);

module.exports = router;
