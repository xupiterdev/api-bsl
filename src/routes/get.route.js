const express = require('express');

// CONTROLLERS
const catalogsController = require('../controllers/catalogs.controller')

// CONFIG
const router = express.Router();

// ROUTES
// Aqui se ponen las rutas de nuetra api
router.get('/catalogs/', catalogsController.findCatalog)
router.get('/catalogs/catalog/:id', catalogsController.findCatalogById)
// EXPORT
module.exports = router;