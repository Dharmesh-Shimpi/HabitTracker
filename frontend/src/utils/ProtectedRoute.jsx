// src/components/ProtectedRoute.js
import React, { Children, useEffect } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { verifyToken } from '../Redux/Protected.redux';

const ProtectedRoute = ({children}) => {
	const dispatch = useDispatch();
	const { isAuthenticated, loading } = useSelector((state) => state.protected);

	useEffect(() => {
		dispatch(verifyToken());
	}, [dispatch]);

	if (loading) {
		return <p>Loading...</p>;
	}

	return isAuthenticated ? children : <Navigate to='/login' />;
};

export default ProtectedRoute;
