import { where } from 'sequelize';
import { prisma } from '../utils/prisma/index.js';

export default class ProductRepository {
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

    findProduct = async (productId, userId) => {
        return prisma.Products.findFirst({
            where: {
                productId: +productId,
                userId: +userId,
            },
        });
    };

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

    deleteProduct = async (productId, userId) => {
        return prisma.Products.delete({
            where: {
                productId: +productId,
                userId: +userId,
            },
        });
    };

    getProducts = async () => {
        return prisma.Products.findMany();
    };

    getProduct = async productId => {
        return prisma.Products.findFirst({
            where: {
                productId: +productId,
            },
        });
    };
}
