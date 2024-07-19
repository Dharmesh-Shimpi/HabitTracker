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
		const token = req.params.token;
		console.log(token);
		if (token) {
			res.json({ isVerified: true });
		} else {
			res.json({ isVerified: false });
		}
	}
}
