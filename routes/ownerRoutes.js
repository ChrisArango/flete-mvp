const express = require('express');
const router = express.Router();
const ownerController = require('../controllers/ownerController');
const ownerValidator = require('../validators/ownerValidator');
const loginOwnerValidator = require('../validators/loginValidator');
const handleValidator = require('../middlewares/handleValidator');
const authMiddleware = require('../middlewares/authMiddleware');

// Registro de Propietario (con validacion)
router.post('/register',
  ownerValidator.validatorRegisterOwner, // validaviones
  handleValidator,                       // manejo de error
  ownerController.registerOwner          // controlador final
);

// Login del propietario
router.post('/login',
  loginOwnerValidator.loginOwnerValidator, // validaciones dde datos
  handleValidator,                         // manejo de errores
  ownerController.loginOwner               // controlador de login
)

// Obtener informacion del propietario
router.get('/:id',
  authMiddleware,
  ownerController.getOwnerById);

// Actualizar infro propietario
router.put('/:id',
  authMiddleware,
  ownerController.updateOwner);

// Eliminar propietario
router.delete('/:id',
  authMiddleware,
  ownerController.deleteOwner);

module.exports = router;


// ya protegi rutas de owner, trip y vehicle flyta hacer pruebas y luego seguir en e proyecto , podria hrefinar lo de admin  ( hacer pruebas)
