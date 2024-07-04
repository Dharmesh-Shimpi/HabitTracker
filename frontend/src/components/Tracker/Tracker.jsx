import { useParams } from 'react-router-dom';
// import { useDispatch, useSelector } from 'react-redux';
// import {
// 	fetchTrackerByIdThunk,
// 	selectHabitById,
// 	fetchSelector,
// } from '../../data/fetchReducer';
// import { updateHabitThunk } from '../../data/updateReducer';
import { useState } from 'react';
import css from './Tracker.module.css';

export function Tracker() {
	const { id } = useParams();
	// const dispatch = useDispatch();
	// const habit = useSelector((state) => selectHabitById(state, id));
	// const tracker = useSelector((state) => fetchSelector(state));
	// const [visibleButtonIndex, setVisibleButtonIndex] = useState(null);

	// useEffect(() => {
	// 	if (habit && habit.tracker) {
	// 		dispatch(fetchTrackerByIdThunk(habit.tracker));
	// 	}
	// }, [dispatch, habit]);

	// if (!habit) {
	// 	return <div>Habit not found</div>;
	// }

	// if (tracker.length === 0) {
	// 	return <div>Loading...</div>;
	// }

	// const monthYear = tracker[0].date.split(' ');
	// const month = monthYear[1];
	// const year = monthYear[3];

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

	// 		/* <h3>{habit.habit}</h3>
	// {monthYear && (
	// 	<div className='monthYear'>
	// 		{month} {year}
	// 	</div>
	// )} */

	// /* {/* {tracker.map((entry, i) => {
	// 	const [day, , date] = entry.date.split(' ');

	// 	return (
	// 		<div
	// 			className='dates-div'
	// 			key={i}
	// 			onClick={() => handleDiv(i)}>
	// 			<span className='date'>
	// 				{day}, {date}
	// 			</span>
	// 			<span className='value'>
	// 				{entry.value === 1 && <i className='fa-solid fa-check'></i>}
	// 				{entry.value === -1 && <i className='fa-solid fa-xmark'></i>}
	// 			</span>
	// 			{visibleButtonIndex === i && (
	// 				<div className='button'>
	// 					<i
	// 						className='fa-solid fa-check'
	// 						onClick={(e) => {
	// 							e.stopPropagation();
	// 							handleUpdate(entry.date, 1);
	// 						}}></i>
	// 					<i
	// 						className='fa-solid fa-xmark'
	// 						onClick={(e) => {
	// 							e.stopPropagation();
	// 							handleUpdate(entry.date, -1);
	// 						}}></i>
	// 				</div>
	// 			)}
	// 		</div>
	// 	);
	// })} */
	// 	<div className={css.body}>
	// 	<div className={css.main}>
	// 		<div className='calendar'></div>
	// 	</div>
	// </div>

	return (
		<div className='col-span-full'>
			<label
				htmlFor='cover-photo'
				className='block text-sm font-medium leading-6 text-gray-900'>
				Cover photo
			</label>
			<div className='mt-2 flex justify-center rounded-lg border border-dashed border-gray-900/25 px-6 py-10'>
				<div className='text-center'>
					<div className='mt-4 flex text-sm leading-6 text-gray-600'>
						<label
							htmlFor='file-upload'
							className='relative cursor-pointer rounded-md bg-white font-semibold text-indigo-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-600 focus-within:ring-offset-2 hover:text-indigo-500'>
							<span>Upload a file</span>
							<input
								id='file-upload'
								name='file-upload'
								type='file'
								className='sr-only'
							/>
						</label>
						<p className='pl-1'>or drag and drop</p>
					</div>
					<p className='text-xs leading-5 text-gray-600'>PNG, JPG, GIF up to 10MB</p>
				</div>
			</div>
		</div>
	);
}
