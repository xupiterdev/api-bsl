const express = require('express');

// CONTROLLERS
const catalogsController = require('../controllers/catalogs.controller')

// CONFIG
const router = express.Router();
const middleware = require('../utils/middlewares.util')

// ROUTES
// Aqui se ponen las rutas de nuetra api
router.get('/catalogs/', middleware.validateToken, catalogsController.find)
router.get('/catalogs/catalog', middleware.validateToken, catalogsController.findById)
// EXPORT
module.exports = router;