//working
const router = require("express").Router();
const controllers = require("../controllers");
const { Auth } = require('../middlewares/auth')

router.post("/login", controllers.auth.login); 

router.post("/second-auth", Auth ,controllers.auth.secondLevelAuthentication); 

router.patch("/resendOtp", controllers.auth.resendOTP); 

router.patch("/change-password", Auth, controllers.auth.passwordChange); 

router.post('/recover', controllers.auth.recover); 

router.get('/forgot/:email/:token', controllers.auth.reset); 

router.post('/reset-password', controllers.auth.resetPassword);

router.patch('/verify', controllers.auth.verify); 

module.exports = router