const validator = require("express-validator");

const handleValidator = async (req, res, next) => {
  try {
    const errors = validator.validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();

  } catch (error) {
    res.status(500).json({ error: "Error en validacion de datos" });
  }
};

module.exports = handleValidator;
