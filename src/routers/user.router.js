import { Router } from 'express';
import UserController from '../controllers/user.controller.js';
import authMiddleware from '../middlewares/auth.middle.js';

const userRouter = Router();
const userController = new UserController();

/**
 * 회원 상세 조회 API
 */
userRouter.get('/', authMiddleware, userController.getUser);

export default userRouter;
