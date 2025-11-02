const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const ownerSchema = new mongoose.Schema({
  rol: { type: String, enum: ["owner", "admin"], default: "owner" }, // <-- Asignamos el rol por defecto
  nombre: { type: String, required: [true, "El nombre es obligatorio"], lowercase: true, trim: true },
  documentoId: { type: Number, required: true, unique: true },
  celular: { type: Number, required: true },
  email: { type: String, required: [true, "El email es obligatorio"], unique: true, lowercase: true, trim: true, match: [/^\S+@\S+\.\S+$/, "Formato de correo inválido"] },
  password: { type: String, required: [true, "La contraseña es obligatoria"], minlength: [6, " La contraseña debe tener al menos 6 caracteres"], select: false },

}, { timestamps: true });

// 🔒 Middleware: se ejecuta antes de guardar (solo si cambia el password)
ownerSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

// 🔍 Método para comparar contraseñas (útil en login)
ownerSchema.methods.comparePassword = async function (passwordIngresada) {
  return await bcrypt.compare(passwordIngresada, this.password);
};

module.exports = mongoose.model("Owner", ownerSchema);
