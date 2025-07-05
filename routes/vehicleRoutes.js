const express = require("express");
const router = express.Router();
const vehicleController = require('../controllers/vehicleController');

// POST: agregar un vehiculo /api/vehicles
router.post("/", vehicleController.addVehicle);

// GET: Obtener todo los vehiculos /api/vehicles
router.get("/", vehicleController.getAllVehicle);
// GET: Obtener el vehiculo por placa /api/vehicles/:placa
router.get("/:placa", vehicleController.getVehicleByPlaca);
// GET: Obtener vehiculos por propietario /api/vehicles/by-owner?ownerId=123
router.get("/by-owner", vehicleController.getVehicleByOwner);

// DELETE: eliminar vehiculo por placa
router.delete("/:placa", vehicleController.deleteVehicle);


module.exports = router;
