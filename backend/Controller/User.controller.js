import UserModel from '../Model/User/User.repository.js';
import Oauth from '../Middleware/Oauth.js';

export default class UserController {
	static async register(req, res, next) {
		try {
			await UserModel.registerUser(req.body);
			res.sendStatus(201);
		} catch (err) {
			next(err);
		}
	}

	static async login(req, res, next) {
		try {
			const { id, token } = await UserModel.loginUser(req.body);

			res.cookie('token', token, {
				httpOnly: true,
				sameSite: 'strict',
				maxAge: 24 * 60 * 60 * 1000, // 1 day
			});
			res.cookie('id', id, {
				httpOnly: true,
				sameSite: 'strict',
				maxAge: 24 * 60 * 60 * 1000, // 1 day
			});
			res.sendStatus(200);
		} catch (err) {
			next(err);
		}
	}

	static async OauthRegister(req, res, next) {
		try {
			const { code } = req.body;
			const { access_token } = await Oauth.signup(code);
			const userInfo = await Oauth.getUserInfo(access_token);

			res.cookie('token', access_token, {
				httpOnly: true,
				secure: process.env.NODE_ENV === 'production',
				sameSite: 'strict',
				maxAge: 24 * 60 * 60 * 1000, // 1 day
			});
			res.cookie('id', userInfo._id, {
				httpOnly: true,
				secure: process.env.NODE_ENV === 'production',
				sameSite: 'strict',
				maxAge: 24 * 60 * 60 * 1000, // 1 day
			});
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

	static logOut(req, res) {
		res.clearCookie('token');
		res.clearCookie('email');
		res.clearCookie('id');
		req.user = null;
		res.sendStatus(200);
	}
}
