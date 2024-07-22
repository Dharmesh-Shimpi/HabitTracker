import mongoose from 'mongoose';
const { Schema } = mongoose;

const habitSchema = new Schema({
	name: {
		type: String,
		required: true,
	},

	weeklyGoal: {
		type: String,
		required: true,
	},

	currentStreak: {
		type: Number,
		default: 0,
		required: true,
	},

	maxStreak: {
		type: Number,
		default: 0,
		required: true,
	},
	user: {
		type: Schema.ObjectId,
		ref: 'Habit',
		required: true,
	},
});

export default mongoose.model('Habit', habitSchema);
