const express = require('express');

// CONTROLLERS
const usersController = require('../controllers/users.controller')
const catalogsController = require('../controllers/catalogs.controller')
const modulesController = require('../controllers/modules.controller')
const actionsController = require('../controllers/actions.controller')
const permissionsController = require('../controllers/permissions.controller')
const historicsController = require('../controllers/historicals.controller')

// CONFIG
const router = express.Router();
const middleware = require('../utils/middlewares.util')

// ROUTES
router.post('/users/sign-up', usersController.signUp)
router.post('/users/sign-in', usersController.signIn)

router.post('/catalogs', catalogsController.add)

router.post('/modules', modulesController.add)

router.post('/actions', middleware.validateToken, actionsController.add)

router.post('/permissions', middleware.validateToken, permissionsController.add)

router.post('/historics', permissionsController.add)
// EXPORT
module.exports = router;