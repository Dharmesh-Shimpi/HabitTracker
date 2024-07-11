import appError from '../../Middleware/errors.js';
import HabitModel from './Habit.model.js';

const days = [
	'Sunday',
	'Monday',
	'Tuesday',
	'Wednesday',
	'Thursday',
	'Friday',
	'Saturday',
];

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

export default class CalendarRepo {
	static async createCalendar(userId) {
		const today = new Date();
		const oneYearFromNow = new Date(today);
		oneYearFromNow.setFullYear(today.getFullYear() + 1);

		let currentDate = new Date(today);
		const calendar = {};

		while (currentDate < oneYearFromNow) {
			const year = currentDate.getFullYear();
			const month = months[currentDate.getMonth()];
			const date = currentDate.getDate();
			const day = days[currentDate.getDay()];

			if (!calendar[year]) {
				calendar[year] = {};
			}

			if (!calendar[year][month]) {
				calendar[year][month] = {};
			}

			calendar[year][month][date] = {
				day,
				done: false,
			};

			currentDate.setDate(currentDate.getDate() + 1);
		}

		try {
			await Habit.updateMany({ userId }, { $set: { calendar } }, { upsert: true });
		} catch (err) {
			throw new appError('Error creating Calendar', 401);
		}
	}

	static async markDateAsDone(habitId, { year, month, date }) {
		try {
			const habit = await HabitModel.findById(habitId);

			if (!habit) {
				throw new appError(`No habit found with ID ${habitId}`, 404);
			}

			if (
				!habit.calendar[year] ||
				!habit.calendar[year][month] ||
				!habit.calendar[year][month][date]
			) {
				throw new appError(
					`No calendar entry found for ${month} ${date}, ${year}`,
					404,
				);
			}

			habit.calendar[year][month][date].done = true;
			await habit.save();

			return habit.calendar[year][month][date];
		} catch (err) {
			console.error(`Error marking date as done. Error: ${err.message}`);
			throw new appError(`Error marking date as done. Error: ${err}`, 401);
		}
	}

	static async updateStreak(habitId, { year, month, date }) {
		try {
			const habit = await HabitModel.findById(habitId);

			if (!habit) {
				throw new appError(`No habit found with ID ${habitId}`, 404);
			}

			if (
				!habit.calendar[year] ||
				!habit.calendar[year][month] ||
				!habit.calendar[year][month][date]
			) {
				throw new appError(
					`No calendar entry found for ${month} ${date}, ${year}`,
					404,
				);
			}

			const currentDate = new Date(year, month, date);
			const previousDate = new Date(currentDate);
			previousDate.setDate(currentDate.getDate() - 1);

			const prevYear = previousDate.getFullYear();
			const prevMonth = months[previousDate.getMonth()];
			const prevDate = previousDate.getDate();

			if (
				habit.calendar[prevYear] &&
				habit.calendar[prevYear][prevMonth] &&
				habit.calendar[prevYear][prevMonth][prevDate] &&
				habit.calendar[prevYear][prevMonth][prevDate].done
			) {
				habit.currentStreak += 1;
			} else {
				habit.currentStreak = 1;
			}

			if (habit.currentStreak > habit.maxStreak) {
				habit.maxStreak = habit.currentStreak;
			}

			await habit.save();

			return {
				currentStreak: habit.currentStreak,
				maxStreak: habit.maxStreak,
			};
		} catch (err) {
			console.error(`Error updating streak. Error: ${err.message}`);
			throw new appError(`Error updating streak. Error: ${err}`, 401);
		}
	}
}
