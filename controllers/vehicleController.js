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

  const newVehicle = new Vehicle (placa, marca, modelo, clase, ownerId);

  listOfVehicle.push(newVehicle);
  res.status(201).json({
    mensaje:"Vehiculo registado exitosamente",
    Vehiculo: newVehicle
  });
}



module.exports = {addVehicle};


