import Habit from './Habit.model.js';
import User from '../Users/User.model.js';
import appError from 'Middleware/errors.js';
import CalendarRepo from './Calendar.repository.js';

export default class HabitRepo {
	// get habits
	static async getHabit(id) {
		try {
			const user = await User.findById({ _id: id }).populate('habits');
			if (!user) {
				throw new appError(`User not found`, 404);
			}
			return user.habits;
		} catch (err) {
			throw new appError(`Error getting habit. Error: ${err.message}`, 401);
		}
	}
	// Create Habit with associated calendar
	static async createHabit({ userId, name, weeklyGoal }) {
		try {
			const user = await User.findById(userId).populate('habits');
			if (!user) {
				throw new appError(`User not found`, 404);
			}

			const newHabit = new Habit({
				name,
				weeklyGoal,
			});

			const savedHabit = await newHabit.save();
			user.habits.push(savedHabit._id);
			await user.save();

			const calendarEntries = await CalendarRepo.createCalendar(
				userId,
				savedHabit._id,
			);
			savedHabit.calendar = calendarEntries.map((entry) => entry._id);
			await savedHabit.save();

			return user.habits;
		} catch (err) {
			throw new appError(`Error creating habit. Error: ${err.message}`, 401);
		}
	}

	// Delete a habit
	static async deleteHabit(userId, habitId) {
		try {
			const user = await User.findById(userId).populate('habits');
			if (!user) {
				throw new appError(`User not found`, 404);
			}

			const habitIndex = user.habits.findIndex(
				(habit) => habit._id.toString() === habitId,
			);
			if (habitIndex === -1) {
				throw new appError(`Habit not found`, 404);
			}

			const habit = await Habit.findById(habitId);
			if (!habit) {
				throw new appError(`Habit not found`, 404);
			}

			user.habits.splice(habitIndex, 1);
			await user.save();

			await CalendarRepo.deleteMany({ habitId });
			await habit.remove();

			return user.habits;
		} catch (err) {
			throw new appError(`Error deleting habit. Error: ${err.message}`, 401);
		}
	}

	// Update a habit
	static async updateHabit(userId, habitId, { name, weeklyGoal }) {
		try {
			const user = await User.findById(userId).populate('habits');
			if (!user) {
				throw new appError(`User not found`, 404);
			}

			const habit = await Habit.findById(habitId);
			if (!habit) {
				throw new appError(`Habit not found`, 404);
			}

			// Update habit details
			if (name) habit.name = name;
			if (weeklyGoal) habit.weeklyGoal = weeklyGoal;

			await habit.save();

			return habit;
		} catch (err) {
			throw new appError(`Error updating habit. Error: ${err.message}`, 401);
		}
	}
}
