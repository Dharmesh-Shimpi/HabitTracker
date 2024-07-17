import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useNavigate, Link } from 'react-router-dom';
import {
	googleOauth,
} from '../auth.redux';

import css from './Oauth.callback.module.css';

export function OauthCallback() {
	const { loading, error, success } = useSelector((state) => state.auth);
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const location = useLocation();

	useEffect(() => {
		const searchParams = new URLSearchParams(location.search);
		const code = searchParams.get('code');
		
		if (code != null) {
			dispatch(googleOauth(code));
		}
	}, []);

	useEffect(() => {
		if (success) {
			navigate('/');
		}
	}, [success]);	

	return (
		<div className={css.redirectBox}>
			{loading && <p className={css.p}>Redirecting</p>}
			{error && (
				<>
					<div className={css.error}>Please try again later or login manually. Error : {error}</div>
					<div className={css.error}>
						<Link
							className={css.link}
							to='/login'>
							Login
						</Link>
					</div>
				</>
			)}
		</div>
	);
}
