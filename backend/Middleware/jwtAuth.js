import dotenv from 'dotenv';
dotenv.config();
import jwt from 'jsonwebtoken';
import appError from './errors.js';

export default class Auth {
	static generateToken(payload) {
		const token = jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET, {
			expiresIn: '1h',
		});
		return token;
	}

	static verify(req, res, next) {
		try {
			const token = req.params.token;
			if (token) {
				jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
					if (err) {
						next(err);
					}
					res.json({ id: decoded.userId, isVerified: true });
				});
			} else {
				res.send(new appError('No token found', 404));
			}
		} catch (err) {
			res.send(err);
		}
	}
}
