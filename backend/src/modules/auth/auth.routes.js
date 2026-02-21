import { Router } from 'express';
import authController from './auth.controller.js';
import authMiddleware from '../../middlewares/auth.middleware.js';

const { authenticate, authorize } = authMiddleware;

const router = Router();

router.post('/login', authController.login);
router.post('/register', authenticate, authorize(['admin']), authController.register);

export default router;
