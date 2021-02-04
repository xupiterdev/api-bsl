const express = require('express');

// CONTROLLERS
const catalogsController = require('../controllers/catalogs.controller')
const modulesController = require('../controllers/modules.controller')

// CONFIG
const router = express.Router();
const middleware = require('../utils/middlewares.util')

// ROUTES
// Aqui se ponen las rutas de nuetra api
router.get('/catalogs', middleware.validateToken, catalogsController.find)
router.get('/catalogs/catalog', middleware.validateToken, catalogsController.findById)

router.get('/modules/module', middleware.validateToken, modulesController.find)
// EXPORT
module.exports = router;