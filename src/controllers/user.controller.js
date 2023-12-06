import UserService from '../services/user_service.js';
import SuccessResult from '../utils/success/success.js';

export default class UserController {
    userServiece = new UserService();

    /**
     * 회원 상세 조회 API
     */
    getUser = async (req, res, next) => {
        const resultUser = await this.userServiece.getUser(req.user);

        res.status(200).json(SuccessResult.success(resultUser, '회원조회를 성공했습니다.'));
    };
}
