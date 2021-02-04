const express = require('express');

// CONTROLLERS
const catalogsController = require('../controllers/catalogs.controller')

// CONFIG
const router = express.Router();

// ROUTES
// Aqui se ponen las rutas de nuetra api
router.put('/catalogs/addOption', catalogsController.addOptionCatalog)
router.put('/catalogs/updCatalog/:id', catalogsController.updCatalog)
// EXPORT
module.exports = router;