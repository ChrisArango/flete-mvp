const mongoose = require("mongoose");
const ownerModel = require("./ownerModel");

const vehicleSchema = new mongoose.Schema({
  ownerId: { type: mongoose.Schema.Types.ObjectId, ref: "Owner", required: true },
  placa: { type: String, required: true, unique: true, lowercase: true, trim: true },
  marca: { type: String, required: true, lowercase: true, trim: true },
  modelo: { type: Number, required: true },
  clase: { type: String, required: true, lowercase: true, trim: true },

}, { timestamps: true });

module.exports = mongoose.model("Vehicle", vehicleSchema);
