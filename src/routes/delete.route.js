const express = require('express');

// CONTROLLERS
const catalogsController = require('../controllers/catalogs.controller')

// CONFIG
const router = express.Router()
const middleware = require('../utils/middlewares.util')

// ROUTES
router.delete('/catalogs/catalog', middleware.validateToken, catalogsController.delete)
router.delete('/catalogs/option', middleware.validateToken, catalogsController.deleteOption)

// EXPORT
module.exports = router;