// src/routes/itemRoutes.js
const express = require('express');
const router = express.Router();
const itemController = require('../controllers/itemController');
const auth = require('../middlewares/authMiddleware');

// RUTAS
router.get('/', itemController.getAll); 

router.get('/', itemController.getItems);

// Ruta protegida
router.post('/', auth, itemController.create); 

// En itemRoutes.js
router.put('/:id', auth, itemController.update);

// Debe decir .delete (que es el nombre de la función en el controlador)
router.delete('/:id', auth, itemController.delete);

module.exports = router;