const express = require('express');

// CONTROLLERS
const catalogsController = require('../controllers/catalogs.controller')
const modulesController = require('../controllers/modules.controller')
const historicalsController = require('../controllers/historicals.controller')

// CONFIG
const router = express.Router();
const middleware = require('../utils/middlewares.util')

// ROUTES
router.get('/catalogs/catalog', middleware.validateToken, catalogsController.find)

router.get('/modules/module', middleware.validateToken, modulesController.find)

router.get('/historicals/historical', middleware.validateToken, historicalsController.find)

// EXPORT
module.exports = router;