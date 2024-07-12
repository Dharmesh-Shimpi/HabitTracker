import { configureStore } from '@reduxjs/toolkit';
import HabitRedux from './Habit.redux';
import authRedux from './auth.redux';
import ProtectedRedux from './Protected.redux';
import CalendarRedux from './Calendar.redux';

const store = configureStore({
	reducer: {
		habits: HabitRedux,
		auth: authRedux,
		protected: ProtectedRedux,
		calender: CalendarRedux,
	},
});

export default store;
