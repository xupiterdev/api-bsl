const express = require('express');

// CONTROLLERS
const catalogsController = require('../controllers/catalogs.controller')

// CONFIG
const router = express.Router();

// ROUTES
// Aqui se ponen las rutas de nuetra api
router.get('/catalogs/', catalogsController.find)
router.get('/catalogs/catalog', catalogsController.findById)
// EXPORT
module.exports = router;