const router = require('express').Router();
const controller = require("../controllers");
const { Auth } = require('../middlewares/auth')

router.get('/', Auth, controller.user.getUsers)

router.get('/:userUUID', Auth, controller.user.getUser)

router.post('/', controller.user.create)

router.patch('/terminate/:userUUID', Auth, controller.user.terminateUser)


module.exports = router;
