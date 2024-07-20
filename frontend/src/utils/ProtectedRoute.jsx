// src/components/ProtectedRoute.js
import React, { Children, useEffect } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { setError } from '../Users/auth.redux';
import { verifyToken } from '../Users/Protected.redux';

const ProtectedRoute = ({ children }) => {
	const { isAuthenticated, loading } = useSelector((state) => state.protected);
	const dispatch = useDispatch();
	const token = localStorage.getItem('token');

	if (!token) {
		dispatch(setError('Login expired, please login again'));
		return <Navigate to='/login' />;
	}
	
	useEffect(() => {
		dispatch(verifyToken(token));
	}, [dispatch]);

	if (loading) {
		return <p>Loading...</p>;
	}

	return isAuthenticated ? children : <Navigate to='/login' />;
};

export default ProtectedRoute;
