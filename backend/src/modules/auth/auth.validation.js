import Joi from 'joi';

const loginSchema = Joi.object({
  email: Joi.string().email().required().messages({
    'string.email': 'Please provide a valid email address',
    'any.required': 'Email is required'
  }),
  password: Joi.string().min(6).required().messages({
    'string.min': 'Password must be at least 6 characters long',
    'any.required': 'Password is required'
  })
});

const registerSchema = Joi.object({
  name: Joi.string().min(2).max(255).required().messages({
    'string.min': 'Name must be at least 2 characters long',
    'string.max': 'Name cannot exceed 255 characters',
    'any.required': 'Name is required'
  }),
  email: Joi.string().email().required().messages({
    'string.email': 'Please provide a valid email address',
    'any.required': 'Email is required'
  }),
  password: Joi.string().min(6).required().messages({
    'string.min': 'Password must be at least 6 characters long',
    'any.required': 'Password is required'
  }),
  role: Joi.string().valid('admin', 'manager', 'dispatcher', 'safety_officer', 'financial_analyst', 'driver').required().messages({
    'any.only': 'Role must be one of: admin, manager, dispatcher, safety_officer, financial_analyst, driver',
    'any.required': 'Role is required'
  })
});

export default {
  loginSchema,
  registerSchema
};
