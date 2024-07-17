import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useState, useEffect } from 'react';
import {
	getMonthThunk,
	markDateAsDoneThunk,
	getAdjacentMonthThunk,
} from './Calendar.redux';
import css from './Calendar.module.css';

export function Calendar() {
	const { id } = useParams();
	if (!id) return <h1>Select a Habit</h1>
	const dispatch = useDispatch();
	const [visibleButtonIndex, setVisibleButtonIndex] = useState(null);

	// Fetch the habit using `id`
	const habit = useSelector((state) =>
		state.habits.habits.find((h) => h._id === id),
	);

	// Get calendar data from Redux state
	const calendar = useSelector((state) => state.calendar.calendar);
	const loading = useSelector((state) => state.calendar.loading);

	useEffect(() => {
		if (id) {
			dispatch(getMonthThunk({ habitId: id }));
		}
	}, [dispatch, id]);

	const handleMarkDateAsDone = (date) => {
		dispatch(markDateAsDoneThunk({ habitId: id, date }))
			.then(() => dispatch(getMonthThunk({ habitId: id })))
			.catch((error) => console.error('Failed to mark date as done:', error));
	};

	const handleDivClick = (index) => {
		setVisibleButtonIndex(visibleButtonIndex === index ? null : index);
	};

	const handlePrevMonth = () => {
		const month = new Date(calendar[0]?.date).toLocaleString('default', {
			month: 'long',
		});
		const year = new Date(calendar[0]?.date).getFullYear();
		dispatch(
			getAdjacentMonthThunk({
				habitId: id,
				userId: 'someUserId',
				year,
				month,
				direction: 'prev',
			}),
		);
	};

	const handleNextMonth = () => {
		const month = new Date(calendar[0]?.date).toLocaleString('default', {
			month: 'long',
		});
		const year = new Date(calendar[0]?.date).getFullYear();
		dispatch(
			getAdjacentMonthThunk({
				habitId: id,
				userId: 'someUserId',
				year,
				month,
				direction: 'next',
			}),
		);
	};

	if (!habit) {
		return <div>Habit not found</div>;
	}

	if (loading) {
		return <div>Loading...</div>;
	}

	const monthYear = calendar[0]?.date.split(' ');
	console.log(monthYear);
	// const month = monthYear[1];
	// const year = monthYear[3];

	return (
		<div>
			<h3>{habit.name}</h3>
			<div className={css.monthYear}>
				<button onClick={handlePrevMonth}>Previous</button>
				{/* {month} {year} */}
				<button onClick={handleNextMonth}>Next</button>
			</div>
			<div className={css.calendarContainer}>
				{calendar.map((entry, i) => {
					const [day, , date] = entry.date.split(' ');
					return (
						<div
							className={css.dateDiv}
							key={i}
							onClick={() => handleDivClick(i)}>
							<span className={css.date}>
								{day}, {date}
							</span>
							<span className={css.value}>
								{entry.value === 1 && <i className='fa-solid fa-check'></i>}
								{entry.value === -1 && <i className='fa-solid fa-xmark'></i>}
							</span>
							{visibleButtonIndex === i && (
								<div className={css.button}>
									<i
										className='fa-solid fa-check'
										onClick={(e) => {
											e.stopPropagation();
											handleMarkDateAsDone(entry.date);
										}}></i>
									<i
										className='fa-solid fa-xmark'
										onClick={(e) => {
											e.stopPropagation();
											handleStreakUpdate(entry.date);
										}}></i>
								</div>
							)}
						</div>
					);
				})}
			</div>
		</div>
	);
}
