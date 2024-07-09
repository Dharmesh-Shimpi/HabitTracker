import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useState, useEffect } from 'react';

import css from './Tracker.module.css';

export function Tracker() {
	const { id } = useParams();
	const dispatch = useDispatch();
	const [visibleButtonIndex, setVisibleButtonIndex] = useState(null);

	useEffect(() => {
		if (habit && habit.tracker) {
			dispatch(fetchTrackerByIdThunk(habit.tracker));
		}
	}, [dispatch, habit]);

	if (!habit) {
		return <div>Habit not found</div>;
	}

	if (tracker.length === 0) {
		return <div>Loading...</div>;
	}

	const monthYear = tracker[0].date.split(' ');
	const month = monthYear[1];
	const year = monthYear[3];

	function handleUpdate(date, value) {
		dispatch(updateHabitThunk({ habitId: id, date, value }))
			.then(() => {
				setVisibleButtonIndex(null);
			})
			.then(() => {
				if (habit && habit.tracker) {
					dispatch(fetchTrackerByIdThunk(habit.tracker));
				}
			});
	}

	function handleDiv(index) {
		setVisibleButtonIndex(visibleButtonIndex === index ? null : index);
	}

	return (
		<div>
			<h3>{habits.habit}</h3>
			{monthYear && (
				<div className='monthYear'>
					{month} {year}
				</div>
			)}
			{tracker.map((entry, i) => {
				const [day, , date] = entry.date.split(' ');
				<div
					className='dates-div'
					key={i}
					onClick={() => handleDiv(i)}>
					<span className='date'>
						{day}, {date}
					</span>
					<span className='value'>
						{entry.value === 1 && <i className='fa-solid fa-check'></i>}
						{entry.value === -1 && <i className='fa-solid fa-xmark'></i>}
					</span>
					{visibleButtonIndex === i && (
						<div className='button'>
							<i
								className='fa-solid fa-check'
								onClick={(e) => {
									e.stopPropagation();
									handleUpdate(entry.date, 1);
								}}></i>
							<i
								className='fa-solid fa-xmark'
								onClick={(e) => {
									e.stopPropagation();
									handleUpdate(entry.date, -1);
								}}></i>
						</div>
					)}
				</div>;
			})}
			<div className={css.body}>
				<div className={css.main}>
					<div className='calendar'></div>
				</div>
			</div>
		</div>
	);
}
