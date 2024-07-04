import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useSearchParams, useNavigate, Link } from 'react-router-dom';
import {
	googleOauth,
	resetError,
	resetSuccess,
} from '../../../Redux/Oauth.redux';

import css from './Oauth.callback.module.css';

export function OauthCallback() {
	const { loading, error, success } = useSelector((state) => state.oauth);
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const [searchParams] = useSearchParams();
	const code = searchParams.get('code');

	useEffect(() => {
		if (code != null) {
			dispatch(googleOauth(code));
		}
	}, []);

	useEffect(() => {
		if (success === true) {
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
