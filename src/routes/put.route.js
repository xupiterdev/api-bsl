const express = require('express');

// CONTROLLERS
const catalogsController = require('../controllers/catalogs.controller')

// CONFIG
const router = express.Router();
const middleware = require('../utils/middlewares.util')

// ROUTES
// Aqui se ponen las rutas de nuetra api
router.put('/catalogs/addOption', middleware.validateToken, catalogsController.addOption)
router.put('/catalogs/typeof', middleware.validateToken, catalogsController.updTypeof)
router.put('/catalogs/option', middleware.validateToken, catalogsController.updOption)
// EXPORT
module.exports = router;