const Joi = require('joi');


function validateSharedDocument(body){
    const questionSchema = Joi.object({
        document: Joi.number().required(),
        permission: Joi.number().required(),
        user: Joi.number().required(),
    })

    return questionSchema.validate(body)
}

module.exports = {
    validateSharedDocument
}