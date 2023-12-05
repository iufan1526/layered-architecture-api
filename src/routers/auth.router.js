import { Router } from 'express';
import { AuthController } from '../controllers/auth.controller.js';

const authRouter = Router();
const authController = new AuthController();

/**
 * 회원가입 API
 */
authRouter.post('/signup', authController.signup);

/**
 * 로그인 API
 */
authRouter.post('/login', authController.login);

export default authRouter;
