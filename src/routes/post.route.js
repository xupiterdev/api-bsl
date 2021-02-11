const express = require('express');

// CONTROLLERS
const usersController = require('../controllers/users.controller')
const catalogsController = require('../controllers/catalogs.controller')
const modulesController = require('../controllers/modules.controller')
const actionsController = require('../controllers/actions.controller')
const permissionsController = require('../controllers/permissions.controller')

// CONFIG
const router = express.Router();
const middleware = require('../utils/middlewares.util')

// ROUTES
router.post('/users/sign-up', usersController.signUp)
router.post('/users/sign-in', usersController.signIn)

router.post('/catalogs/catalog', middleware.validateToken, catalogsController.add)
router.post('/catalogs/option', middleware.validateToken, catalogsController.addOption)

router.post('/modules/module', middleware.validateToken, modulesController.add)
router.post('/modules/action', middleware.validateToken, modulesController.addAction)

router.post('/actions/action', middleware.validateToken, actionsController.add)

router.post('/permissions/permission', middleware.validateToken, permissionsController.add)

// EXPORT
module.exports = router;