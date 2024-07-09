import mongoose from 'mongoose';
const { Schema } = mongoose;

export const habitSchema = new Schema({
	name: {
		type: String,
		required: true,
	},
	weeklyGoal: {
		type: String,
		required: true,
	},
	calendar: [
		{
			type: Schema.Types.ObjectId,
			ref: 'Calendar',
		},
	],
	dailyStreak: {
		type: Number,
		default: 0,
	},
	goalStreak: {
		type: Number,
		default: 0,
	},
	monthlyStreak: {
		type: Number,
		default: 0,
	},
	createdAt: {
		type: Date,
		default: Date.now,
	},
	updatedAt: {
		type: Date,
		default: Date.now,
	},
});

export default mongoose.model('Habit', habitSchema);
