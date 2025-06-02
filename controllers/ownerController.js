//ver informacion detallada en proyecto flet-notion

const registerOwner = (req, res) => {

  const { nombre, cedula, celular, marca, modelo, placa } = req.body;

  if (!nombre || !cedula || !celular || !marca || !modelo || !placa) {
    return res.status(400).json({
      mensaje: "Todos los campos son obligatorios."
    });
  }

  return res.status(201).json({
    mensaje: "Propietario registrado exitosamente",
    datos: { nombre, cedula, celular, marca, modelo, placa }
  });
};

module.exports = { registerOwner };
