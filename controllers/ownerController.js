const jwt = require('jsonwebtoken');
const bcrypt = require("bcrypt");
const Owner = require("../models/ownerModel");

const registerOwner = async (req, res) => {
  try {

    // 1. Extraemos los datos que vienen en la petición (req.body)
    const { rol, nombre, documentoId, celular, email, password } = req.body

    // 2. Verificamos si ya existe un usuario con ese email
    const existingOwner = await Owner.findOne({ $or: [{ email }, { documentoId }] });
    if (existingOwner) {
      return res.status(400).json({
        mensaje: "Ya existe un propietario con este email o documento"
      });
    }

    // 3. Creamos un nuevo Owner
    const newOwner = new Owner({ rol, nombre, documentoId, celular, email, password });

    // 4. Guardamos en base de datos y Respondemos al cliente con exito
    await newOwner.save();

    // 5. respuesta exitosa
    res.status(201).json({
      mensaje: "Propietario registrado exitosamente",
      ownerId: newOwner._id
    });

  }
  catch (error) {
    res.status(500).json({
      mensaje: "Error al registrar propietario",
      error: error.message
    });
  }
}

const loginOwner = async (req, res) => {
  try {
    // 1. extraemos datos del body
    const { email, password } = req.body;

    // 2. Validamos campos vacios
    if (!email || !password) {
      return res.status(400).json({
        mensaje: "El email y la contraseña son obligatorios"
      });
    }

    // 3. buscar el owner por email
    const owner = await Owner.findOne({ email }).select("+password");
    if (!owner) {
      return res.status(404).json({
        mensaje: "No existe un propietario con ese email."
      });
    }

    // 4. comparar contraseñas
    const isMatch = await bcrypt.compare(password, owner.password);
    if (!isMatch) {
      return res.status(401).json({
        mensaje: " Contraseña incorrecta"
      });
    }

    // 5. Crear el token JWT
    const token = jwt.sign(
      { id: owner._id, rol: owner.rol },  // datos que van dentro del token
      process.env.JWT_SECRET,             // calve secreta del .env
      { expiresIn: process.env.JWT_EXPIRES_IN || "1d"  } // duracion del token
    );

    // 6. Repuesta con token y datos del ususrio
    res.status(200).json({
      mensaje: " Inicio de sesion exitoso",
      token,
      owner: {
        id: owner._id,
        nombre: owner.nombre,
        email: owner.email,
        rol: owner.rol
      }
    });

  } catch (error) {
    res.status(500).json({
      mensaje: " Error al iniciar sesion",
      error: error.message
    });
  }
}

const getOwnerById = async (req, res) => {
  try {
    const owner = await Owner.findById(req.params.id).select("-password");
    if (!owner) {
      return res.status(404).json({
        mensaje: "Propietario no encontrado"
      });
    }
    res.json(owner);
  }
  catch (error) {
    res.status(500).json({
      mensaje: "Error al obtener propietario",
      error: error.message
    });
  };
}

const updateOwner = async (req, res) => {
  try {
    const { rol, nombre, documentoId, celular, email } = req.body;

    const updatedOwner = await Owner.findByIdAndUpdate(
      req.params.id,
      { rol, nombre, documentoId, celular, email },
      { new: true, runValidators: true, context: "query" }).select("-password");

    if (!updatedOwner) {
      return res.status(404).json({
        mensaje: "Propietario no encontrado"
      });
    }
    res.json({
      mensaje: "Propietario actualizado exitosamente",
      owner: updatedOwner
    });

  }
  catch (error) {
    res.status(500).json({
      mensaje: " Error al actualizar propietario",
      error: error.message
    });
  }
}

const deleteOwner = async (req, res) => {
  try {

    const deletedOwner = await Owner.findByIdAndDelete(req.params.id);
    if (!deletedOwner) {
      return res.status(404).json({
        mensaje: "Porpietario no encontrado"
      });
    }
    res.json({
      mensaje: "Propietario eliminado exitosamente"
    });
  }
  catch (error) {
    res.status(500).json({
      mensaje: "Error al eliminar propietario",
      error: error.message
    });
  }
};

module.exports = { registerOwner, loginOwner, getOwnerById, updateOwner, deleteOwner };

// hacer prueba en postman para la validaciones de login
