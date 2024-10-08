const Joi = require("joi");

const todoSchema = Joi.object().keys({
  title: Joi.string().required(),
  image: Joi.string().required(),
  description: Joi.string().required(),
  completed: Joi.boolean().required(),
});

const validateTodo = async (req, res, next) => {
  const { error } = todoSchema.validate(req.body);
  if (error) {
    return res.status(400).json({
      message: "Invalid request data",
      success: false,
      error: error.details,
    });
  }
  next();
};

module.exports = validateTodo;
