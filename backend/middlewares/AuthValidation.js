const Joi = require("joi");

const signupSchema = Joi.object().keys({
  name: Joi.string()
    .trim()
    .min(1) // Minimum length for name
    .max(100) // Maximum length for name
    .required(),
  email: Joi.string()
    .email({ tlds: { allow: false } })
    .required(),
  password: Joi.string()
    .min(8) // Minimum length for password
    .max(20) // Maximum length for password
    .required(),
});

const loginSchema = Joi.object().keys({
  email: Joi.string()
    .email({ tlds: { allow: false } })
    .required(),
  password: Joi.string()
    .min(8) // Minimum length for password
    .max(20) // Maximum length for password
    .required(),
});

const validateSignup = async (req, res, next) => {
  const { error } = signupSchema.validate(req.body, { abortEarly: false });
  if (error) {
    return res.status(400).json({
      success: false,
      message: "Invalid request data",
      error: error.details,
    });
  }
  next();
};

const validateLogin = async (req, res, next) => {
  const { error } = loginSchema.validate(req.body, { abortEarly: false });
  if (error) {
    return res.status(400).json({
      success: false,
      message: "Invalid request data",
      error: error.details,
    });
  }
  next();
};

module.exports = { validateSignup, validateLogin };
