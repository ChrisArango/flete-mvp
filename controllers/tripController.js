const Trip = require("../models/Trip");
const getFechaInicioPorRango = require("../utils/dateUtils");
const {listOfTrips} = require("../db/tripData")

const addTrip = (req, res) => {

  const { nombreEmpresa, manifiesto, fechaInicio, fechaFin, placa, conductor, origen, destino, tipoCarga, descripcionCarga, valorFlete, anticipo, combustible, peajes, otrosGastos } = req.body;

  if (!nombreEmpresa || !manifiesto || !fechaInicio || !fechaFin || !placa || !conductor || !origen || !destino || !tipoCarga || !descripcionCarga || !valorFlete || !anticipo || !combustible || !peajes || !otrosGastos) {
    return res.status(400).json({
      mesaje: "Todos los campos son obligatorios."
    });
  }

  const existingTrip = listOfTrips.find(viaje => viaje.manifiesto === manifiesto);
  if (existingTrip) {
    return res.status(400).json({
      mensaje: `El viaje  con numero de manifiesto: ${manifiesto} ya esta registrado.`
    })
  }

  const newTrip = new Trip(nombreEmpresa, manifiesto, fechaInicio, fechaFin, placa, conductor, origen, destino, tipoCarga, descripcionCarga, valorFlete, anticipo, combustible, peajes, otrosGastos);

  listOfTrips.push(newTrip);
  res.status(201).json({
    mensaje: "Viaje registrado exitosamente.",
    viaje: newTrip
  });

};

const getAllTrip = (req, res) => {
  const rango = req.query.rango || "semana";

  const fechaInicio = getFechaInicioPorRango(rango);
  let filteredTrips= [];

  if (fechaInicio) {
    filteredTrips = listOfTrips.filter(trip => (new Date(trip.fechaInicio)>= fechaInicio));
  } else {
    filteredTrips = listOfTrips;
  }
  console.log("En controlador:", listOfTrips.length);
  res.status(200).json({
  count: listOfTrips.length,
  data: listOfTrips
});
}

const getTripByPlaca = (req, res) => {
  const { placa } = req.params;
  const rango = req.query.rango || null;

  if (!placa) {
    return res.status(400).json({
      mensaje: "Se requiere la placa para la consulta!"
    });
  }

  let filteredTrip = listOfTrips.filter(trip => trip.placa === placa);

  if (filteredTrip === 0) {
    return res.status(404).json({
      mensaje: `No se encontraron viajes par la placa: ${placa}.`
    });
  }
  if (rango) {
    const fechaInicio = getFechaInicioPorRango(rango);
    if (fechaInicio) {
      filteredTrip = filteredTrip.filter(trip => new Date(trip.fechaInicio) >= fechaInicio);
    }
  }
    res.status(200).json(filteredTrip);
}

const getTripByEmpresa = (req, res) => {
  const { nombreEmpresa, rango } = req.query;

  if (!nombreEmpresa) {
    return res.status(400).json({
      mensaje: "Se requiere el nombre de la empresa para la consulta!"
    });
  }

  let filteredTrip = listOfTrips.filter(trip => trip.nombreEmpresa === nombreEmpresa);

  if (filteredTrip.length === 0) {
    return res.status(404).json({
      mensaje: `No se encontraron viajes para la empresa : ${nombreEmpresa}.`
    });
  }

  if (rango) {
    const fechaInicio = getFechaInicioPorRango(rango);
    if (fechaInicio) {
      filteredTrip = filteredTrip.filter(trip => new Date(trip.fechaInicio) >= fechaInicio);
    }
  }
  res.status(200).json(filteredTrip);
}


const getTripByFilters = (req, res) => {
  const { placa, nombreEmpresa, fechaInicio, fechaFin } = req.query;

  if (!placa && !nombreEmpresa && !fechaInicio && !fechaFin) {
    return res.status(400).json({
      mensaje: "Debes de enviar al menos un filtro para realizar la busqueda."
    });
  }

  let filteredTrips = listOfTrips;

  if (placa) {
    filteredTrips = filteredTrips.filter(trip => trip.placa === placa);
  }

  if (nombreEmpresa) {
    filteredTrips = filteredTrips.filter(trip => trip.nombreEmpresa === nombreEmpresa);
  }

  filteredTrips = filteredTrips.filter(trip => {
    return trip.fechaInicio >= fechaInicio && trip.fechaFin <= fechaFin;
  });

  if (filteredTrips.length === 0) {
    return res.status(404).json({
      mensaje: "NO se encontraron viajes con los filtros aplicado"
    });
  }

  res.status(200).json(filteredTrips);

}


module.exports = { addTrip, getAllTrip, getTripByPlaca, getTripByEmpresa, getTripByFilters };
