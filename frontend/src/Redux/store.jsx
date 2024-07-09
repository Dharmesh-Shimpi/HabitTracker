import { configureStore } from '@reduxjs/toolkit';
import HabitRedux from './Habit.redux';
import authRedux from './auth.redux';
import ProtectedRedux from './Protected.redux';

const store = configureStore({
	reducer: {
		habit: HabitRedux,
		auth: authRedux,
		protected: ProtectedRedux,
	},
});

export default store;
