const AuthService = require('../services/auth');
const { MSG_TYPES } = require('../constant/types');
const { validateLogin, validateResendOTP, validateResetPassword, validatePasswordChange, validateVerifyUser, validateSecondAuth } = require('../request/user');
const { JsonResponse } = require('../lib/apiResponse');
const bcrypt = require('bcrypt');


exports.login = async (req, res, next) => {
    try {
        const { error } = validateLogin(req.body)
        if (error) return JsonResponse(res, 400, error.details[0].message);

        let { user, createOTP, token } = await AuthService.login(req.body)
        let meta = {
            createOTP,
            token
        }
        res.header('x-auth-token', token)

        JsonResponse(res, 200, MSG_TYPES.LOGGED_IN, user, meta)
    } catch (error) {
        console.log({ error })
        JsonResponse(res, error.statusCode, error.msg)
        next(error)
    }
}

exports.secondLevelAuthentication = async (req, res, next) => {
    try {
        const { error } = validateSecondAuth(req.body)
        if (error) return JsonResponse(res, 400, error.details[0].message);

        let { currentUser, token } = await AuthService.secondLevelAuthentication(req.body, req.user)
        res.header('x-auth-token', token)

        JsonResponse(res, 200, MSG_TYPES.LOGGED_IN, currentUser, token)
    } catch (error) {
        console.log({ error })
        JsonResponse(res, error.statusCode, error.msg)
        next(error)
    }
}


exports.resendOTP = async (req, res, next) => {
    try {
        const { error } = validateResendOTP(req.body);
        if (error) return JsonResponse(res, 400, error.details[0].message);

        const { user, otp } = await AuthService.resendOTP(req.body.email, req)
        JsonResponse(res, 200, MSG_TYPES.UPDATED, user, otp)
    } catch (error) {
        console.log({ error })
        JsonResponse(res, error.statusCode, error.msg)
        next(error)
    }
}

exports.passwordChange = async (req, res, next) => {
    try {
        const { error } = validatePasswordChange(req.body);
        if (error) return JsonResponse(res, 400, error.details[0].message);

        const { user } = await AuthService.updatePassword(req.user, req.body);
        JsonResponse(res, 200, MSG_TYPES.UPDATED, user);
    } catch (error) {
        console.log({ error })
        JsonResponse(res, error.statusCode, error.msg)
        next(error)
    }
}

exports.recover = async (req, res, next) => {
    try {
        const { error } = validateResendOTP(req.body);
        if (error) return JsonResponse(res, 400, error.details[0].message);

        const { user, passwordRetrive } = await AuthService.recover(req.body);

        JsonResponse(res, 200, MSG_TYPES.SENT, user, passwordRetrive)
    } catch (error) {
        JsonResponse(res, error.statusCode, error.msg)
        next(error)
    }
}

exports.reset = async (req, res, next) => {
    try {
        const token = req.params.token
        const email = req.params.email

        const msg = await AuthService.reset(email, token);

        JsonResponse(res, 200, msg);
        res.redirect('http://localhost:3000/forgot-password/' + email + "/" + token);
    } catch (error) {
        JsonResponse(res, error.statusCode, error.msg)
        next(error)
    }
}

exports.resetPassword = async (req, res, next) => {
    try {
        const { error } = validateResetPassword(req.body)
        if (error) return JsonResponse(res, 400, error.details[0].message)

        const salt = await bcrypt.genSalt(10);
        req.body.password = await bcrypt.hash(req.body.password, salt);

        const user = await AuthService.resetPassword(req.body)

        JsonResponse(res, 200, MSG_TYPES.UPDATED, user)
    } catch (error) {
        console.log({ error })
        JsonResponse(res, error.statusCode, error.msg)
        next(error)
    }
}

exports.verify = async (req, res, next) => {
    try {
        const { error } = validateVerifyUser(req.body)
        if (error) return JsonResponse(res, 400, error.details[0].message)

        const user = await AuthService.verify(req.body)

        JsonResponse(res, 200, MSG_TYPES.ACCOUNT_VERIFIED, user)
    } catch (error) {
        console.log({ error })
        JsonResponse(res, error.statusCode, error.msg)
        next(error)
    }
}