const Trip = require("../models/Trip");

let listOfTrips = [];

const addTrip = (req, res) => {

  const {nombreEmpresa, manifiesto, fechaInicio, fechaFin, placa, conductor, origen, destino, tipoCarga, descripcionCarga,valorFlete, anticipo, combustible, peajes, otrosGastos} = req.body;

  if(!nombreEmpresa || !manifiesto || !fechaInicio || !fechaFin || !placa || !conductor || !origen || !destino || !tipoCarga || !descripcionCarga || !valorFlete || !anticipo || !combustible || !peajes || !otrosGastos) {
    return res.status(400).json({
      mesaje: "Todos los campos son obligatorios."
    });
  }

  const existingTrip = listOfTrips.find(viaje => viaje.manifiesto === manifiesto);
  if(existingTrip) {
    return res.status(400).json ({
      mensaje: `El viaje  con numero de manifiesto: ${manifiesto} ya esta registrado.`
    })
  }

  const newTrip = new Trip (nombreEmpresa, manifiesto, fechaInicio, fechaFin, placa, conductor, origen, destino, tipoCarga, descripcionCarga,valorFlete, anticipo, combustible, peajes, otrosGastos);

  listOfTrips.push(newTrip);
  res.status(201).json({
    mensaje:"Viaje registrado exitosamente.",
    viaje: newTrip
  });

};

const getAllTrip = (req, res) => {
  res.statu(201).json(listOfTrips)
}

const getTripByPlaca = (req, res) => {
  const {placa} = req.params;

  const trip = listOfTrips.find(trip => trip.placa === placa);
  if (!trip) {
    return res.status(404).json({
      mensaje:`La placa ${placa} no tiene viajes registrados.`
    });
  }
  res.status(200).json(trip);
}

const getTripByEmpresa = (req, res) => {
  const {empresa} = req.query;

  if (!empresa) {
    return res.status(400).json({
      mensaje: "Se requiere el nombre de la empresa para la consulta!"
    });
  }

  const filteredTrip = listOfTrips.filter(trip => trip.empresa === empresa);

  if (filteredTrip.length === 0) {
    return res.status(404).json({
      mensaje: `No se encontraron viajes para la empresa : ${empresa}.`
    });
  }
  res.status(200).json(filteredTrip);
}



module.exports = {addTrip, getAllTrip, getTripByPlaca, getTripByEmpresa};
