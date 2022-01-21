const Joi = require('joi');
const passwordComplexity = require("joi-password-complexity");

const complexityOption = {
    min:6,
    max:20,
    lowerCase:1,
    upperCase: 1,
    numeric: 1,
    symbol: 1,
    requirementCount: 2,
}

function validateUser(body){
    const questionSchema = Joi.object({
        surname: Joi.string().required(),
        othernames: Joi.string().required(),
        password: passwordComplexity(complexityOption).required(),
        email: Joi.string().required(),
        questionId: Joi.number().required(),
        secretAnswer: Joi.string().required(),
        role: Joi.string().valid('admin','user').optional(),
    })

    return questionSchema.validate(body)
}

function validateResendOTP(body){
    const schema = Joi.object({
        email: Joi.string().max(50).required(),
    })

    return schema.validate(body)
}

function validateLogin(user){
    const schema = Joi.object({
        email: Joi.string().required(),
        password: passwordComplexity(complexityOption).required()
    })

    return schema.validate(user)
}

function validatePasswordChange(body){
    const schema = Joi.object({
        oldPassword: Joi.string().required(),
        newPassword: passwordComplexity(complexityOption).required(),
    })

    return schema.validate(body)
}


function validateResetPassword(body){
    const schema = Joi.object({
        email: Joi.string().required(),
        token: Joi.string().required(),
        password: passwordComplexity(complexityOption).required(),
    })

    return schema.validate(body)
}


function validateVerifyUser(body){
    const schema = Joi.object({
        email: Joi.string().required(),
        OTPCode: Joi.string().min(4).max(4).required(),
    })

    return schema.validate(body)
}

function validateSecondAuth(body){
    const schema = Joi.object({
        OTPCode: Joi.string().min(0).max(4).required(),
        secretAnswer: Joi.string().required()
    })

    return schema.validate(body)
}



module.exports = {
    validateUser,
    validateResendOTP,
    validateLogin,
    validatePasswordChange,
    validateResetPassword,
    validateVerifyUser,
    validateSecondAuth
}