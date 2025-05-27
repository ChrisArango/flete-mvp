const User = require("../models/user");
let  usuarios =[]; // base de datos teporal

const registerUser = (req, res) => {
  // Extrae los datos enviados por el cliente (nombre, email y password).
  const {nombre, email, password} = req.body;

  // Valida que estén completos.
  if (!nombre || !email || !password) {
    return res.status(404).json({mensaje: "Todos los campos son obligatorios."});
  }

  // Crea un nuevo usuario con el modelo.
  const nuevoUsusario = new User (nombre, email, password);

  // Lo guarda temporalmente en un array.
  usuarios.push(nuevoUsusario);

  // Responde con un mensaje de éxito y los datos.
  res.status(201).json({mensaje: "Usuario registrado con éxito", usuario: nuevoUsusario});
};

module.exports = {registerUser};

// quede en el paso cuatro conectar la ruta al app.js - esto despues de la configuracion de github
