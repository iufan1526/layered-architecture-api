import UserRepository from '../repositories/user.repository.js';
import ErrorResult from '../utils/error/error.js';

export default class UserService {
    userRepository = new UserRepository();

    /**
     * 회원 상세 조회 API
     */
    getUser = async userId => {
        const resultUser = await this.userRepository.getUser(userId);

        return resultUser;
    };
}
