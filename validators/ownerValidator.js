const validator = require("express-validator");

// validaciones antes del registro de owner.
const validatorRegisterOwner = [

  validator.body("rol")
    .custom((value) => {
      if (value && value === "admin") {
        throw new Error("No puedes asignarte el rol de admin");
      }
      return true;
    }),

  validator.body("nombre")
    .trim()
    .notEmpty().withMessage("El nombre es obligatorio")
    .isString().withMessage("El nombre debe ser texto")
    .isLength({ min: 3 }).withMessage("El nombre debe tener al menos 3 caracteres"),

  validator.body("documentoId")
    .notEmpty().withMessage("El documento es obligatorio")
    .isNumeric().withMessage("El documento debe ser numero"),

  validator.body("celular")
    .notEmpty().withMessage("El celular es obligatorio")
    .isNumeric().withMessage("El celular debe tener un numero valido"),

  validator.body("email")
    .trim()
    .notEmpty().withMessage("El email es obligatorio")
    .isEmail().withMessage("Formato de correo invalido"),

  validator.body("password")
    .notEmpty().withMessage("La contraseña  es obligatorio")
    .isLength({ min: 6 }).withMessage("La contraseña debe tener al menos 6 caracteres"),

]

module.exports = { validatorRegisterOwner };




