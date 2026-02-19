const jwt = require("jsonwebtoken");

const authMiddleware = (req, res, next) => {

  try {
    // 1. leer el header donde viene el token
    const token = req.headers.authorization?.split(" ")[1];

    // 2. Verificar  si el token existe
    if (!token) {
      return res.status(401).json({
        mensaje: "Acceso denegado. Token no proporcionado"
      });
    }

    // 3. verificar token con clave secreta
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // 4. guardamos el ID del ususario en req.user para usarlo donde queramos
    req.user = decoded.id;

    //5. continuar al siguiente paso -> controllador
    next();

  } catch (error) {
    res.status(401).json({
      mensaje: "Token invalido o expirado",
      error: error.message
    });

  }
};

module.exports = authMiddleware;

