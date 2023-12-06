import { prisma } from '../utils/prisma/index.js';

export default class UserService {
    /**
     * 회원 상세 조회
     */
    getUser = async userId => {
        return await prisma.Users.findFirst({
            select: {
                userId: true,
                name: true,
                email: true,
                createdAt: true,
            },
            where: {
                userId,
            },
        });
    };
}
