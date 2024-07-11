import React from 'react';
import { createRoot } from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './Redux/store';
import { Home } from './components/Home/Home';
import { Calendar } from './components/Home/Main/Calendar/Calendar';
import { Input } from './components/Home/Habits/Input/Input';
import { Register } from './components/Users/Register/Register';
import { Login } from './components/Users/LogIn/Login';
import { OauthCallback } from './components/Users/Oauth/Oauth.callback';
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
