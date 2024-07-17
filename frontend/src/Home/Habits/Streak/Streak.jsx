import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
// import { useEffect } from 'react';

import css from './Streak.module.css';

export function Streak() {
	const { id } = useParams();
	// const dispatch = useDispatch();

	// Get the habit and its calendar from the Redux store
	const habit = useSelector((state) =>
		state.habits.habits?.find((h) => h.id === id),
	);

	if (!habit) {
		return <div>No Streak Found</div>;
	}

	// Calculate the current streak and max streak from the habit object
	const currentStreak = habit.currentStreak || 0;
	const maxStreak = habit.maxStreak || 0;

	return (
		<div className={css.body}>
			<h1>Streaks</h1>
			<div className={css.streakContainer}>
				<div className={css.streakItem}>
					<h2>Current Streak</h2>
					<p>{currentStreak} days</p>
				</div>
				<div className={css.streakItem}>
					<h2>Max Streak</h2>
					<p>{maxStreak} days</p>
				</div>
			</div>
		</div>
	);
}
