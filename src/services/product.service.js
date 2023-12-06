import ProductRepository from '../repositories/product.repository.js';
import ErrorResult from '../utils/error/error.js';
import SuccessResult from '../utils/success/success.js';

export default class ProductService {
    productRepository = new ProductRepository();

    createProduct = async (name, description, state, userId) => {
        if (!name || !description || !state || !userId) {
            return {
                success: false,
                message: '필수 입력값이 입력되지 않았습니다.',
            };
        }

        const createdProduct = await this.productRepository.createProduct(name, description, state, userId);

        return SuccessResult.success(createdProduct, '상품등록이 완료되었습니다.');
    };

    updateProduct = async (productId, name, description, state, userId) => {
        if (!productId && !name && !description && !state) {
            return {
                success: false,
                message: '필수 입력값이 입력되지 않았습니다.',
            };
        }

        const findProduct = await this.productRepository.findProduct(productId, userId);

        if (!findProduct) {
            return ErrorResult.errorEmptyProduct();
        }

        const updatedResult = await this.productRepository.updateProduct(productId, name, description, state, userId);

        return SuccessResult.success(updatedResult, '상품 수정이 완료되었습니다.');
    };

    deleteProduct = async (productId, userId) => {
        const findProduct = await this.productRepository.findProduct(productId, userId);

        if (!findProduct) {
            return ErrorResult.errorEmptyProduct();
        }

        let deletedResult;
        try {
            deletedResult = await this.productRepository.deleteProduct(productId, userId);
        } catch (err) {
            return {
                success: false,
                message: '일치하는 상품정보가 없거나 등록한 회원만 삭제가 가능합니다.',
            };
        }

        return SuccessResult.success(deletedResult, '상품 삭제가 성공하였습니다.');
    };

    getProducts = async () => {
        const getProducts = await this.productRepository.getProducts();

        return SuccessResult.success(getProducts, '상품 목록조희가 성공했습니다.');
    };

    getProduct = async productId => {
        const getProduct = await this.productRepository.getProduct(productId);

        if (getProduct) {
            return SuccessResult.success(getProduct, '상품 조회가 완료되었습니다.');
        } else {
            return {
                success: false,
                message: '일치하는 상품정보가 없습니다.',
            };
        }
    };
}
