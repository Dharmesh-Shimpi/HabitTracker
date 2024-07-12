import CalendarRepo from '../Model/Habit/Calendar.repository.js';
import appError from '../Middleware/errors.js';

export default class CalendarController {
	// Create a new calendar for a specific user and habit
	static async createCalendar(req, res, next) {
		const { userId, habitId } = req.body;

		if (!userId || !habitId) {
			return next(new appError('User ID and Habit ID are required', 400));
		}

		try {
			const calendarEntries = await CalendarRepo.createCalendar(userId, habitId);
			res.status(201).json({
				status: 'success',
				data: {
					calendarEntries,
				},
			});
		} catch (err) {
			next(err);
		}
	}

	// Mark a specific date as done for a habit
	static async markDateAsDone(req, res, next) {
		const { habitId } = req.params;
		const { year, month, date } = req.body;

		if (!habitId || !year || !month || !date) {
			return next(
				new appError('Habit ID, year, month, and date are required', 400),
			);
		}

		try {
			const calendarEntry = await CalendarRepo.markDateAsDone(habitId, {
				year,
				month,
				date,
			});
			res.status(200).json({
				status: 'success',
				data: {
					calendarEntry,
				},
			});
		} catch (err) {
			next(err);
		}
	}

	// Update the streak for a habit based on a specific date
	static async updateStreak(req, res, next) {
		const { habitId } = req.params;
		const { year, month, date } = req.body;

		if (!habitId || !year || !month || !date) {
			return next(
				new appError('Habit ID, year, month, and date are required', 400),
			);
		}

		try {
			const streakInfo = await CalendarRepo.updateStreak(habitId, {
				year,
				month,
				date,
			});
			res.status(200).json({
				status: 'success',
				data: streakInfo,
			});
		} catch (err) {
			next(err);
		}
	}

	// Get entries for yesterday, today, and tomorrow
	static async getThreeDays(req, res, next) {
		const { habitId, userId } = req.params;

		if (!habitId || !userId) {
			return next(new appError('Habit ID and User ID are required', 400));
		}

		try {
			const threeDays = await CalendarRepo.getThreeDays(habitId, userId);
			res.status(200).json({
				status: 'success',
				data: threeDays,
			});
		} catch (err) {
			next(err);
		}
	}

	// Get calendar entries for a specific month and year
	static async getMonth(req, res, next) {
		const { habitId, userId } = req.params;
		const { year, month } = req.query;

		if (!habitId || !userId || !year || !month) {
			return next(
				new appError('Habit ID, User ID, year, and month are required', 400),
			);
		}

		try {
			const monthEntries = await CalendarRepo.getMonth(
				userId,
				habitId,
				year,
				month,
			);
			res.status(200).json({
				status: 'success',
				data: monthEntries,
			});
		} catch (err) {
			next(err);
		}
	}

	// Get the previous or next month’s calendar entries
	static async getAdjacentMonth(req, res, next) {
		const { habitId, userId } = req.params;
		const { year, month, direction } = req.query;

		if (!habitId || !userId || !year || !month || !direction) {
			return next(
				new appError(
					'Habit ID, User ID, year, month, and direction are required',
					400,
				),
			);
		}

		if (!['prev', 'next'].includes(direction)) {
			return next(new appError('Direction must be either "prev" or "next"', 400));
		}

		try {
			const monthEntries = await CalendarRepo.getAdjacentMonth(
				userId,
				habitId,
				year,
				month,
				direction,
			);
			res.status(200).json({
				status: 'success',
				data: monthEntries,
			});
		} catch (err) {
			next(err);
		}
	}
}
