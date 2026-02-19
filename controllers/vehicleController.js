const Vehicle = require("../models/vehicleModel");

const registerVehicle = async (req, res) => {

  try {

    const { placa, marca, modelo, clase } = req.body;

    // Ahora Ya no se pide el ownerId
    const ownerId = req.user;    // <-- viene del token

    if (!placa || !marca || !modelo || !clase) {
      return res.status(400).json({
        mensaje: "Todos los campos son obligatorios."
      });
    }


    const existingVehicle = await Vehicle.findOne({ placa });
    if (existingVehicle) {
      return res.status(400).json({
        mensaje: "Ya existe un vehiculo con esta placa"
      });
    }

    const newVehicle = new Vehicle({
      ownerId,
      placa,
      marca,
      modelo,
      clase
    });

    await newVehicle.save();

    res.status(201).json({
      mensaje: "Vehiculo creado exitosamente",
      vehicleId: newVehicle._id
    });
  }
  catch (error) {
    res.status(500).json({
      mensaje: "Error al crear el vehiculo",
      error: error.message
    });
  };
}

const getVehicleById = async (req, res) => {
  try {
    const vehicle = await Vehicle.findById(req.params.id)
      .populate("ownerId", "nombre documentoId email")

    if (!vehicle) {
      return res.status(404).json({
        mensaje: "Vehiculo no encontrado"
      });
    }
    res.json(vehicle);
  }
  catch (error) {
    res.status(500).json({
      mensaje: "Error al obtener vehiculo",
      error: error.message
    });
  };
}

const getVehicleByPlaca = async (req, res) => {
  try {

    const { placa } = req.params;

    const vehicle = await Vehicle.findOne({ placa })
      .populate("ownerId", "nombre documentoId email");

    if (!vehicle) {
      return res.status(404).json({
        mensaje: "Vehiculo no encontrado"
      });
    }
    res.json(vehicle);
  } catch (error) {
    res.status(500).json({
      mensaje: "Error al obtener vehiculo por placa.",
      error: error.message
    });
  }
};

const getVehicleByOwner = async (req, res) => {
  try {
    const ownerId = req.user; // <-- dueño autenticado

    const vehicles = await Vehicle.find({ ownerId })
      .populate("ownerId", "nombre documentoId email");

    if (vehicles.length === 0) {
      return res.status(404).json({
        mensaje: "No existe vehiculos para este propietario"
      });
    }
    res.json(vehicles);
  }
  catch (error) {
    res.status(500).json({
      mensaje: "Error al obtener vehículos del propietario",
      error: error.message
    });
  }
}

const updateVehicle = async (req, res) => {
  try {
    const ownerId = req.user;  // <--- evita cambiar ownerId , dueño autenticado

    const { placa, marca, modelo, clase } = req.body;

    // Validamos  que le vehculo le pertenezca
    const updatedVehicle = await Vehicle.findOneAndUpdate(
      { _id: req.params.id, ownerId },  // <--- dueño solo actualiza lo suyo
      { placa, marca, modelo, clase },
      { new: true, runValidators: true });

    if (!updatedVehicle) {
      return res.status(404).json({
        mensaje: "Vehiculo no encontrado o no pertenece al propietario"
      });
    }
    res.json({
      mensaje: "Vehiculo actualizado exitosamente",
      vehicle: updatedVehicle
    });

  }
  catch (error) {
    res.status(500).json({
      mensaje: " Error al actualizar Vehiculo",
      error: error.message
    });
  }
}

const deleteVehicle = async (req, res) => {
  try {

    const ownerId = req.user;

    const deletedVehicle = await Vehicle.findOneAndDelete({
      _id: req.params.id,
      ownerId
    });

    if (!deletedVehicle) {
      return res.status(404).json({
        mensaje: "Vehiculo no encontrado o no pertenece al porpietario"
      });
    }
    res.json({
      mensaje: "Vehiculo eliminado exitosamente"
    });
  }
  catch (error) {
    res.status(500).json({
      mensaje: "Error al eliminar vehiculo",
      error: error.message
    });
  }
};

module.exports = { registerVehicle, getVehicleById, getVehicleByPlaca, getVehicleByOwner, updateVehicle, deleteVehicle };


// ya adiciones populate en las 3 primera fucniones  ahora solo falta hacer prueba enpostman , luegi hacer commit
// ya cree 3 propietario , ahora falta hacer login en cada uno y registar los vehiculos  y revisar que funciones las rutas y el populate
