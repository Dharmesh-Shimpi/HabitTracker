import Calendar from '../Calendar/Calendar.model.js';
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
	static async createCalendar(habitId) {
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
				habitId,
				date,
				day,
				month,
				year,
				value: 0,
			});

			currentDate.setDate(currentDate.getDate() + 1);
		}

		try {
			await Calendar.insertMany(calendarEntries);
		} catch (err) {
			throw new appError('Error creating Calendar', 401);
		}
	}

	static async markDateAsDone(userId, habitId, { year, month, date }) {
		try {
			const calendarEntry = await Calendar.findOneAndUpdate(
				{
					habitId,
					userId,
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

	static async getMonth(habitId, year, month) {
		try {
			const calendarEntries = await Calendar.aggregate([
				{
					$match: {
						habitId,
						month,
						year,
					},
				},
				{
					$sort: {
						date: 1,
					},
				},
			]);

			return calendarEntries;
		} catch (err) {
			throw new appError(
				`Error fetching calendar for the month. Error: ${err.message}`,
				401,
			);
		}
	}

	static async getAdjacentMonth(habitId, year, month, direction) {
		try {
			const monthIndex = months.indexOf(month);
			const newMonthIndex = direction === 'next' ? monthIndex + 1 : monthIndex - 1;

			const newYear =
				newMonthIndex > 11 ? year + 1 : newMonthIndex < 0 ? year - 1 : year;
			const newMonth = months[(newMonthIndex + 12) % 12];

			return await CalendarRepo.getMonth(habitId, newYear, newMonth);
		} catch (err) {
			throw new appError(
				`Error fetching ${direction} month calendar. Error: ${err.message}`,
				401,
			);
		}
	}
}
