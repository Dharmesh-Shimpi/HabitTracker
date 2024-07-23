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
	const dispatch = useDispatch();
	const { habitId } = useParams();
	const [visibleButtonIndex, setVisibleButtonIndex] = useState(null);

	if (!habitId) return <h1>Select a Habit</h1>;

	// Get calendar data from Redux state
	const { calendar, loading, success } = useSelector((state) => state.calendar);

	useEffect(() => {
		dispatch(getMonthThunk({ habitId }));
	}, []);

	const handleMarkDateAsDone = (date) => {
		dispatch(markDateAsDoneThunk({ habitId, date }))
			.then(() => dispatch(getMonthThunk({ habitId, id })))
			.catch((error) => console.error('Failed to mark date as done:', error));
	};

	const handleDivClick = (index) => {
		setVisibleButtonIndex(visibleButtonIndex === index ? null : index);
	};

	const handlePrevMonth = () => {
		dispatch(
			getAdjacentMonthThunk({
				habitId,
				month,
				year,
				direction: 'prev',
			}),
		);
	};

	const handleNextMonth = () => {
		dispatch(
			getAdjacentMonthThunk({
				habitId,
				month,
				year,
				direction: 'next',
			}),
		);
	};

	useEffect(() => {}, [dispatch]);

	if (loading) {
		return <div>Loading...</div>;
	}

	let month = null;
	let year = null;
	if (success) {
		console.log(calendar);
		month = calendar[0].month;
		year = calendar[0].year;
		console.log(month, year);
	}

	return (
		<div className={css.body}>
			<div className={css.monthYear}>
				<button onClick={handlePrevMonth}>Previous</button>
				{month} {year}
				<button onClick={handleNextMonth}>Next</button>
			</div>
			<div className={css.calendar}>
				{calendar.map((entry) => {
					return (
						<div
							className={css.dateDiv}
							key={entry._id}
							onClick={() => handleDivClick(i)}>
							<span className={css.date}>
								{entry.day}, {entry.date}
							</span>
							<span className={css.value}>
								{entry.value === 1 && <i className='fa-solid fa-check'></i>}
								{entry.value === -1 && <i className='fa-solid fa-xmark'></i>}
							</span>
							{/* {/* {visibleButtonIndex === i && ( */}
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
							{/* )} } */}
						</div>
					);
				})}
			</div>
		</div>
	);
}
