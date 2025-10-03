const Vehicle = require("../models/vehicleModel");

const registertVehicle = async (req, res) => {

  try {

    const { ownerId, placa, marca, modelo, clase } = req.body;

    if (!ownerId || !placa || !marca || !modelo || !clase) {
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
    const vehicle = await Vehicle.findById(req.params.id);
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

    const vehicle = await Vehicle.findOne({ placa });
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
    const { ownerId } = req.params;

    const vehicles = await Vehicle.find({ ownerId });
    if (vehicles.length === 0) {
      return res.status(404).json({
        mensaje: "No existe vehiculos para este propietario"
      });
    }
    res.json(vehicles);
  }
  catch (error) {
    res.status(500).json({
      mensaje: "Error al obtener vehículos del porpietario",
      error: error.message
    });
  }
}

const updateVehicle = async (req, res) => {
  try {
    const { ownerId, placa, marca, modelo, clase } = req.body;

    const updatedVehicle = await Vehicle.findByIdAndUpdate(
      req.params.id,
      { ownerId, placa, marca, modelo, clase },
      { new: true, runValidators: true, context: "query" });

    if (!updatedVehicle) {
      return res.status(404).json({
        mensaje: "Vehiculo no encontrado"
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

    const deletedVehicle = await Vehicle.findByIdAndDelete(req.params.id);
    if (!deletedVehicle) {
      return res.status(404).json({
        mensaje: "Vehiculo no encontrado"
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

module.exports = { registertVehicle, getVehicleById, getVehicleByPlaca, getVehicleByOwner, updateVehicle, deleteVehicle };


