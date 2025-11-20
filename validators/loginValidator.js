const validator = require("express-validator");

const loginOwnerValidator = [
  validator.body("email")
    .trim()
    .notEmpty().withMessage("El email es obligatorio.")
    .isEmail().withMessage("Debe proporsionar un email valido."),

  validator.body("password")
    .trim()
    .notEmpty().withMessage("La contraseña es obligatoria.")
    .isLength({ min: 6 }).withMessage("La contraseña debe tener al mesno 6 caracteres.")
];

module.exports = { loginOwnerValidator };
