const Joi = require('joi');


function validatePermission(body){
    const permissionSchema = Joi.object({
        permission: Joi.string().required(),
        description: Joi.string().required(),
    })

    return permissionSchema.validate(body)
}


module.exports ={
    validatePermission
}