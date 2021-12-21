const Joi = require('joi');


function validateQuestion(body){
    const questionSchema = Joi.object({
        question: Joi.string().required()
    })

    return questionSchema.validate(body)
}

module.exports = {
    validateQuestion
}