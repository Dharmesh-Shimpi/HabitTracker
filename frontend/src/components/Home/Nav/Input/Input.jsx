import { useRef } from 'react';
import { useSelector } from 'react-redux';
import css from './Input.module.css';

export function Input() {
	const { name, email } = useSelector((state) => state.login);
	const descInput = useRef();
	const goals = useRef();
	function submit(e) {
		e.preventDefault();
		const { description } = descInput.current;
		const { value } = goals.current;
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
