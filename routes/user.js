const router = require('express').Router();
const controllers = require("../controllers");
const { Auth } = require('../middlewares/auth')

router.get('/', Auth, controllers.user.getUsers) //working

router.get('/me', Auth, controllers.user.getCurrentUser) //working

router.get('/:userUUID', Auth, controllers.user.getUser) //working

router.patch('/:userUUID', Auth, controllers.user.updateUser)

router.post('/', controllers.user.create) //working

router.patch('/terminate', Auth, controllers.user.terminateUser)

module.exports = router