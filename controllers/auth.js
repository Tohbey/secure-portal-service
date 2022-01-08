const AuthService = require('../services/auth');
const { MSG_TYPES } = require('../constant/types');
const { validateLogin, validateResendLink, validateResetPassword, validatePasswordChange, validateVerifyUser, validateSecondAuth } = require('../request/user');
const { JsonResponse } = require('../lib/apiResponse');
const bcrypt = require('bcrypt');


exports.login = async (req, res, next) => {
    try {
        const { error } = validateLogin(req.body)
        if (error) return JsonResponse(res, 400, error.details[0].message);

        let { user, createOTP, token } = await AuthService.login(req.body)
        res.header('x-auth-token', token)

        JsonResponse(res, 200, MSG_TYPES.LOGGED_IN, user, createOTP)
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

        let { user, token } = await AuthService.secondLevelAuthentication(req.body, req.user)
        res.header('x-auth-token', token)

        JsonResponse(res, 200, MSG_TYPES.LOGGED_IN, user, createOTP)
    } catch (error) {
        console.log({ error })
        JsonResponse(res, error.statusCode, error.msg)
        next(error)
    }
}


exports.resendLink = async (req, res, next) => {
    try {
        const { error } = validateResendLink(req.body);
        if (error) return JsonResponse(res, 400, error.details[0].message);

        const { user, otp } = await AuthService.resendLink(req.body.email, req)
        JsonResponse(res, 200, MSG_TYPES.UPDATED, user, otp)
    } catch (error) {
        JsonResponse(res, error.statusCode, error.msg)
        next(error)
    }
}

exports.passwordChange = async (req, res, next) => {
    try {
        const { error } = validatePasswordChange(req.body);
        if (error) return JsonResponse(res, 400, error.details[0].message);

        const { user } = await AuthService.updatedPassword(req.user, req.body);
        JsonResponse(res, 200, MSG_TYPES.UPDATED, user);
    } catch (error) {
        JsonResponse(res, error.statusCode, error.msg)
        next(error)
    }
}

exports.recover = async (req, res, next) => {
    try {
        const user = await AuthService.recover(req.body, req);

        return JsonResponse(res, 200, MSG_TYPES.SENT, user)
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

        res.redirect('http://localhost:4200/forgot-password/' + token + "/" + email);
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