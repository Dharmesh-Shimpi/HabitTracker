import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// Async actions for calendar
export const fetchCalendar = createAsyncThunk(
	'calendar/fetchCalendar',
	async (_, { rejectWithValue }) => {
		try {
			const response = await axios.get('/calendar');
			return response.data;
		} catch (err) {
			return rejectWithValue(err.response.data);
		}
	},
);

export const fetchNextCalendar = createAsyncThunk(
	'calendar/fetchNextCalendar',
	async ({ month, year }, { rejectWithValue }) => {
		try {
			const response = await axios.get(`/calendar/next/${month}/${year}`);
			return response.data;
		} catch (err) {
			return rejectWithValue(err.response.data);
		}
	},
);

export const fetchPrevCalendar = createAsyncThunk(
	'calendar/fetchPrevCalendar',
	async ({ month, year }, { rejectWithValue }) => {
		try {
			const response = await axios.get(`/calendar/prev/${month}/${year}`);
			return response.data;
		} catch (err) {
			return rejectWithValue(err.response.data);
		}
	},
);

export const markDateAsDone = createAsyncThunk(
	'calendar/markDateAsDone',
	async (dateData, { rejectWithValue }) => {
		try {
			const response = await axios.post('/calendar/done', dateData);
			return response.data;
		} catch (err) {
			return rejectWithValue(err.response.data);
		}
	},
);

const calendarSlice = createSlice({
	name: 'calendar',
	initialState: {
		calendar: [],
		month: '',
		year: '',
		status: 'idle',
		error: null,
	},
	reducers: {},
	extraReducers: (builder) => {
		builder
			.addCase(fetchCalendar.pending, (state) => {
				state.status = 'loading';
			})
			.addCase(fetchCalendar.fulfilled, (state, action) => {
				state.status = 'succeeded';
				state.calendar = action.payload.calendar;
				state.month = action.payload.month;
				state.year = action.payload.year;
			})
			.addCase(fetchCalendar.rejected, (state, action) => {
				state.status = 'failed';
				state.error = action.payload;
			})
			.addCase(fetchNextCalendar.pending, (state) => {
				state.status = 'loading';
			})
			.addCase(fetchNextCalendar.fulfilled, (state, action) => {
				state.status = 'succeeded';
				state.calendar = action.payload.calendar;
				state.month = action.payload.month;
				state.year = action.payload.year;
			})
			.addCase(fetchNextCalendar.rejected, (state, action) => {
				state.status = 'failed';
				state.error = action.payload;
			})
			.addCase(fetchPrevCalendar.pending, (state) => {
				state.status = 'loading';
			})
			.addCase(fetchPrevCalendar.fulfilled, (state, action) => {
				state.status = 'succeeded';
				state.calendar = action.payload.calendar;
				state.month = action.payload.month;
				state.year = action.payload.year;
			})
			.addCase(fetchPrevCalendar.rejected, (state, action) => {
				state.status = 'failed';
				state.error = action.payload;
			})
			.addCase(markDateAsDone.pending, (state) => {
				state.status = 'loading';
			})
			.addCase(markDateAsDone.fulfilled, (state, action) => {
				state.status = 'succeeded';
				const updatedDate = action.payload;
				state.calendar = state.calendar.map((date) =>
					date._id === updatedDate._id ? updatedDate : date,
				);
			})
			.addCase(markDateAsDone.rejected, (state, action) => {
				state.status = 'failed';
				state.error = action.payload;
			});
	},
});

export default calendarSlice.reducer;
