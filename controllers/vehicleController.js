const Vehicle = require("../models/Vehicle");

let listOfVehicle = [];

const addVehicle = (req, res) => {

  const { placa, marca, modelo, clase, ownerId } = req.body;

  if (!placa || !marca || !modelo || !clase || !ownerId) {
    return res.status(400).json({
      mensaje: "Todos los campos son obligatorios."
    });
  }

  const existingVehicle = listOfVehicle.find(vehicle => vehicle.placa === placa);
  if (existingVehicle) {
    return res.status(400).json({
      mensaje: "Esta placa ya esta registrada"
    });
  }

  const newVehicle = new Vehicle(placa, marca, modelo, clase, ownerId);

  listOfVehicle.push(newVehicle);
  res.status(201).json({
    mensaje: "Vehiculo registado exitosamente",
    Vehiculo: newVehicle
  });
}

const getAllVehicle = (req, res) => {
  res.status(200).json(listOfVehicle)
}

const getVehicleByPlaca = (req, res) => {
  const { placa } = req.params;

  const vehicle = listOfVehicle.find(vehicle => vehicle.placa === placa);
  if (!vehicle) {
    return res.status(404).json({
      mensaje: "Vehiculo no encontrado"
    });
  }
  res.status(200).json(vehicle);
}

const getVehicleByOwner = (req, res) => {
  const { ownerId } = req.query;

  if (!ownerId) {
    return res.status(400).json({
      mensaje: "Se requiere el ID del propietario para la consulta."
    });
  }

  const filteredVehicle = listOfVehicle.filter(vehicle => vehicle.ownerId === ownerId);

  if (filteredVehicle.length === 0) {
    return res.status(404).json({
      mensaje: "No se encontraron vehiculos para este propietario."
    });
  }

  res.status(200).json(filteredVehicle);
}

const updateVehicle = (req, res) => {
  const {placa} = req.params;
  const dataToUpdate = req.body;

  const vehicle = listOfVehicle.findIndex(vehicle => vehicle.placa === placa);

  if(vehicle === -1) {
    return res.status(404).json({
      mesaje: "Vehiculo no encontrado"
    });
  }

  // actualizamos con el spread operation
  listOfVehicle[vehicle] = {
    ...listOfVehicle[vehicle], // copia todo el objeto
    ...dataToUpdate // cambio solo el campo envia por body
  };

  return res.status(200).json({
    mensaje: `Viaje con ${placa} se actualizado correctamente`,
    vehiculoActualizado: listOfVehicle[vehicle]
  });
}

const deleteVehicle = (req, res) => {

  const {placa} = req.params;

  const vehicle = listOfVehicle.findIndex(vehicle => vehicle.placa === placa);

  if(vehicle === -1) {
    return res.status(404).json({
      mesaje: "Vehiculo no encontrado"
    });
  }

  listOfVehicle.splice(vehicle, 1);
  return res.status(200).json({
    mensaje: "Vehiculo eliminado exitosamente"
  });
}

module.exports = { addVehicle, getAllVehicle, getVehicleByPlaca, getVehicleByOwner,updateVehicle, deleteVehicle };


