const mongoose = require("mongoose");

const ownerSchema = new mongoose.Schema({
  tipo: { type: String, enum: ["persona", "empresa"], required: true, lowercase: true, trim: true },
  nombre: { type: String, required: true, lowercase: true, trim: true },
  documentoId: { type: Number, required: true, unique: true },
  celular: { type: Number, required: true },
  email: { type: String, required: true, unique: true, lowercase: true, trim: true, match: [/^\S+@\S+\.\S+$/, "Formato de correo inválido"] },
  password: { type: String, required: true },

}, { timestamps: true });

module.exports = mongoose.model("Owner", ownerSchema);
