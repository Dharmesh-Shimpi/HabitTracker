import { configureStore } from '@reduxjs/toolkit';
import HabitRedux from './Home/Habits/Habit.redux';
import authRedux from './Users/auth.redux';
import ProtectedRedux from './Users/Protected.redux';
import CalendarRedux from './Home/Main/Calendar/Calendar.redux';

const store = configureStore({
	reducer: {
		habits: HabitRedux,
		auth: authRedux,
		protected: ProtectedRedux,
		calendar: CalendarRedux,
	},
});

export default store;
