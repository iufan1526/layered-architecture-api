import { prisma } from '../utils/prisma/index.js';

export class AuthRepository {
    findUsers = async email => {
        const findUsers = await prisma.Users.findMany({
            where: {
                email,
            },
        });

        return findUsers;
    };
    createUser = async (email, password, name) => {
        const createdUser = await prisma.Users.create({
            data: { email, password, name },
        });

        return createdUser;
    };
}
