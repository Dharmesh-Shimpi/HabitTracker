import Habit from '../Model/Habit/Habit.repository.js';

export default class HabitController {
	// Get habits for the current user
	static async getHabit(req, res, next) {
		try {
			const id = req.cookies.id;
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
			const id = req.cookies.id;
			const { desc, goal, category, customCategory } = req.body;

			if (!id || !desc || !goal) {
				return res
					.status(400)
					.json({ message: 'User ID, description, and goal are required' });
			}

			const newHabit = await Habit.createHabit({
				id,
				desc,
				goal,
				category,
				customCategory,
			});
			res.status(201).json({ newHabit });
		} catch (err) {
			next(err);
		}
	}

	// Update a habit for the current user
	static async updateHabit(req, res, next) {
		try {
			const id = req.cookies.id;
			const habitId = req.params.habitId;
			const { desc, goal, category, customCategory } = req.body;

			if (!id || !habitId || (!desc && !goal && !category && !customCategory)) {
				return res.status(400).json({
					message:
						'User ID, habit ID, and at least one field (description, goal, category, or customCategory) are required',
				});
			}

			const updatedHabit = await Habit.updateHabit(id, habitId, {
				desc,
				goal,
				category,
				customCategory,
			});
			if (!updatedHabit) {
				return res.status(404).json({ message: 'Habit not found' });
			}

			res.json({ updatedHabit });
		} catch (err) {
			next(err);
		}
	}

	// Delete a habit for the current user
	static async deleteHabit(req, res, next) {
		try {
			const id = req.cookies.id;
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
