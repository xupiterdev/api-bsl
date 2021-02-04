const express = require('express');

// CONTROLLERS
const usersController = require('../controllers/users.controller')
const catalogsController = require('../controllers/catalogs.controller')
const modulesController = require('../controllers/modules.controller')
const actionsController = require('../controllers/actions.controller')

// CONFIG
const router = express.Router();

// ROUTES
// Aqui se ponen las rutas de nuetra api Eje. router.get('/institutes/institute', institute_controller.getInstitutes)
router.post('/users/sign-up', usersController.signUp)
router.post('/users/sign-in', usersController.signIn)

router.post('/catalogs/add', catalogsController.add)

router.post('/modules/add', modulesController.addModule)

router.post('/actions/add', actionsController.addAction)
// EXPORT
module.exports = router;