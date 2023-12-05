export default class UserController {
    getUser = async (req, res, next) => {
        console.log('미들웨어 통과!!', req.user);
    };
}
