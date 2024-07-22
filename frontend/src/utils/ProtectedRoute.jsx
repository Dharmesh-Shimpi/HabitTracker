import React, { useEffect } from 'react';
import { Navigate, Outlet, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { setError } from './auth.redux';
import { verifyToken } from './Protected.redux';

const ProtectedRoute = ({ children }) => {
	const navigate = useNavigate();
	const { isAuthenticated, loading } = useSelector((state) => state.protected);
	const dispatch = useDispatch();
	const token = localStorage.getItem('token');

	useEffect(() => {
		if (!token) {
			dispatch(setError('Login expired, please login again'));
			navigate('/login');
		} else {
			dispatch(verifyToken(token));
		}
	}, [dispatch, navigate, token]);

	if (loading) {
		return <p>Loading...</p>;
	}

	return isAuthenticated ? children : <Navigate to='/login' />;
};

export default ProtectedRoute;
