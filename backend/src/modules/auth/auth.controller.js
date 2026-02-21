import authService from './auth.service.js';
import validationSchemas from './auth.validation.js';

const { loginSchema, registerSchema } = validationSchemas;
import asyncHandler from '../../utils/asyncHandler.js';

class AuthController {
  login = asyncHandler(async (req, res) => {
    const { error } = loginSchema.validate(req.body);
    if (error) {
      return res.status(400).json({
        success: false,
        message: 'Validation error',
        errors: error.details.map(detail => detail.message)
      });
    }

    const { email, password } = req.body;
    const result = await authService.login(email, password);

    res.status(200).json({
      success: true,
      message: 'Login successful',
      data: result
    });
  });

  register = asyncHandler(async (req, res) => {
    const { error } = registerSchema.validate(req.body);
    if (error) {
      return res.status(400).json({
        success: false,
        message: 'Validation error',
        errors: error.details.map(detail => detail.message)
      });
    }

    const user = await authService.register(req.body);

    res.status(201).json({
      success: true,
      message: 'User registered successfully',
      data: user
    });
  });
}

export default new AuthController();
