const Joi = require('joi');


function validateDocument(body){
    const questionSchema = Joi.object({
        name: Joi.string().required(),
        owner: Joi.string().required(),
        description: Joi.string().required(),
    })

    return questionSchema.validate(body)
}


module.exports ={
    validateDocument
}