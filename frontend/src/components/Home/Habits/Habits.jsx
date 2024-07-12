import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { Streak } from '../Main/Streak/Streak';
import { getHabitsThunk, setStatus } from '../../../Redux/Habit.redux';
import css from './Habits.module.css';

export function Habits() {
	const dispatch = useDispatch();
	const { habits, error, loading, status } = useSelector(
		(state) => state.habits,
	);

	useEffect(() => {
		dispatch(getHabitsThunk());
	}, [dispatch]);

	useEffect(() => {
		if (status) {
			dispatch(getHabitsThunk());
			dispatch(setStatus());
		}
	}, [dispatch, status]);

	return (
		<div className={css.body}>
			<div className={css.habit}>
				<h1 className={css.h}>Habits</h1>
				{loading && <p>Loading...</p>}
				{error && <p>Error: {error}</p>}
				{!loading && !error && !habits && <p>No habits found</p>}
				<ul className={css.ul}>
					{habits &&
						habits.length > 0 &&
						habits.map((data, i) => (
							<Link
									to={`/${data.id}`}
								className={css.link}
								key={data.id}>
								<li className={css.li}>{data.name}</li>
							</Link>
						))}
				</ul>
			</div>
			<Streak />
		</div>
	);
}
