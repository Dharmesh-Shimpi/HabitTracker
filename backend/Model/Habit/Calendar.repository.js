import Calendar from './Calendar.model.js';
import Habit from './Habit.model.js';
import appError from '../../Middleware/errors.js';

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
	static async createCalendar(userId, habitId) {
		const today = new Date();
		const oneYearFromNow = new Date(today);
		oneYearFromNow.setFullYear(today.getFullYear() + 1);

		let currentDate = new Date(today);
		const calendarEntries = [];

		while (currentDate < oneYearFromNow) {
			const year = currentDate.getFullYear();
			const month = months[currentDate.getMonth()];
			const date = currentDate.getDate();
			const day = days[currentDate.getDay()];

			calendarEntries.push({
				userId,
				habitId,
				date: currentDate,
				day,
				month,
				year,
				value: 0,
			});

			currentDate.setDate(currentDate.getDate() + 1);
		}

		try {
			return await Calendar.insertMany(calendarEntries);
		} catch (err) {
			throw new appError('Error creating Calendar', 401);
		}
	}

	static async markDateAsDone(habitId, { year, month, date }) {
		try {
			const calendarEntry = await Calendar.findOneAndUpdate(
				{
					habitId,
					userId: userId,
					date: new Date(year, months.indexOf(month), date),
				},
				{ value: 1 },
				{ new: true },
			);

			if (!calendarEntry) {
				throw new appError(
					`No calendar entry found for ${month} ${date}, ${year}`,
					404,
				);
			}

			return calendarEntry;
		} catch (err) {
			throw new appError(`Error marking date as done. Error: ${err.message}`, 401);
		}
	}

	static async updateStreak(habitId, { year, month, date }) {
		try {
			const habit = await Habit.findById(habitId);

			if (!habit) {
				throw new appError(`No habit found with ID ${habitId}`, 404);
			}

			const currentDate = new Date(year, months.indexOf(month), date);
			const previousDate = new Date(currentDate);
			previousDate.setDate(currentDate.getDate() - 1);

			const prevYear = previousDate.getFullYear();
			const prevMonth = months[previousDate.getMonth()];
			const prevDate = previousDate.getDate();

			const prevEntry = await Calendar.findOne({
				habitId,
				date: new Date(prevYear, months.indexOf(prevMonth), prevDate),
			});

			if (prevEntry && prevEntry.value === 1) {
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
			throw new appError(`Error updating streak. Error: ${err.message}`, 401);
		}
	}

	// Get yesterday, today, and tomorrow entries
	static async getThreeDays(habitId, userId) {
		const today = new Date();
		const yesterday = new Date(today);
		yesterday.setDate(today.getDate() - 1);
		const tomorrow = new Date(today);
		tomorrow.setDate(today.getDate() + 1);

		try {
			const [yesterdayEntry, todayEntry, tomorrowEntry] = await Promise.all([
				Calendar.findOne({ habitId, userId, date: yesterday }),
				Calendar.findOne({ habitId, userId, date: today }),
				Calendar.findOne({ habitId, userId, date: tomorrow }),
			]);

			return {
				yesterday: yesterdayEntry || { date: yesterday, value: 0 },
				today: todayEntry || { date: today, value: 0 },
				tomorrow: tomorrowEntry || { date: tomorrow, value: 0 },
			};
		} catch (err) {
			throw new appError(
				`Error fetching three days of calendar. Error: ${err.message}`,
				401,
			);
		}
	}

	// Get calendar for a specific month and year
	static async getMonth(userId, habitId, year, month) {
		try {
			const startOfMonth = new Date(year, months.indexOf(month), 1);
			const endOfMonth = new Date(year, months.indexOf(month) + 1, 0);

			const calendarEntries = await Calendar.find({
				habitId,
				userId,
				date: { $gte: startOfMonth, $lte: endOfMonth },
			}).sort({ date: 1 });

			return calendarEntries;
		} catch (err) {
			throw new appError(
				`Error fetching calendar for the month. Error: ${err.message}`,
				401,
			);
		}
	}

	// Get calendar for the previous or next month
	static async getAdjacentMonth(userId, habitId, year, month, direction) {
		try {
			const monthIndex = months.indexOf(month);
			const newMonthIndex = direction === 'next' ? monthIndex + 1 : monthIndex - 1;

			const newYear =
				newMonthIndex > 11 ? year + 1 : newMonthIndex < 0 ? year - 1 : year;
			const newMonth = months[(newMonthIndex + 12) % 12];

			return await CalendarRepo.getMonth(userId, habitId, newYear, newMonth);
		} catch (err) {
			throw new appError(
				`Error fetching ${direction} month calendar. Error: ${err.message}`,
				401,
			);
		}
	}

	// Get calendar entry for a specific date
	static async getDateEntry(userId, habitId, year, month, date) {
		try {
			return await Calendar.findOne({
				habitId,
				userId,
				date: new Date(year, months.indexOf(month), date),
			});
		} catch (err) {
			throw new appError(`Error fetching date entry. Error: ${err.message}`, 401);
		}
	}
}
