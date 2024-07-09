import dotenv from 'dotenv';
dotenv.config();
import jwt from 'jsonwebtoken';

export default class Auth {
	static generateToken(payload) {
		const token = jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET, {
			expiresIn: '1h',
		});
		return token;
	}

	static verify(req, res) {
		console.log('reached verify function');
		const token = req.cookies
		const id = req.cookies;
		console.log(token, id);
		if (token) {
			res.json({ isVerified: true });
		} else {
			res.json({ isVerified: false });
		}
	}
}
