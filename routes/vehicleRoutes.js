const express = require("express");
const router = express.Router();
const vehicleController = require('../controllers/vehicleController');

// POST: agregar un vehiculo /api/vehicles
router.post("/", vehicleController.addVehicle);

// GET: Obtener todo los vehiculos /api/vehicles
router.get("/", vehicleController.getAllVehicle);

// Rutas especificas o repuestas unica van primero que son con query
// GET: Obtener vehiculos por propietario /api/vehicles/by-owner?ownerId=123
router.get("/by-owner", vehicleController.getVehicleByOwner);

// rutas genericas  o varis respuestas van luego con params
// GET: Obtener el vehiculo por placa /api/vehicles/:placa
router.get("/:placa", vehicleController.getVehicleByPlaca);

// PUT: Actualizar vehiculos por placa
router.put("/:placa", vehicleController.updateVehicle);

// DELETE: eliminar vehiculo por placa
router.delete("/:placa", vehicleController.deleteVehicle);


module.exports = router;
