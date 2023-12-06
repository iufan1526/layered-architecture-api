import { where } from 'sequelize';
import { prisma } from '../utils/prisma/index.js';

export default class ProductRepository {
    /**
     * 상품 등록
     */
    createProduct = async (name, description, state, userId) => {
        return prisma.Products.create({
            data: {
                name,
                description,
                state,
                userId,
            },
        });
    };

    /**
     * 상품 검색
     */
    findProduct = async (productId, userId) => {
        return prisma.Products.findFirst({
            where: {
                productId: +productId,
                userId: +userId,
            },
        });
    };

    /**
     * 상품 업데이트
     */
    updateProduct = async (productId, name, description, state, userId) => {
        return prisma.Products.update({
            where: {
                productId: +productId,
                userId: +userId,
            },
            data: {
                name,
                description,
                state,
            },
        });
    };

    /**
     * 상품 삭제
     */
    deleteProduct = async (productId, userId) => {
        return prisma.Products.delete({
            where: {
                productId: +productId,
                userId: +userId,
            },
        });
    };

    /**
     * 상품 목록 조회
     */
    getProducts = async () => {
        return prisma.Products.findMany();
    };

    /**
     * 상품 상세 조회
     */
    getProduct = async productId => {
        return prisma.Products.findFirst({
            where: {
                productId: +productId,
            },
        });
    };
}
