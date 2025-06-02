const User = require("../models/user");
let  usuarios =[];

const registerUser = (req, res) => {

  const {nombre, email, password} = req.body;

  if (!nombre || !email || !password) {
    return res.status(404).json({mensaje: "Todos los campos son obligatorios."});
  }

  const nuevoUsusario = new User (nombre, email, password);

  usuarios.push(nuevoUsusario);

  res.status(201).json({mensaje: "Usuario registrado con éxito", usuario: nuevoUsusario});
};

module.exports = {registerUser};

