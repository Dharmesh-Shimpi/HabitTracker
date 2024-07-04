import { Link } from 'react-router-dom';
import { Theme } from './Themes/Theme';
import css from './Nav.module.css';

export function Nav() {
	return (
		<nav className={css.nav}>
			<img
				className={css.img}
				src='../../../public/Logo.png'></img>
			<div className={css.right}>
				<Link
					to='/add'
					className={css.input}>
					Add Habit
					<i className={`fa-solid fa-arrow-up ${css.i}`}></i>
				</Link>
				<Theme />
				<div className={css.logout}>
					Logout
					<i className={`fa-solid fa-right-from-bracket ${css.i}`}></i>
				</div>
			</div>
		</nav>
	);
}
