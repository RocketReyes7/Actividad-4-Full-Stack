const express = require('express');
const router = express.Router();
const authController = require('../controllers/authControllers');

router.post('/register', authController.register); // Para crear tu usuario
router.post('/login', authController.login);       // Para obtener el token

module.exports = router;