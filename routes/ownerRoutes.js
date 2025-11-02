const express = require('express');
const router = express.Router();
const ownerController = require('../controllers/ownerController');
const ownerValidator = require('../validators/ownerValidator');
const handleValidator = require('../middlewares/handleValidator');

// Registro de Propietario (con validacion)
router.post('/register',
  ownerValidator.validatorRegisterOwner, // validaviones
  handleValidator,                       // manejo de error
  ownerController.registerOwner          // controlador final
);

// Obtener informacion del propietario
router.get('/:id', ownerController.getOwnerById);

// Actualizar infro propietario
router.put('/:id', ownerController.updateOwner);

// Eliminar propietario
router.delete('/:id', ownerController.deleteOwner);

module.exports = router;
