import mongoose from 'mongoose';

const CalendarSchema = new mongoose.Schema({
	userId: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'User',
		required: true,
	},
	habitId: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'Habit',
		required: true,
	},
	date: {
		type: Date,
		required: true,
	},
	day: {
		type: String,
		required: true,
	},
	month: {
		type: String,
		required: true,
    },
    year: {
        type: Number,
        required: true,
    },
	value: {
		type: Number,
		required: true,
		enum: [1, -1, 0],
	},
});

export default mongoose.model('Calendar', CalendarSchema);
