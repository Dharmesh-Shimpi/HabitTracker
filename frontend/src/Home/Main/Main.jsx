import { Link, Outlet } from 'react-router-dom';
import css from "./Main.css";

export function Main() {
	return (
		<div style={css.main}>
			<div style={css.linkDiv}>
				<Link
					to='/week'
					style={css.link}>
					Weekly Calendar
				</Link>
				<Link
					to='/calendar'
					style={css.link}>
					Monthly Calendar
				</Link>
			</div>
		</div>
	);
}


