const Trip = require("../models/Trip");
const getFechaInicioPorRango = require("../utils/dateUtils");
const { listOfTrips } = require("../db/tripData")

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
  const orden = req.query.orden || "desc"; // Por defecto descendente

  const fechaInicio = getFechaInicioPorRango(rango);
  let filteredTrips = [];

  if (!fechaInicio) {
    return res.status(400).json({
      mensaje: `El valor del rango '${rango}' no es válido. Usa: semana, mes, 3meses, 6meses o año.`
    });
  }
  // Filtrar los viajes que tienen fechaInicio mayor o igual al rango
  if (fechaInicio) {
    filteredTrips = listOfTrips.filter(trip => (new Date(trip.fechaInicio) >= fechaInicio));
  } else {
    filteredTrips = listOfTrips;
  }

  //implementacion de orden de viajes
  if (orden === "asc") {
    filteredTrips.sort((a, b) => new Date(a.fechaInicio) - new Date(b.fechaInicio));
  } else {
    filteredTrips.sort((a, b) => new Date(b.fechaInicio) - new Date(a.fechaInicio));
  }
  res.status(200).json(filteredTrips);
}

const getTripByPlaca = (req, res) => {
  const { placa } = req.params;
  const rango = req.query.rango || null;
  const orden = req.query.orden || "desc";

  if (!placa) {
    return res.status(400).json({
      mensaje: "Se requiere la placa para la consulta!"
    });
  }

  let filteredTrip = listOfTrips.filter(trip => trip.placa === placa);

  if (filteredTrip.length === 0) {
    return res.status(404).json({
      mensaje: `No se encontraron viajes par la placa: ${placa}.`
    });
  }
  if (rango) {
    const fechaInicio = getFechaInicioPorRango(rango);
    if (!fechaInicio) {
      return res.status(400).json({
        mensaje: `El valor del rango '${rango}' no es válido. Usa: semana, mes, 3meses, 6meses o año.`
      });
    }

    if (fechaInicio) {
      filteredTrip = filteredTrip.filter(trip => new Date(trip.fechaInicio) >= fechaInicio);
    }
  }

  // Ordenar por fecha
  if (orden === "asc") {
    filteredTrip.sort((a, b) => new Date(a.fechaInicio) - new Date(b.fechaInicio));
  } else {
    filteredTrip.sort((a, b) => new Date(b.fechaInicio) - new Date(a.fechaInicio));
  }

  res.status(200).json(filteredTrip);
}

const getTripByEmpresa = (req, res) => {
  const { nombreEmpresa, rango } = req.query;
  const orden = req.query.orden || "desc";

  if (!nombreEmpresa) {
    return res.status(400).json({
      mensaje: "Se requiere el nombre de la empresa para la consulta!"
    });
  }

  let filteredTrip = listOfTrips.filter(trip => trip.nombreEmpresa.toLowerCase() === nombreEmpresa.toLowerCase());

  if (filteredTrip.length === 0) {
    return res.status(404).json({
      mensaje: `No se encontraron viajes para la empresa : ${nombreEmpresa}.`
    });
  }

  if (rango) {
    const fechaInicio = getFechaInicioPorRango(rango);
    if (!fechaInicio) {
      return res.status(400).json({
        mensaje: `El valor del rango '${rango}' no es válido. Usa: semana, mes, 3meses, 6meses o año.`
      });
    }

    if (fechaInicio) {
      filteredTrip = filteredTrip.filter(trip => new Date(trip.fechaInicio) >= fechaInicio);
    }
  }

  // Ordenar por fecha
  if (orden === "asc") {
    filteredTrip.sort((a, b) => new Date(a.fechaInicio) - new Date(b.fechaInicio));
  } else {
    filteredTrip.sort((a, b) => new Date(b.fechaInicio) - new Date(a.fechaInicio));
  }

  res.status(200).json(filteredTrip);
}

const updateTrip = (req, res) => {
  const { manifiesto } = req.params;
  const dataToUpdate = req.body;

  const existingTrip = listOfTrips.findIndex(trip => trip.manifiesto === manifiesto);

  if (existingTrip === -1) {
    return res.status(404).json({
      mensaje: `No se encontró ningún viaje con el manifiesto: ${manifiesto}`
    });
  }

  // actualizamos con el spread operation
  listOfTrips[existingTrip] = {
    ...listOfTrips[existingTrip], // copia todo el objeto
    ...dataToUpdate // cambio solo el campo enviapor body
  };

  return res.status(200).json({
    mensaje: `Viaje con manifiesto ${manifiesto} se actualizado correctamente`,
    viajeActualizado: listOfTrips[existingTrip]
  });

}

const deleteTrip = (req, res) => {
  const { manifiesto } = req.params;
  const existingTrip = listOfTrips.findIndex(trip => trip.manifiesto === manifiesto);

  if (existingTrip === -1) {
    return res.status(404).json({
      mensaje: `No se encontró ningún viaje con el manifiesto: ${manifiesto}`
    });
  }

  listOfTrips.splice(existingTrip, 1);
  return res.status(200).json({
    mensaje: `Viaje con manifiesto ${manifiesto} eliminado exitosamente`
  });
}


module.exports = { addTrip, getAllTrip, getTripByPlaca, getTripByEmpresa, updateTrip, deleteTrip };
