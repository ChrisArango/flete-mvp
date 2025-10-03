const Owner = require("../models/ownerModel");
const bcrypt = require("bcrypt");

const registerOwner = async (req, res) => {
  try {

    // 1. Extraemos los datos que vienen en la petición (req.body)
    const { tipo, nombre, documentoId, celular, email, password } = req.body

    // 2. Validamos que los campos obligatorios estén presentes
    if (!tipo || !nombre || !documentoId || !email || !celular || !password) {
      return res.status(400).json({
        mensaje: "Todos los campos son obligatorios."
      });
    }

    // 3. Verificamos si ya existe un usuario con ese email
    const existingOwner = await Owner.findOne({ $or: [{ email }, { documentoId }] });
    if (existingOwner) {
      return res.status(400).json({
        mensaje: "Ya existe un propietario con este email o documento"
      });
    }

    // 4. Encriptamos la contraseña antes de guardarla
    const hashedPassword = await bcrypt.hash(password, 10);

    // 5. Creamos un nuevo Owner
    const newOwner = new Owner({
      tipo,
      nombre,
      documentoId,
      celular,
      email,
      password: hashedPassword
    });

    // 6. Guardamos en base de datos y Respondemos al cliente con exito
    await newOwner.save();
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
    const { tipo, nombre, documentoId, celular, email } = req.body;

    const updatedOwner = await Owner.findByIdAndUpdate(
      req.params.id,
      { tipo, nombre, documentoId, celular, email },
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

module.exports = { registerOwner, getOwnerById, updateOwner, deleteOwner };
