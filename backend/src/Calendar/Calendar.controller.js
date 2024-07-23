import CalendarRepo from './Calendar.repository.js';
import appError from '../../Middleware/errors.js';

export default class CalendarController {
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

	// Get calendar entries for a specific month and year
	static async getMonth(req, res, next) {
		try {
			const { habitId } = req.params;
			if (!habitId) {
				return next(
					new appError('Habit ID, User ID, year, and month are required', 400),
				);
			}

			const data = await CalendarRepo.getMonth(habitId);
			res.status(200).json(data);
		} catch (err) {
			next(err);
		}
	}

	// Get the previous or next month’s calendar entries
	static async getAdjacentMonth(req, res, next) {
		const { habitId } = req.params;
		const { year, month, direction } = req.body;

		if (!habitId || !year || !month || !direction) {
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
			const data = await CalendarRepo.getAdjacentMonth(
				habitId,
				year,
				month,
				direction,
			);
			res.status(200).json(data);
		} catch (err) {
			next(err);
		}
	}
}
