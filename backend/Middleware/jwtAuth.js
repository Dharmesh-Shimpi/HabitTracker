import dotenv from 'dotenv';
dotenv.config();
import jwt from 'jsonwebtoken';
import appError from './errors.js';

export function generateToken(payload) {
	const token = jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET, {
		expiresIn: '1h',
	});
	console.log(token);
	return token;
}

export function verify(req, res, next) {
	const token = req.cookies.token;
	const OauthToken = req.cookies.OauthToken;
	if (OauthToken) res.status(200);
	if (token) {
		try {
			const decoded = jwt.verify(token, process.env.JWT_SECRET);
			req.user = decoded;
			res.status(200);
		} catch (err) {
			throw new appError('Invalid token', 401);
		}
	}

	throw new appError('No token provided', 401);
}

export function auth(req, res, next) {
	const token = req.cookies.token;
	const OauthToken = req.cookies.OauthToken;
	if (OauthToken) next();
	if (token) {
		try {
			const decoded = jwt.verify(token, process.env.JWT_SECRET);
			req.user = decoded;
			next();
		} catch (err) {
			throw new appError('Invalid token', 401);
		}
	}

	throw new appError('No token provided', 401);
}
