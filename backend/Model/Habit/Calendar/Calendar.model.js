import mongoose from 'mongoose';
const { Schema } = mongoose;

export const calendarSchema = new Schema({
	year: {
		type: Number,
		required: true,
	},
	month: {
		type: String,
		required: true,
	},
	day: {
		type: Number,
		required: true,
	},
	date: {
		type: Number,
		required: true,
	},
	last: {
		type: String,
		required: true,
	},
	done: {
		type: Boolean,
		default: false, 
	},
	user: {
		type: Schema.Types.ObjectId,
		ref: 'User',
		required: true, 
	},
});

export default mongoose.model('Calendar', calendarSchema);
