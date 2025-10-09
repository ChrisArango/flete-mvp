const mongoose = require("mongoose");

const tripSchema = new mongoose.Schema({

  ownerId: { type: mongoose.Schema.Types.ObjectId, ref: "Owner", required: true },
  vehicleId: { type: mongoose.Schema.Types.ObjectId, ref: "Vehicle", required: true },

  nombreEmpresa: { type: String, required: true, lowercase: true, trim: true },
  manifiesto: { type: String, required: true, lowercase: true, trim: true },

  fechaInicio: { type: Date, required: true },
  fechaFin: { type: Date, required: true },
  diasViaje: { type: Number, default: 0 },

  placa: { type: String, required: true, lowercase: true, trim: true },
  conductor: { type: String, required: true, lowercase: true, trim: true },
  origen: { type: String, required: true, lowercase: true, trim: true },
  destino: { type: String, required: true, lowercase: true, trim: true },
  tipoCarga: { type: String, enum: ["contenedor", "carga suelta", "granel"], required: true, lowercase: true, trim: true },
  descripcionCarga: { type: String, required: true, lowercase: true, trim: true },

  valorFlete: { type: Number, required: true },
  anticipo: { type: Number, required: true },
  saldoCobrar: { type: Number, default: 0 },
  combustible: { type: Number, required: true },
  peajes: { type: Number, required: true },
  otrosGastos: { type: Number, required: true },
  totalGastos: { type: Number, default: 0 },
  saldo: { type: Number, default: 0 },
  utilidadFlete: { type: Number, default: 0 },

}, { timestamps: true });

tripSchema.pre("save", function (next) {

  if (this.fechaInicio && this.fechaFin) {
    const diff = this.fechaFin - this.fechaInicio;
    this.diasViaje = Math.ceil(diff / (1000 * 60 * 60 * 24));
  }

  this.totalGastos = this.combustible + this.peajes + this.otrosGastos;
  this.saldo = this.anticipo - this.totalGastos;
  this.utilidadFlete = this.valorFlete - this.totalGastos;
  this.saldoCobrar = this.valorFlete - this.anticipo;

  next();
});

module.exports = mongoose.model("Trip", tripSchema);
