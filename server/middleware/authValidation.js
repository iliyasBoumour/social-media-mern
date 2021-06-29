const { checkSchema, validationResult } = require('express-validator');
//import Model
const User = require('../models/User');

//registration schema
const registerSchema = {
    username: {
        notEmpty: {
            errorMessage : "username field canot be empty"
        }    
    },
    email: {
        custom: {
            options: value => {
                return User.findOne({email: value})
                           .then(user => {
                               if(user) return Promise.reject('this email is already exist') 
                           })  
            }
        },
        isEmail: {
            errorMessage: "invalid email",
        },
        notEmpty: {
            errorMessage: "email cannot be empty"
        }
       
       
    },
    password: {
        isLength: {
            errorMessage: "Passowrd must be greater than 6 characters",
            options: {min: 6},
        },
        notEmpty: {
            errorMessage: "password field canot be empty"
        }
        
    },
    confirmPassword: {
        custom: {
            options: (value, {req}) => {
                if(value !== req.body.password ) 
                    throw new Error('Password confirmation does not match password');
                
                return true;
            }
        },
        notEmpty: {
            errorMessage: "field cannot be empty"
        }
        
    }
};

//login schema
const loginSchema = {
    email: {
        isEmail: true,
        errorMessage: 'invalid email'
    },
    password: {
        notEmpty: true,
        errorMessage: "password field canot be empty"
    }

};

//custom errors messages
const customErrors = errors => {
    const myErrors = {};
    errors.map((error) => {
       
        myErrors[error.param] = {msg: error.msg};
    });

    return myErrors;
};


//validation Middeleware
const validate = validations => {
    return async (req, res, next) => {
        await Promise.all(validations.map(validation => validation.run(req)));

        const errors = validationResult(req);
        if (errors.isEmpty()) {
            return next();
        }

        res.status(400).json({
            errors: customErrors(errors.errors)
        });
    };
};
exports.loginValidation = validate(checkSchema(loginSchema));
exports.registerValidation = validate(checkSchema(registerSchema));