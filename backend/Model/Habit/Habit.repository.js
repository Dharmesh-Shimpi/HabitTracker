import HabitSchema from '../Model/Habit/Habit.model.js';
import appError from '../Middleware/errors.js';

export default class HabitRepo {
	static async getHabit() {
		try {
			return await HabitSchema.find();
		} catch (err) {
			throw new appError(`Error finding habits, error: ${err}`, 400);
		}
	}

	static async createHabit(data) {
		try {
			const { habit, goal } = data;
			const calendar = this.createCalendar();
			const newHabit = new HabitSchema({
				name: habit,
				weeklyGoal: goal,
				calendar,
			});
			return newHabit;
		} catch (err) {
			throw new appError(`Error creating Habit. Error: ${err}`, 401);
		}
	}

	static createCalendar() {
		const months = [
			'January',
			'February',
			'March',
			'April',
			'May',
			'June',
			'July',
			'August',
			'September',
			'October',
			'November',
			'December',
		];

		const days = [
			'Sunday',
			'Monday',
			'Tuesday',
			'Wednesday',
			'Thursday',
			'Friday',
			'Saturday',
		];

		const today = new Date();
		const oneYearFromNow = new Date(today);
		oneYearFromNow.setFullYear(today.getFullYear() + 1);

		let currentDate = new Date(today);
		const calendar = [];

		while (currentDate < oneYearFromNow) {
			const day = days[currentDate.getDay()];
			const date = currentDate.getDate();
			const month = months[currentDate.getMonth()];
			const year = currentDate.getFullYear();

			const formattedDate = `${day} ${date} ${month} ${year}`;
			const calendarEntry = { date: formattedDate, status: false };
			calendar.push(calendarEntry);

			currentDate.setDate(currentDate.getDate() + 1);
		}

		return calendar;
	}
}
