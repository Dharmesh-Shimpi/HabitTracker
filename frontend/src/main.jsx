import React from 'react';
import { createRoot } from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './store';
import { Home } from './Home/Home';
import { Calendar } from './Home/Main/Calendar/Calendar';
import { Input } from './Home/Habits/Input/Input';
import { Register } from './Users/Register/Register';
import { Login } from './Users/LogIn/Login';
import { OauthCallback } from './Users/Oauth/Oauth.callback';
import ProtectedRoute from './utils/ProtectedRoute';

const container = document.getElementById('root');
const root = createRoot(container);

const router = createBrowserRouter([
	{
		path: '/',
		element: (
			<ProtectedRoute>
				<Home />
			</ProtectedRoute>
		),
		children: [
			{
				path: ':id',
				element: <Calendar />,
			},
			{
				path: 'add',
				element: <Input />,
			},
		],
	},
	{
		path: '/register',
		element: <Register />,
	},
	{
		path: '/login',
		element: <Login />,
	},
	{
		path: '/oauth',
		element: <OauthCallback />,
	},
]);

root.render(
	<React.StrictMode>
		<Provider store={store}>
			<RouterProvider router={router} />
		</Provider>
	</React.StrictMode>,
);
