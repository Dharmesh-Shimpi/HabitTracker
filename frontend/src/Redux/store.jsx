import { configureStore } from '@reduxjs/toolkit';
import HabitRedux from './Habit.redux';
import authRedux from './auth.redux';
import ProtectedRedux from './Protected.redux';
import StreakRedux from './Streak.redux';
import CalendarRedux from './Calendar.redux';

const store = configureStore({
	reducer: {
		habit: HabitRedux,
		auth: authRedux,
		protected: ProtectedRedux,
		calendar: CalendarRedux,
		streak: StreakRedux,
	},
});

export default store;
