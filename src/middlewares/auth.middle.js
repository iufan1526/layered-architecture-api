import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import ErrorResult from '../utils/error/error.js';

dotenv.config();
/**
 * 인증 미들웨어
 */
export default (req, res, next) => {
    const { Authorization } = req.cookies;
    if (Authorization === undefined || Authorization === null) {
        return res.status(400).json(ErrorResult.errorAuthToken());
    }

    const requestAuthToken = Authorization.split(' ');

    let resultAuth;
    try {
        resultAuth = jwt.verify(requestAuthToken[1], process.env.JWT_KEY);
    } catch (err) {
        console.log(err);
        return res.status(400).json(ErrorResult.errorAuthToken());
    }

    req.user = resultAuth.userId;

    next();
};
