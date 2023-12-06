import { ValidatePassword } from '../utils/validation/auth.validation.js';
import { AuthRepository } from '../repositories/auth.repository.js';
import SuccessResult from '../utils/success/success.js';
import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import ErrorResult from '../utils/error/error.js';

dotenv.config();

export default class AuthService {
    authRepository = new AuthRepository();

    /**
     * 회원가입 API
     */
    signup = async (email, password, passwordConfirm, name) => {
        if (!ValidatePassword.validatePasswordLength(password)) {
            return ErrorResult.errorPasswordLength();
        }

        if (!ValidatePassword.validateEqualPassword(password, passwordConfirm)) {
            return ErrorResult.errorNotEqualPassword();
        }

        const findUsers = await this.authRepository.findUsers(email);
        if (findUsers.length > 0) {
            return ErrorResult.errorDuplicatingEmail();
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const createdUser = await this.authRepository.createUser(email, hashedPassword, name);

        return createdUser;
    };

    /**
     * 로그인 API
     */
    login = async (email, password) => {
        const findUsers = await this.authRepository.findUsers(email);

        if (!findUsers) {
            return ErrorResult.errorEmptyEmail();
        }

        const comparePassword = await bcrypt.compare(password, findUsers[0].password);
        if (!comparePassword) {
            return ErrorResult.errorNotEqualPassword();
        }

        // jwt 발급
        const token = jwt.sign(
            {
                userId: findUsers[0].userId,
            },
            process.env.JWT_KEY,
            {
                expiresIn: '12h',
            }
        );

        return SuccessResult.successLogin(token);
    };
}
