import dotenv from 'dotenv';
import axios from 'axios';
import appError from './errors.js';

dotenv.config();

export default class Oauth {
	static getGoogleAuthURL() {
		const baseAuthURL = 'https://accounts.google.com/o/oauth2/v2/auth';
		const params = {
			client_id: process.env.CLIENT_ID,
			redirect_uri: process.env.REDIRECT_URI,
			response_type: 'code',
			scope:
				'https://www.googleapis.com/auth/userinfo.profile https://www.googleapis.com/auth/userinfo.email',
			access_type: 'offline',
			prompt: 'consent',
		};
		const url = `${baseAuthURL}?${new URLSearchParams(params).toString()}`;
		return url;
	}

	static async signup(code) {
		const googleAuthURL = 'https://oauth2.googleapis.com/token';
		const values = {
			code,
			grant_type: 'authorization_code',
			client_id: process.env.CLIENT_ID,
			client_secret: process.env.CLIENT_SECRET,
			redirect_uri: process.env.REDIRECT_URI,
		};

		try {
			const response = await axios.post(
				googleAuthURL,
				new URLSearchParams(values),
			);
			return response.data;
		} catch (error) {
			console.error('OAuth Signup Error:', error.response?.data || error.message);
			throw new appError('OAuth Signup failed', 401);
		}
	}

	static async getUserInfo(accessToken) {
		const userInfoURL = 'https://www.googleapis.com/oauth2/v2/userinfo';
		try {
			const response = await axios.get(userInfoURL, {
				headers: {
					Authorization: `Bearer ${accessToken}`,
				},
			});
			console.log(response.data);
			return response.data;
		} catch (error) {
			console.error('Get User Info Error:', error.response?.data || error.message);
			throw new Error('Failed to fetch user info', 401);
		}
	}
}
