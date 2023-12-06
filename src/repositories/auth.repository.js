import { prisma } from '../utils/prisma/index.js';

export class AuthRepository {
    /**
     * 유저 정보 찾기
     */
    findUsers = async email => {
        const findUsers = await prisma.Users.findMany({
            where: {
                email,
            },
        });

        return findUsers;
    };

    /**
     * 유저 생성
     */
    createUser = async (email, password, name) => {
        const createdUser = await prisma.Users.create({
            data: { email, password, name },
        });

        return createdUser;
    };
}
