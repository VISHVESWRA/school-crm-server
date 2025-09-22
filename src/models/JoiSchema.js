import Joi from "joi";

export const userSchema = Joi.object({
    name: Joi.string()
        .min(3)
        .max(30)
        .required()
        .messages({
            "string.empty": "Name is required",
            "string.min": "Name must be at least 3 characters",
        }),

    email: Joi.string()
        .email()
        // .required()
        .messages({
            "string.empty": "Email is required",
            "string.email": "Email must be valid",
        }),

    password: Joi.string()
        .min(6)
        // .required()
        .messages({
            "string.empty": "Password is required",
            "string.min": "Password must be at least 6 characters",
        }),

    role: Joi.string()
        .valid("student", "teacher", "admin"),
    // .default("student"), 

    age: Joi.number()
        .integer()
        .min(5)
        .max(100)
        .optional()
        .messages({
            "number.base": "Age must be a number",
        }),
});

// export const loginSchema = Joi.object({
//     email: Joi.string().email().required(),
//     password: Joi.string().required(),
// });
