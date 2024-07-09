import Habit from './Habit.model.js';
import User from '../User/User.model.js';
import appError from '../../Middleware/errors.js';
import Calendar from './Calendar/Calendar.model.js';

export default class HabitRepo {
	// Create Habit with associated calendar
	static async createHabit({ id, desc, goal }) {
		try {
			const user = await User.findOne({ _id: id }).populate('habits');
			if (!user) {
				throw new appError(`User not found`, 404);
			}

			const calendarEntries = await CalendarService.createCalendar();
			const calendarIds = calendarEntries.map((entry) => entry._id);

			const newHabit = new Habit({
				name: desc,
				weeklyGoal: Number(goal),
				calendar: calendarIds,
			});

			await newHabit.save();
			user.habits.push(newHabit._id);
			await user.save();
			return user.habits;
		} catch (err) {
			console.error(`Error creating habit. Error: ${err.message}`);
			throw new appError(`Error creating habit. Error: ${err}`, 401);
		}
	}

	// Delete a habit
	static async deleteHabit(userId, habitId) {
		try {
			const user = await User.findOne({ _id: userId }).populate('habits');
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

			// Remove habit from user's habits
			user.habits.splice(habitIndex, 1);
			await user.save();

			// Delete the habit
			await habit.remove();

			return user.habits;
		} catch (err) {
			console.error(`Error deleting habit. Error: ${err.message}`);
			throw new appError(`Error deleting habit. Error: ${err}`, 401);
		}
	}

	// Update a habit
	static async updateHabit(userId, habitId, { desc, goal }) {
		try {
			const user = await User.findOne({ _id: userId }).populate('habits');
			if (!user) {
				throw new appError(`User not found`, 404);
			}

			const habit = await Habit.findById(habitId);
			if (!habit) {
				throw new appError(`Habit not found`, 404);
			}

			// Update habit details
			if (desc) habit.name = desc;
			if (goal) habit.weeklyGoal = Number(goal);

			await habit.save();

			return habit;
		} catch (err) {
			console.error(`Error updating habit. Error: ${err.message}`);
			throw new appError(`Error updating habit. Error: ${err}`, 401);
		}
	}
}
