const Trip = require("../models/tripModel");

const registerTrip = async (req, res) => {

  try {
    const { ownerId, vehicleId, nombreEmpresa, manifiesto, fechaInicio, fechaFin, placa, conductor, origen, destino, tipoCarga, descripcionCarga, valorFlete, anticipo, combustible, peajes, otrosGastos } = req.body;

    if (!ownerId || !vehicleId || !nombreEmpresa || !manifiesto || !fechaInicio || !fechaFin || !placa || !conductor || !origen || !destino || !tipoCarga || !descripcionCarga || !valorFlete || !anticipo || !combustible || !peajes || !otrosGastos) {
      return res.status(400).json({
        mesaje: "Todos los campos son obligatorios."
      });
    }

    const existingTrip = await Trip.findOne({ manifiesto });
    if (existingTrip) {
      return res.status(400).json({
        mensaje: `Ya existe un viaje con numero de manifiesto: ${manifiesto}.`
      })
    }

    const newTrip = new Trip({
      ownerId,
      vehicleId,
      nombreEmpresa,
      manifiesto,
      fechaInicio,
      fechaFin,
      placa,
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

const getTripById = async (req, res) => {
  try {
    const trip = await Trip.findById(req.params.id);
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

const getTripByManifiesto = async (req, res) => {
  try {
    const { manifiesto } = req.params;

    const trip = await Trip.findOne({ manifiesto });
    if (!trip) {
      return res.status(404).json({
        mensaje: "No existe viajes con este manifiesto."
      });
    }
    res.json(trip);
  }
  catch (error) {
    res.status(500).json({
      mensaje: "Error al obtener viajes.",
      error: error.message
    });
  }
}

const getTripByPlaca = async (req, res) => {
  try {
    const { placa } = req.params;

    const trip = await Trip.find({ placa });
    if (!trip) {
      return res.status(404).json({
        mensaje: "Viaje no encontrado"
      });
    }
    res.json(trip);
  }
  catch (error) {
    res.status(500).json({
      mensaje: "Error al obtener viaje.",
      error: error.message
    });
  }
}

const getTripByOwner = async (req, res) => {
  try {
    const { ownerId } = req.params;

    const trip = await Trip.find({ ownerId });
    if (!trip) {
      return res.status(404).json({
        mensaje: "No existe viajes para este propietario"
      });
    }
    res.json(trip);
  }
  catch (error) {
    res.status(500).json({
      mensaje: "Error al obtener viaje.",
      error: error.message
    });
  }
}

const getTripByEmpresa = async (req, res) => {
  try {
    const { nombreEmpresa } = req.params;

    const trip = await Trip.find({ nombreEmpresa });
    if (!trip) {
      return res.status(404).json({
        mensaje: "No existe viajes para esta empresa."
      });
    }
    res.json(trip);
  }
  catch (error) {
    res.status(500).json({
      mensaje: "Error al obtener viaje.",
      error: error.message
    });
  }
}

const updateTrip = async (req, res) => {
  try {
    const { ownerId, vehicleId, nombreEmpresa, manifiesto, fechaInicio, fechaFin, placa, conductor, origen, destino, tipoCarga, descripcionCarga, valorFlete, anticipo, combustible, peajes, otrosGastos } = req.body;

    const updatedTrip = await Trip.findByIdAndUpdate(
      req.params.id,
      { ownerId, vehicleId, nombreEmpresa, manifiesto, fechaInicio, fechaFin, placa, conductor, origen, destino, tipoCarga, descripcionCarga, valorFlete, anticipo, combustible, peajes, otrosGastos },
      { new: true, runValidators: true, context: "query" });

    if (!updatedTrip) {
      return res.status(404).json({
        mensaje: "Viaje no encontrado"
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
    const deletedTrip = await Trip.findByIdAndDelete(req.params.id);
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

module.exports = { registerTrip, getTripById, getTripByPlaca, getTripByOwner, getTripByEmpresa, getTripByManifiesto, updateTrip, deleteTrip }
