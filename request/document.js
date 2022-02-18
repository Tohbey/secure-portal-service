const Joi = require('joi');


function validateDocument(body){
    const documentSchema = Joi.object({
        name: Joi.string().required(),
        owner: Joi.string().required(),
        description: Joi.string().required(),
    })

    return documentSchema.validate(body)
}


module.exports ={
    validateDocument
}