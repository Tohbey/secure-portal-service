const router = require('express').Router();
const controllers = require("../controllers");
const { Auth } = require('../middlewares/auth')

router.get('/', controllers.user.getUsers) //working

router.get('/:userUUID', controllers.user.getUser) //working

router.patch('/:userUUID', controllers.user.updateUser)

router.post('/', controllers.user.create) //working

router.patch('/terminate/:userUUID', Auth, controllers.user.terminateUser)

module.exports = router
