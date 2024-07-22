import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { Streak } from './Streak/Streak';
import { getHabitsThunk, setStatus } from './Habit.redux';
import css from './Habits.module.css';

export function Habits() {
	const { habits, error, loading, status } = useSelector(
		(state) => state.habits,
	);
	const { id } = useSelector((state) => state.protected);
	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(getHabitsThunk(id));
	}, [dispatch]);

	useEffect(() => {
		if (status) {
			dispatch(getHabitsThunk(id));
			dispatch(setStatus());
		}
	}, [dispatch, status]);

	return (
		<div className={css.body}>
			<div className={css.habit}>
				<h1 className={css.h}>Habits</h1>
				{loading && <p>Loading...</p>}
				{error && <p>Error: {error}</p>}
				<ul className={css.ul}>
					{habits ? (
						habits.map((data) => (
							<Link
								to={`/${data._id}`}
								className={css.link}>
								<li
									className={css.li}
									key={data._id}>
									{data.name}
								</li>
							</Link>
						))
					) : (
						<p>No habits found</p>
					)}
				</ul>
			</div>
			<Streak />
		</div>
	);
}
