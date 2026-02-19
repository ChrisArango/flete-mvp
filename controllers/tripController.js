const Trip = require("../models/tripModel");
const Vehicle = require("../models/vehicleModel");
const { getCalendarRange } = require("../utils/dataRange");

const registerTrip = async (req, res) => {

  try {
    const ownerId = req.user;
    const { vehicleId, nombreEmpresa, manifiesto, fechaInicio, fechaFin, conductor, origen, destino, tipoCarga, descripcionCarga, valorFlete, anticipo, combustible, peajes, otrosGastos } = req.body;

    if (!vehicleId || !nombreEmpresa || !manifiesto || !fechaInicio || !fechaFin || !conductor || !origen || !destino || !tipoCarga || !descripcionCarga || !valorFlete || !anticipo || !combustible || !peajes || !otrosGastos) {
      return res.status(400).json({
        mesaje: "Todos los campos son obligatorios."
      });
    }

    // validar que el vehiculo sea del propietario
    const vehicle = await Vehicle.findOne({ _id: vehicleId, ownerId });
    if (!vehicle) {
      return res.status(403).json({
        mensaje: 'El vehiculo no pertenece al propietario'
      });
    }

    // Evitar doble manifiesto duplicado por owner
    const existingTrip = await Trip.findOne({ manifiesto, ownerId });
    if (existingTrip) {
      return res.status(400).json({
        mensaje: `Ya existe un viaje con numero de manifiesto: ${manifiesto}.`
      })
    }

    const newTrip = new Trip({
      ownerId,
      vehicleId,
      placa: vehicle.placa,
      nombreEmpresa,
      manifiesto,
      fechaInicio,
      fechaFin,
      conductor,
      origen,
      destino,
      tipoCarga,
      descripcionCarga,
      valorFlete,
      anticipo,
      combustible,
      peajes,
      otrosGastos
    });

    await newTrip.save();
    res.status(201).json({
      mensaje: "Viaje creado exitosamente.",
      tripId: newTrip._id
    });

  }
  catch (error) {
    res.status(500).json({
      mensaje: "Error al crear el viaje",
      error: error.message
    });
  };

};

const getTripsByOwner = async (req, res) => {
  try {

    // 1️⃣ Sacamos el owner autenticado
    const ownerId = req.user;

    // 2️⃣ Sacamos filtros opcionales del query
    const { placa, empresa, manifiesto, range } = req.query;

    // 3️⃣ Creamos objeto base de filtro
    const filter = { ownerId };

    // 4️⃣ Si hay placa, la agregamos
    if (placa) {
      filter.placa = placa.toUpperCase();
    }

    // 5️⃣ Si hay empresa, la agregamos
    if (empresa) {
      filter.nombreEmpresa = empresa.toLowerCase();
    }

    if (manifiesto) {
      filter.manifiesto = manifiesto;
    }

    // 6️⃣ Si hay rango de fechas
    if (range) {
      const dates = getCalendarRange(range);
      if (dates) {
        filter.createdAt = {
          $gte: dates.start,
          $lte: dates.end
        }
      };
    }

    const trips = await Trip.find(filter).sort({ createdAt: -1 });
    if (!trips.length) {
      return res.status(404).json({
        mensaje: "No existe viajes para este propietario"
      });
    }
    res.json(trips);
  }
  catch (error) {
    res.status(500).json({
      mensaje: "Error al obtener viaje.",
      error: error.message
    });
  }
}

const getTripById = async (req, res) => {
  try {

    const ownerId = req.user;
    const { id } = req.params;

    const trip = await Trip.findOne({ _id: id, ownerId });
    if (!trip) {
      return res.status(404).json({
        mensaje: "Viaje no encontrado"
      });
    }
    res.json(trip);
  }
  catch (error) {
    res.status(500).json({
      mensaje: "Error al obtener viaje",
      error: error.message
    });
  };
}

const updateTrip = async (req, res) => {
  try {

    const ownerId = req.user;

    const { vehicleId, nombreEmpresa, manifiesto, fechaInicio, fechaFin, placa, conductor, origen, destino, tipoCarga, descripcionCarga, valorFlete, anticipo, combustible, peajes, otrosGastos } = req.body;

    const updatedTrip = await Trip.findByIdAndUpdate(
      { _id: req.params.id, ownerId },
      { ownerId, vehicleId, nombreEmpresa, manifiesto, fechaInicio, fechaFin, placa, conductor, origen, destino, tipoCarga, descripcionCarga, valorFlete, anticipo, combustible, peajes, otrosGastos },
      { new: true, runValidators: true, context: "query" });

    if (!updatedTrip) {
      return res.status(404).json({
        mensaje: "Viaje no encontrado o no autorizado"
      });
    }
    res.json({
      mensaje: "Viaje actualizado exitosamente",
      vehicle: updatedTrip
    });
  }
  catch (error) {
    res.status(500).json({
      mensaje: " Error al actualizar Viaje",
      error: error.message
    });
  }

}

const deleteTrip = async (req, res) => {
  try {

    const ownerId = req.user;

    const deletedTrip = await Trip.findByIdAndDelete({ _id: req.params.id, ownerId });
    if (!deletedTrip) {
      return res.status(404).json({
        mensaje: "Viaje no encontrado"
      });
    }
    res.json({
      mensaje: "Viaje eliminado exitosamente",
      vehicle: deletedTrip
    });
  }
  catch (error) {
    res.status(500).json({
      mensaje: " Error al eliminar Viaje",
      error: error.message
    });
  }
};


module.exports = { registerTrip, getTripById, getTripsByOwner, updateTrip, deleteTrip }
