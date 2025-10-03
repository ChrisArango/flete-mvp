const express = require('express');
const router = express.Router();
const userAdminController = require("../controllers/userAdminController");

router.post("/register", userAdminController.registerUserAdmin);

module.exports = router;
