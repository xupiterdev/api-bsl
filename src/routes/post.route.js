const express = require('express');

// CONTROLLERS
const usersController = require('../controllers/users.controller')
const catalogsController = require('../controllers/catalogs.controller')
const modulesController = require('../controllers/modules.controller')
const actionsController = require('../controllers/actions.controller')
const permissionsController = require('../controllers/permissions.controller')

// CONFIG
const router = express.Router();

// ROUTES
router.post('/users/sign-up', usersController.signUp)
router.post('/users/sign-in', usersController.signIn)

router.post('/catalogs', catalogsController.add)

router.post('/modules', modulesController.add)

router.post('/actions', actionsController.add)

router.post('/permissions', permissionsController.add)
// EXPORT
module.exports = router;