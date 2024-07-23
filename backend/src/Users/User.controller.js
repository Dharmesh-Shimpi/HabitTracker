import UserModel from './User.repository.js';
import Oauth from '../../Middleware/Oauth.js';

export default class UserController {
	static async register(req, res, next) {
		try {
			const { name, email, password } = await UserModel.registerUser(req.body);
			res.json({ name, email, password });
		} catch (err) {
			next(err);
		}
	}

	static async login(req, res, next) {
		try {
			const { token } = await UserModel.loginUser(req.body);
			res.json(token);
		} catch (err) {
			next(err);
		}
	}

	static async OauthRegister(req, res, next) {
		try {
			const { code } = req.body;
			const { access_token } = await Oauth.signup(code);
			const userInfo = await Oauth.getUserInfo(access_token);
			await UserModel.registerOauthUser(userInfo);
			res.sendStatus(200);
		} catch (err) {
			next(err);
		}
	}

	static getOauthURL(req, res, next) {
		try {
			const url = Oauth.getGoogleAuthURL();
			res.json({ url });
		} catch (err) {
			next(err);
		}
	}

}
