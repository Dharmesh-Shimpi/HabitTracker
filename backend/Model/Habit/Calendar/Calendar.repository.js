import appError from '../../../Middleware/errors.js';
import Calendar from './Calendar.model.js';

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

export default class CalendarRepo{
	static async createCalendar(userId) {
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

			const calendarEntry = {
				year,
				month,
				day,
				date,
				last: months[(currentDate.getMonth() - 1 + 12) % 12],
				done: false, 
				user: userId, 
			};
			calendar.push(calendarEntry);

			currentDate.setDate(currentDate.getDate() + 1);
		}

		try {
			return await Calendar.insertMany(calendar);
		} catch (err) {
			throw new appError('Error creating Calendar', 401);
		}
	}

	static async getCalendar(userId) {
		try {
			const currentDate = new Date();
			const month = months[currentDate.getMonth()];
			const year = currentDate.getFullYear();

			const calendar = await Calendar.find({ year, month, user: userId }).sort({
				date: 1,
			});
			if (!calendar.length) {
				throw new appError(`No calendar entries found for ${month} ${year}`, 404);
			}
			return { calendar, month, year };
		} catch (err) {
			console.error(`Error getting calendar. Error: ${err.message}`);
			throw new appError(`Error getting calendar. Error: ${err}`, 401);
		}
	}

	static async getNextCalendar(userId, month, year) {
		try {
			const currentMonthIndex = months.indexOf(month);
			let nextMonthIndex = (currentMonthIndex + 1) % 12;
			let nextYear = year;

			if (nextMonthIndex === 0) {
				nextYear += 1;
			}

			const nextMonth = months[nextMonthIndex];
			const calendar = await Calendar.find({
				year: nextYear,
				month: nextMonth,
				user: userId,
			}).sort({ date: 1 });

			if (!calendar.length) {
				throw new appError(
					`No calendar entries found for ${nextMonth} ${nextYear}`,
					404,
				);
			}
			return { calendar, month: nextMonth, year: nextYear };
		} catch (err) {
			console.error(`Error getting calendar. Error: ${err.message}`);
			throw new appError(`Error getting calendar. Error: ${err}`, 401);
		}
	}

	
	static async getPrevCalendar(userId, month, year) {
		try {
			const currentMonthIndex = months.indexOf(month);
			let prevMonthIndex = (currentMonthIndex - 1 + 12) % 12;
			let prevYear = year;

			if (prevMonthIndex === 11) {
				prevYear -= 1;
			}

			const prevMonth = months[prevMonthIndex];
			const calendar = await Calendar.find({
				year: prevYear,
				month: prevMonth,
				user: userId,
			}).sort({ date: 1 });

			if (!calendar.length) {
				throw new appError(
					`No calendar entries found for ${prevMonth} ${prevYear}`,
					404,
				);
			}
			return { calendar, month: prevMonth, year: prevYear };
		} catch (err) {
			console.error(`Error getting calendar. Error: ${err.message}`);
			throw new appError(`Error getting calendar. Error: ${err}`, 401);
		}
	}

	static async markDateAsDone(userId, { year, month, date }) {
		try {
			const result = await Calendar.findOneAndUpdate(
				{ year, month, date, user: userId },
				{ done: true },
				{ new: true }, 
			);

			if (!result) {
				throw new appError(
					`No calendar entry found for ${month} ${date}, ${year}`,
					404,
				);
			}

			return result;
		} catch (err) {
			console.error(`Error marking date as done. Error: ${err.message}`);
			throw new appError(`Error marking date as done. Error: ${err}`, 401);
		}
	}
}
