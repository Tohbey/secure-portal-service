const Joi = require('joi');


function validateUser(body){
    const questionSchema = Joi.object({
        surname: Joi.string().required(),
        otheernames: Joi.string().required(),
        password: Joi.string().required(),
        email: Joi.string().required()
    })

    return questionSchema.validate(body)
}

module.exports = {
    validateUser
}