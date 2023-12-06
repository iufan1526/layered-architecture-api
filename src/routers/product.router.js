import { Router } from 'express';
import ProductController from '../controllers/product.controller.js';
import authMiddle from '../middlewares/auth.middle.js';
// import User from '../models/user.js';
// import Product from '../models/product.js';
// import SuccessResult from '../util/success/success.js';
// import ErrorResult from '../util/error/error.js';
// import { where } from 'sequelize';

const productRouter = Router();
const productController = new ProductController();
/**
 * 상품 등록 API
 */
productRouter.post('/product', authMiddle, productController.createProduct);

/**
 * 상품 수정 API
 */
productRouter.patch('/product/:productId', authMiddle, productController.updateProduct);

/**
 * 상품 삭제 API
 */
productRouter.delete('/product/:productId', authMiddle, productController.deleteProduct);

/**
 * 상품 목록 조회 API
 */
productRouter.get('/', productController.getProducts);

/**
 * 상품 상세 조회 API
 */
productRouter.get('/product/:productId', productController.getProduct);

export default productRouter;
