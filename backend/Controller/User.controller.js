import UserModel from '../Model/User/User.model.js';
import Oauth from '../Middleware/Oauth.js';

export default class UserController {
	static async register(req, res, next) {
		try {
			const newUser = await UserModel.registerUser(req.body);
			res.status(201).json(newUser);
		} catch (err) {
			next(err);
		}
	}

	static async login(req, res, next) {
		try {
			const { token, name, email } = await UserModel.loginUser(req.body);
			res.cookie('token', token, {
				httpOnly: true,
				secure: process.env.NODE_ENV === 'production',
				sameSite: 'strict',
				maxAge: 24 * 60 * 60 * 1000, // 1 day
			});

			res.json({ name, email });
		} catch (err) {
			next(err);
		}
	}

	static async OauthRegister(req, res, next) {
		try {
			const { code } = req.body;
			const { access_token } = await Oauth.signup(code);
			res.cookie('OauthToken', access_token, {
				httpOnly: true,
				secure: process.env.NODE_ENV === 'production',
				sameSite: 'strict',
				maxAge: 24 * 60 * 60 * 1000, // 1 day
			});
			const userInfo = await Oauth.getUserInfo(access_token);
			console.log(userInfo);
			const newUser = await UserModel.registerOauthUser(userInfo);
			res.json({ newUser });
		} catch (err) {
			next(err);
		}
	}

	// static async OauthLogin(req, res, next) {
	// 	try {
	// 		const access_token = req.cookie.OauthToken
	// 		const userInfo = await Oauth.getUserInfo(access_token);
	// 		const newUser = await UserModel.registerOauthUser(userInfo);
	// 		res.json({ newUser });
	// 	} catch (err) {
	// 		next(err);
	// 	}
	// }

	static getOauthURL(req, res, next) {
		try {
			const url = Oauth.getGoogleAuthURL();
			res.json({ url });
		} catch (err) {
			next(err);
		}
	}
}
