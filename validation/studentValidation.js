import Joi from "joi";

 export const studentValidation = Joi.object().keys({
    name : Joi.string().trim()
    .min(3).message('Name must be atleast 3 letters.')
    .max(30).message('Name must not exceed 30 letters.')
    .required()
    .regex(/^[A-Za-z]+ [A-Za-z]+ ?[A-Za-z]*$/)
    .message('Name must consist of only alphabets'),

    email: Joi.string().trim()
    .trim().regex(/^.+@.+\..{2,3}$/)
    .message('Please provide a valid email!'),

    phoneNumber: Joi.string().trim()
    .regex(/^0[7-9][10][0-9]{8}$/)
    .message('Please provide a valid phone number!'),

    gender: Joi.string().trim()
    .lowercase()
    .regex(/^(male|female)$/).message('Gender must be male or female'),

    password: Joi.string().trim()
    .min(8).message('Password must be up to 8 characters long')
    .max(16).message('Password must not be more than 16 characters long'),

    confirmPassword: Joi.ref('password')


});


export const options ={
    abortEarly: false,
    errors: {
        wrap: {
            lebel: "",
        }
    }
}