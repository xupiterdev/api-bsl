const express = require('express');

// CONTROLLERS
const usersController = require('../controllers/users.controller')

// CONFIG
const router = express.Router();

// ROUTES
// Aqui se ponen las rutas de nuetra api Eje. router.get('/institutes/institute', institute_controller.getInstitutes)
router.post('/users/sing-up', usersController.singUp)
router.post('/users/sing-in', usersController.singIn)
// EXPORT
module.exports = router;