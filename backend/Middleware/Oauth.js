import dotenv from 'dotenv';
dotenv.config();
import axios from 'axios';
import appError from './errors.js';

export default class Oauth {
	static getGoogleAuthURL() {
		const baseAuthURL = 'https://accounts.google.com/o/oauth2/v2/auth';
		const params = {
			client_id: process.env.GOOGLE_CLIENT_ID,
			redirect_uri: process.env.GOOGLE_REDIRECT_URI,
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
		try {
			console.log('Exchanging code for token:', code);
			const { data } = await axios.post('https://oauth2.googleapis.com/token', {
				code,
				client_id: process.env.GOOGLE_CLIENT_ID,
				client_secret: process.env.GOOGLE_CLIENT_SECRET,
				redirect_uri: process.env.GOOGLE_REDIRECT_URI,
				grant_type: 'authorization_code',
			});
			console.log('Received token data:', data);
			return data;
		} catch (error) {
			console.error(
				'OAuth signup error:',
				error.response ? error.response.data : error.message,
			);
			throw new Error('OAuth signup failed');
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
			return response.data;
		} catch (error) {
			console.error('Get User Info Error:', error.response?.data || error.message);
			throw new Error('Failed to fetch user info', 401);
		}
	}
}
