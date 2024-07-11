import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAwardsStreaksThunk } from '../store/streaksSlice';
import css from './Awards.module.css';

export function Awards() {
	const dispatch = useDispatch();
	const awards = useSelector((state) => state.streaks.awards);
	const status = useSelector((state) => state.streaks.status);

	useEffect(() => {
		dispatch(fetchAwardsStreaksThunk('weekly')); // Fetch weekly awards for example
	}, [dispatch]);

	return (
		<div className={css.awardsContainer}>
			<h2>Achievements</h2>
			{status === 'loading' && <p>Loading...</p>}
			{status === 'succeeded' && (
				<div className={css.awardsList}>
					{awards.map((award, i) => (
						<div
							key={i}
							className={css.awardItem}>
							<i className={`fa ${award.icon}`}></i>
							<h3>{award.name}</h3>
							<p>{award.description}</p>
						</div>
					))}
				</div>
			)}
			{status === 'failed' && <p>Error loading awards.</p>}
		</div>
	);
}
