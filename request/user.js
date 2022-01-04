const Joi = require('joi');


function validateUser(body){
    const questionSchema = Joi.object({
        surname: Joi.string().required(),
        othernames: Joi.string().required(),
        password: Joi.string().required(),
        email: Joi.string().required()
    })

    return questionSchema.validate(body)
}

function validateResendLink(body){
    const schema = Joi.object({
        email: Joi.string().max(50).required(),
    })

    return schema.validate(body)
}

function validateLogin(user){
    const schema = Joi.object({
        email: Joi.string().required(),
        password: passwordComplexity(complexityOption).required(),
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

module.exports = {
    validateUser,
    validateResendLink,
    validateLogin,
    validatePasswordChange,
    validateResetPassword
}