import CalendarRepo from '../Model/Habit/Calendar/Calendar.repository.js';

export default class CalendarController {
	// Get current month's calendar entries for the user
	static async getCalendar(req, res, next) {
		try {
			const userId = req.cookies.id;
			if (!userId) {
				return res.status(400).json({ message: 'User ID is required' });
			}

			const { calendar, month, year } = await CalendarRepo.getCalendar(userId);
			res.json({ calendar, month, year });
		} catch (err) {
			next(err);
		}
	}

	// Get next month's calendar entries for the user
	static async getNextCalendar(req, res, next) {
		try {
			const userId = req.cookies.id;
			const { month, year } = req.params;

			if (!userId || !month || !year) {
				return res
					.status(400)
					.json({ message: 'User ID, month, and year are required' });
			}

			const {
				calendar,
				month: nextMonth,
				year: nextYear,
			} = await CalendarRepo.getNextCalendar(userId, month, year);
			res.json({ calendar, month: nextMonth, year: nextYear });
		} catch (err) {
			next(err);
		}
	}

	// Get previous month's calendar entries for the user
	static async getPrevCalendar(req, res, next) {
		try {
			const userId = req.cookies.id;
			const { month, year } = req.params;

			if (!userId || !month || !year) {
				return res
					.status(400)
					.json({ message: 'User ID, month, and year are required' });
			}

			const {
				calendar,
				month: prevMonth,
				year: prevYear,
			} = await CalendarRepo.getPrevCalendar(userId, month, year);
			res.json({ calendar, month: prevMonth, year: prevYear });
		} catch (err) {
			next(err);
		}
	}

	// Mark a specific date as done for the user
	static async markDateAsDone(req, res, next) {
		try {
			const userId = req.cookies.id;
			const { year, month, date } = req.body;

			if (!userId || !year || !month || !date) {
				return res
					.status(400)
					.json({ message: 'User ID, year, month, and date are required' });
			}

			const result = await CalendarRepo.markDateAsDone(userId, {
				year,
				month,
				date,
			});
			res.json(result);
		} catch (err) {
			next(err);
		}
	}

	// Initialize a new calendar for the user
	static async createCalendar(req, res, next) {
		try {
			const userId = req.cookies.id;

			if (!userId) {
				return res.status(400).json({ message: 'User ID is required' });
			}

			const calendarEntries = await CalendarRepo.createCalendar(userId);
			res.status(201).json({ calendarEntries });
		} catch (err) {
			next(err);
		}
	}
}
