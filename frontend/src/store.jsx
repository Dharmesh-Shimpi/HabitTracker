import { configureStore } from '@reduxjs/toolkit';
import HabitRedux from './Home/Habits/Habit.redux';
import authRedux from './utils/auth.redux';
import ProtectedRedux from './utils/Protected.redux';
import CalendarRedux from './Home/Calendar/Calendar.redux';

const store = configureStore({
	reducer: {
		habits: HabitRedux,
		auth: authRedux,
		protected: ProtectedRedux,
		calendar: CalendarRedux,
	},
});

export default store;
