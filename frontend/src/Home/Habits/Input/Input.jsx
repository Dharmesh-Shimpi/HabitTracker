import React, { useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createHabitsThunk } from '../Habit.redux';
import css from './Input.module.css';

const categories = [
	'Physical Activities',
	'Meditation',
	'Creative Tasks',
	'Educational Activities',
	'Healthy Eating',
	'Relaxation',
	'New Hobbies',
	'Eco-Friendly Tasks',
	'Digital Management',
	'Reading',
	'Other',
];

export function Input() {
	const dispatch = useDispatch();
	const weeklyGoalInput = useRef();
	const [selectedCategory, setSelectedCategory] = useState('');
	const customCategoryInput = useRef();
	const { id } = useSelector((state) => state.protected);
	console.log(id);
	function handleCategoryChange(e) {
		const value = e.target.value;
		setSelectedCategory(value);
	}

	function submit(e) {
		e.preventDefault();
		const weeklyGoal = weeklyGoalInput.current.value;
		const customCategory =
			selectedCategory === 'Other'
				? customCategoryInput.current.value
				: selectedCategory;

		const data = {
			weeklyGoal,
			name: customCategory,
		};
		dispatch(createHabitsThunk({data, id}));
	}

	return (
		<form
			onSubmit={submit}
			className={css.inputBox}>
			<div className={css.inputDiv}>
				Choose One:
				<select
					value={selectedCategory}
					onChange={handleCategoryChange}
					required>
					<option value=''>Select a category</option>
					{categories.map((category) => (
						<option
							key={category}
							value={category}>
							{category}
						</option>
					))}
				</select>
			</div>

			{selectedCategory === 'Other' && (
				<div className={css.inputDiv}>
					Enter Habit:
					<input
						ref={customCategoryInput}
						type='text'
						required
					/>
				</div>
			)}
			<div className={css.goals}>
				Set Weekly Goals:
				<input
					min='1'
					max='7'
					ref={weeklyGoalInput}
					type='number'
					required
				/>
				days a week
			</div>
			<button type='submit'>Add Habit</button>
		</form>
	);
}

export default Input;
