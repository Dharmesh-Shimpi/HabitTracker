import Habit from './Habit.model.js';
import User from '../Users/User.model.js';
import appError from '../../Middleware/errors.js';
import CalendarRepo from '../Calendar/Calendar.repository.js';
import HabitModel from './Habit.model.js';

export default class HabitRepo {
	// get habits
	static async getHabit(id) {
		try {
			const habits = await HabitModel.find({user: id});
			if (!habits) {
				throw new appError('User not found', 404);
			}

			console.log(habits); // Log the habits array to verify
			return habits;
		} catch (err) {
			throw new appError(`Error getting habit. Error: ${err.message}`, 401);
		}
	}

	// Create Habit with associated calendar
	static async createHabit({ user, name, weeklyGoal }) {
		try {
			const newHabit = new Habit({
				name,
				weeklyGoal,
				user,
			});

			await newHabit.save();
			await CalendarRepo.createCalendar(newHabit._id);
			return newHabit;
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
}
