import AuthService from '../services/auth.service.js';
import SuccessResult from '../utils/success/success.js';

export class AuthController {
    authService = new AuthService();

    /**
     * 회원가입 API
     */
    signup = async (req, res) => {
        const { email, password, passwordConfirm, name } = req.body;

        const createdUser = await this.authService.signup(email, password, passwordConfirm, name);

        if (createdUser.success) {
            res.status(201).json(SuccessResult.success(createdUser, '회원가입이 성공하였습니다.'));
        } else {
            res.status(400).json(createdUser);
        }
    };

    /**
     * 로그인 API
     */
    login = async (req, res) => {
        const { email, password } = req.body;

        const result = await this.authService.login(email, password);

        if (result.success) {
            res.status(200).cookie('Authorization', `Bearer ${result.token}`).json(result);
        } else {
            res.status(400).json(result);
        }
    };
}
