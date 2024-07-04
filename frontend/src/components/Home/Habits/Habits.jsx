import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { Streak } from '../Streak/Streak';
import { getHabitsThunk } from '../../../Redux/getHabit.redux';
import css from './Habits.module.css';

export function Habits() {
	const dispatch = useDispatch();
	const { habits, error, loading } = useSelector((state) => state.getHabit);

	useEffect(() => {
		dispatch(getHabitsThunk());
	}, [dispatch]);

	return (
		<div className={css.body}>
			<div className={css.main}>
				<h1>Habits</h1>
				{loading && <p>Loading...</p>}
				{error && <p>Error: {error}</p>}
				<ul>
					{habits.length > 0 ? (
						habits.map((data, i) => (
							<li key={i}>
								<Link to={`/${data.id}`}>
									<div className={css.habits}>{data.habit}</div>
								</Link>
							</li>
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
