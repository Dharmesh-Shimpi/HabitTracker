import mongoose from 'mongoose';

const CalendarSchema = new mongoose.Schema({
	habitId: {
		type: mongoose.Schema.ObjectId,
		ref: 'Habit',
		required: true,
	},
	date: {
		type: Number,
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
