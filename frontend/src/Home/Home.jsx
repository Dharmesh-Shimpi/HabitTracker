import { Outlet } from 'react-router-dom';
import { Nav } from './Nav/Nav';
import { Habits } from './Habits/Habits';

import css from './Home.module.css';

export function Home() {
	
	return (
		<div className={css.body}>
			<Nav />
			<div className={css.main}>
				<Habits />
				<Outlet />
			</div>
		</div>
	);
}
