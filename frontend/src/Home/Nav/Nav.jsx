import { Link, useNavigate } from 'react-router-dom';
import { Theme } from './Themes/Theme';
import api from '../../utils/axios';

import css from './Nav.module.css';

export function Nav() {
	const navigate = useNavigate();

	const handleLogout = async () => {
		try {
			await api.get('/logout');
			localStorage.clear();
			navigate('/login');
		} catch (error) {
			console.error('Error during logout:', error);
			alert(
				`Error during logout: ${
					error.response ? error.response.data.message : error.message
				}`,
			);
		}
	};

	return (
		<nav className={css.nav}>
			<img
				className={css.img}
				src='/Logo.png' // Use correct path or import
				alt='Logo'
			/>
			<div className={css.right}>
				<Link
					to='/add'
					className={css.input}>
					Add Habit
					<i className={`fa-solid fa-arrow-up ${css.i}`}></i>
				</Link>
				<Theme />
				<div
					className={css.logout}
					onClick={handleLogout}>
					Logout
					<i className={`fa-solid fa-right-from-bracket ${css.i}`}></i>
				</div>
			</div>
		</nav>
	);
}
