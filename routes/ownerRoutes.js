const express = require('express');
const router = express.Router();
const ownerController = require('../controllers/ownerController');

// Registro de Propietario
router.post('/register', ownerController.registerOwner);

// Obtener informacion del propietario
router.get('/:id', ownerController.getOwnerById);

// Actualizar infro propietario
router.put('/:id', ownerController.updateOwner);

// Eliminar propietario
router.delete('/:id', ownerController.deleteOwner);

module.exports = router;
