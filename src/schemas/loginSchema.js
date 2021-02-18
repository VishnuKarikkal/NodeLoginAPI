const joi=require('joi');  //for validations - incase of absent frontend validations

    //the validation rules
  module.exports = loginSchema = joi.object(
        {
       name:joi.string().required().min(6),
       password:joi.string().required().min(8),
       email:joi.string().email().required()
        }
                       );

