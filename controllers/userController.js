const User = require("../models/user");
let  listOfUsers =[];

const registerUser = (req, res) => {

  const {nombre, email, password} = req.body;

  if (!nombre || !email || !password) {
    return res.status(400).json({mensaje: "Todos los campos son obligatorios."});
  }

  const newUser = new User (nombre, email, password);

  listOfUsers.push(newUser);

  res.status(201).json({mensaje: "Usuario registrado con éxito", usuario: newUser});
};

module.exports = {registerUser};

