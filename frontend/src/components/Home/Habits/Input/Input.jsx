import React, { useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createHabitsThunk } from '../../../../Redux/Habit.redux';
import css from './Input.module.css';

export function Input() {
	const dispatch = useDispatch();
	const descInput = useRef();
	const goals = useRef();

	function submit(e) {
		e.preventDefault();
		const desc = descInput.current.value;
		const goal = goals.current.value;
		dispatch(createHabitsThunk({ desc, goal }));
	}

	return (
		<form
			onSubmit={submit}
			className={css.inputBox}>
			<div className={css.inputDiv}>
				Description :
				<input
					ref={descInput}
					type='text'
				/>
			</div>
			<div className={css.goals}>
				Set Weekly Goals :
				<input
					min='1'
					max='7'
					ref={goals}
					type='number'
				/>
				days a week
			</div>
			<button type='submit'>Add habit</button>
		</form>
	);
}

export default Input;
