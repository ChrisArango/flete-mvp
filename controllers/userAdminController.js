const UserAdmin = require("../models/UserAdmin"); // Importamos el modelo UserAdmin
const bcrypt = require("bcrypt"); // Libreria para encriptar contraseñas

const registerUserAdmin = async (req, res) => {
  try {

    // 1. Extraemos los datos que vienen en la petición (req.body)
    const { username, email, password } = req.body;

    // 2. Validamos que los campos obligatorios estén presentes
    if (!username || !email || !password) {
      return res.status(400).json({
        mensaje: "Todos los campos son obligatorios."
      });
    }

    // 3. Verificamos si ya existe un usuario con ese email
    const existingUserAdmin = await UserAdmin.findOne({ email });
    if (existingUserAdmin) {
      return res.status(400).json({
        mensaje: "El correo ya esta registrado como Admin"
      });
    }

    // 4. Encriptamos la contraseña antes de guardarla
    const hashedPassword = await bcrypt.hash(password, 10); // (10 → número de “salt rounds”, que define la seguridad del hash)

    // 5. Creamos un nuevo ususrio tipo "admin"
    const newUserAdmin = new UserAdmin({
      username,
      email,
      password: hashedPassword,
      role: "admin"
    });

    // 6. Guardamos en la base de datos
    await newUserAdmin.save();

    // 7. Respondemos al cleinte con exito
    res.status(201).json({
      mensaje: "Administrador registrado exitosamente",
      admin: {
        id: newUserAdmin._id,
        username: newUserAdmin.username,
        email: newUserAdmin.email,
        rol: newUserAdmin.role,
      }
    });

  }
  catch (error) {
    console.error("Error al registar Admin:", error);
    res.status(500).json({
      mensaje: "Error en el servidor"
    });
  }

};

// revisar si este suguiente codigo esta bien , es listar todo los owners
const getOwners = async (req, res) => {
  try {
    const owners = await Owner.find();
    res.json(owners);
  }
  catch (error) {
    res.status(500).json({
      mensaje: "Error al obtener propietarios",
      error: error.message
    });

  }
};

module.exports = { registerUserAdmin };






































// const User = require("../models/User");
// let  listOfUsers =[];

// const registerUser = (req, res) => {

//   const {nombre, email, password} = req.body;

//   if (!nombre || !email || !password) {
//     return res.status(400).json({
//       mensaje: "Todos los campos son obligatorios."
//     });
//   }

//   const newUser = new User (nombre, email, password);

//   listOfUsers.push(newUser);

//   res.status(201).json({
//     mensaje: "Usuario registrado con éxito",
//     usuario: newUser
//   });
// };

// module.exports = {registerUser};

