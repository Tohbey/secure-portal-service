const router = require("express").Router();
const controllers = require("../controllers");
const { Auth } = require('../middlewares/auth')

router.post("/login", controllers.auth.login)

router.patch("/resendOtp", controllers.auth.resendLink)

router.patch("/change-password", Auth, controllers.auth.passwordChange)

router.post('/recover', controllers.auth.recover);

router.get('/forgot/:email/:token', controllers.auth.reset);

router.post('/reset-password', controllers.auth.resetPassword);

router.patch('/verify', controllers.auth.verify); //working

module.exports = router