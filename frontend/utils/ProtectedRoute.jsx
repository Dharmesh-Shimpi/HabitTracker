import React, { Children, useEffect, useState } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import axios from 'axios';

const ProtectedRoute = ({ children }) => {
	const [isAuthenticated, setIsAuthenticated] = useState(false);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		const verifyToken = async () => {
			try {
				await axios.get('/verify');
				setIsAuthenticated(true);
			} catch (err) {
				setIsAuthenticated(false);
			} finally {
				setLoading(false);
			}
		};

		verifyToken();
	}, []);

	if (loading) {
		return <p>Loading...</p>; // Or a loading spinner
	}

	return isAuthenticated ? children : <Navigate to='/login' />;
};

export default ProtectedRoute;
