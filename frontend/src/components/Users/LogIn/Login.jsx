// Login.js
import React from 'react';
import { Link, Navigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import {
	loginUser,
	setEmail,
	setPassword,
	resetSuccess,
	resetError,
} from '../../../Redux/login.redux';
import OAuth from '../Oauth/Oauth';
import css from './Login.module.css';

export function Login() {
	const dispatch = useDispatch();
	const { email, password, loading, error, success } = useSelector(
		(state) => state.login,
	);

	const handleSubmit = async (e) => {
		e.preventDefault();
		dispatch(loginUser({ email, password }));
	};

	const handleEmailChange = (e) => {
		dispatch(setEmail(e.target.value));
		dispatch(resetError());
		dispatch(resetSuccess());
	};

	const handlePasswordChange = (e) => {
		dispatch(setPassword(e.target.value));
		dispatch(resetError());
		dispatch(resetSuccess());
	};

	return (
		<div className={css.container}>
			<h2>Log In</h2>
			{loading && <h2>Loading...</h2>}
			{error && <h3>{error}</h3>}
			{ }
			<form
				onSubmit={handleSubmit}
				className={css.form}>
				<div className={css['form-group']}>
					<label htmlFor='email'>Email: </label>
					<input
						type='email'
						className={css['form-control']}
						id='email'
						name='email'
						value={email}
						onChange={handleEmailChange}
						required
					/>
				</div>
				<div className={css['form-group']}>
					<label htmlFor='password'>Password: </label>
					<input
						type='password'
						className={css['form-control']}
						id='password'
						name='password'
						value={password}
						onChange={handlePasswordChange}
						required
					/>
				</div>
				<button
					className={css['btn']}
					type='submit'>
					Log In
				</button>
				<p>
					Don't have an account? <Link to='/register'>Register</Link>
				</p>
				<p className={css.dist}>OR</p>
			</form>
			<OAuth />
		</div>
	);
}
