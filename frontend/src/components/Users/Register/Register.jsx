import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
	registerUser,
	resetSuccess,
	resetError,
} from '../../../Redux/register.redux';
import { Link, useNavigate } from 'react-router-dom';
import OAuth from '../Oauth/Oauth';

import css from './Register.module.css';

export function Register() {
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const { loading, error, success } = useSelector((state) => state.register);
	const [email, setEmail] = useState('');
	const [name, setName] = useState('');
	const [password, setPassword] = useState('');

	const handleSubmit = (e) => {
		e.preventDefault();
		dispatch(registerUser({ name, email, password }));
	};

	if (success) {
		dispatch(resetSuccess());
		navigate('/login');
	}

	return (
		<div className={css.container}>
			<h2>Register</h2>
			<form
				onSubmit={(e) => handleSubmit(e)}
				className={css.form}>
				<div className={css['form-group']}>
					<label htmlFor='name'>Name: </label>
					<input
						type='text'
						className={css['form-control']}
						id='name'
						name='name'
						value={name}
						onChange={(e) => setName(e.target.value)}
						required
					/>
				</div>
				<div className={css['form-group']}>
					<label htmlFor='email'>Email: </label>
					<input
						type='email'
						className={css['form-control']}
						id='email'
						name='email'
						value={email}
						onChange={(e) => setEmail(e.target.value)}
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
						onChange={(e) => setPassword(e.target.value)}
						required
					/>
				</div>
				<button
					className={css['btn']}
					type='submit'
					disabled={loading}>
					Register
				</button>
				{loading && <p>Loading...</p>}
				{error && <h3>Error: {error}</h3>}
				{success && <p>Registration successful! Redirecting to login...</p>}
				<p>
					Already have an account? <Link to='/login'>Log In</Link>
				</p>
				<p className={css.dist}>OR</p>
			</form>
			<OAuth /> 
		</div>
	);
}

export default Register;
