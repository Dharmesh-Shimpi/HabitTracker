import Habit from './Habit.repository.js';
import CalendarRepo from '../Calendar/Calendar.repository.js';

export default class HabitController {
	// Get habits for the current user
	static async getHabit(req, res, next) {
		try {
			const id = req.params.id;
			console.log(req.params);
			if (!id) {
				return res.status(400).json({ message: 'User ID is required' });
			}

			const habits = await Habit.getHabit(id);
			res.json({ habits });
		} catch (err) {
			next(err);
		}
	}

	// Create a new habit for the current user
	static async createHabit(req, res, next) {
		try {
			const id = req.params.id;
			console.log(id);
			const { name, weeklyGoal } = req.body;

			if (!id || !weeklyGoal || !name) {
				return res
					.status(400)
					.json({ message: 'User ID, name, and weekly goal are required' });
			}

			const newHabit = await Habit.createHabit({
				user: id,
				name,
				weeklyGoal,
			});
			await CalendarRepo.createCalendar(id, newHabit._id);
			res.status(201).json({ newHabit });
		} catch (err) {
			next(err);
		}
	}

	// Delete a habit for the current user
	static async deleteHabit(req, res, next) {
		try {
			const id = req.params.id;
			const habitId = req.params.habitId;

			if (!id || !habitId) {
				return res
					.status(400)
					.json({ message: 'User ID and habit ID are required' });
			}

			const result = await Habit.deleteHabit(id, habitId);
			if (!result) {
				return res.status(404).json({ message: 'Habit not found' });
			}

			res.json({ message: 'Habit deleted successfully' });
		} catch (err) {
			next(err);
		}
	}
}
