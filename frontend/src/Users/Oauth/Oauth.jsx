import React, { useState } from 'react';
import api from '../../utils/axios';
import css from './Oauth.module.css';

export const OAuth = () => {
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState(null);

	const getGoogleAuth = async () => {
		try {
			const response = await api.get('/register/Oauth');
			const { url } = response.data;
			window.location.href = url; // Redirect user to Google's OAuth consent screen
		} catch (error) {
			console.error('Google Auth Error:', error.message);
		}
	};

	return (
		<button
			className={css.google}
			onClick={getGoogleAuth}>
			{!loading && !error && (
				<>
					<i className={`fa-brands fa-google ${css.i}`}></i>
					<span className={css.text}>Continue with Google</span>
				</>
			)}
			{loading && <p>Loading...</p>}
			{error && <p>Error logging in through Google</p>}
		</button>
	);
};

export default OAuth;
