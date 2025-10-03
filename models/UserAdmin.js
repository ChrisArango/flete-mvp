const mongoose = require("mongoose");

const userAdminSchema = new mongoose.Schema({
  username: { type: String, required: true, trim: true, unique: true }, // trim -> elimina espacio, unique -> no puede repetirse
  email: { type: String, required: true, trim: true, unique: true, lowercase: true },
  password: { type: String, required: true },
  role: { type: String, enum: ["admin"], default: "admin" },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model("UserAdmin", userAdminSchema);




// class UserAdmin {
//   constructor(nombre, email, password) {
//     this.nombre = nombre;
//     this.email = email;
//     this.password = password;
//     this.createdAt = new Date();
//   }
// }

// module.exports = UserAdmin;
