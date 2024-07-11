import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';

import { fetchStreaks, fetchAwards } from '../../redux/streakSlice';
import css from './Streak.module.css';

export function Streak() {
	const dispatch = useDispatch();
	const {
		streaks,
		status: streakStatus,
		error: streakError,
	} = useSelector((state) => state.streaks);
	const {
		awards,
		status: awardStatus,
		error: awardError,
	} = useSelector((state) => state.streaks); // Fetch from the same state for simplicity

	useEffect(() => {
		dispatch(fetchStreaks());
		dispatch(fetchAwards());
	}, [dispatch]);

	if (streakStatus === 'loading' || awardStatus === 'loading') {
		return <div>Loading...</div>;
	}

	if (streakStatus === 'failed') {
		return <div>{streakError}</div>;
	}

	if (awardStatus === 'failed') {
		return <div>{awardError}</div>;
	}

	return (
		<div className={css.body}>
			<h1></h1>
		</div>

	);
}
