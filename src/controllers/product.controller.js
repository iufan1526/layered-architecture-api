import ProductService from '../services/product.service.js';

export default class ProductController {
    prductService = new ProductService();

    /**
     * 상품 등록 API
     */
    createProduct = async (req, res) => {
        const { name, description, state } = req.body;

        const createdResult = await this.prductService.createProduct(name, description, state, req.user);

        if (createdResult.success) {
            res.status(201).json(createdResult);
        } else {
            res.status(400).json(createdResult);
        }
    };

    /**
     * 상품 수정 API
     */
    updateProduct = async (req, res) => {
        const { productId } = req.params;
        const { name, description, state } = req.body;

        const updatedProduct = await this.prductService.updateProduct(productId, name, description, state, req.user);

        if (updatedProduct.success) {
            res.status(200).json(updatedProduct);
        } else {
            res.status(400).json(updatedProduct);
        }
    };

    /**
     * 상품 삭제 API
     */
    deleteProduct = async (req, res) => {
        const { productId } = req.params;

        const deletedProduct = await this.prductService.deleteProduct(productId, req.user);

        if (deletedProduct.success) {
            res.status(200).json(deletedProduct);
        } else {
            res.status(400).json(deletedProduct);
        }
    };

    /**
     * 상품 목록 조회 API
     */
    getProducts = async (req, res) => {
        const getProducts = await this.prductService.getProducts();

        res.status(200).json(getProducts);
    };

    /**
     * 상품 상세 조회 API
     */
    getProduct = async (req, res) => {
        const { productId } = req.params;

        const getProduct = await this.prductService.getProduct(productId);

        if (getProduct.success) {
            res.status(200).json(getProduct);
        } else {
            res.status(400).json(getProduct);
        }
    };
}
