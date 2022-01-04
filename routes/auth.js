const router = require("express").Router();
const controllers = require("../controllers");
const { Auth } = require('../middlewares/auth')

router.post("/", controllers.auth.login)

router.patch("/resendOtp", controllers.auth.resendLink)

router.patch("/change-password", Auth, controllers.auth.passwordChange)

router.post('/recover', controllers.auth.recover);

router.get('/forgot/:email/:token', controllers.auth.reset);

router.post('/reset-password', controllers.auth.resetPassword)

module.exports = router