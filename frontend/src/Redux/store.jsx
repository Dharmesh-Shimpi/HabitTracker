import { configureStore } from '@reduxjs/toolkit';
import getRedux from './getHabit.redux';
import themesRedux from './themes.redux';
import registerUser from './register.redux';
import loginUser from './login.redux';
import OauthRedux from './Oauth.redux';

const store = configureStore({
	reducer: {
		getHabit: getRedux,
		theme: themesRedux,
		oauth: OauthRedux,
		register: registerUser,
		login: loginUser,
	},
});

export default store;
