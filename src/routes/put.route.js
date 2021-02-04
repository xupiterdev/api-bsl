const express = require('express');

// CONTROLLERS
const catalogsController = require('../controllers/catalogs.controller')

// CONFIG
const router = express.Router();

// ROUTES
// Aqui se ponen las rutas de nuetra api
router.put('/catalogs/addOption', catalogsController.addOption)
router.put('/catalogs/typeof', catalogsController.updTypeof)
router.put('/catalogs/option', catalogsController.updOption)
// EXPORT
module.exports = router;