const express = require("express");
const router = express.Router();
const vehicleController = require('../controllers/vehicleController');

// POST: agregar un vehiculo
router.post("/", vehicleController.addVehicle);

// GET: Obtener vehiculos por propietario
router.get("/", vehicleController.getVehicleByOwner);
// GET: Obtener todo los vehiculos
router.get("/",vehicleController.getAllVehicle);
// GET: Obtener el vehiculo por placa
router.get("/:placa", vehicleController.getVehicleByPlaca);


module.exports = router;
