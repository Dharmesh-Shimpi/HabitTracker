import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../utils/axios';

const initialState = {
	calendar: [],
	loading: false,
	error: null,
};

export const fetchCalendarByIdThunk = createAsyncThunk(
	'calendar/fetchCalendarById',
	async ({ habitId, userId }) => {
		try {
			const response = await api.get(`/calendar/${habitId}/${userId}/month`, {
				params: {
					year: new Date().getFullYear(),
					month: new Date().toLocaleString('default', { month: 'long' }),
				},
			});
			return response.data.data;
		} catch (err) {
			throw new Error(err.response.data.message);
		}
	},
);

export const getThreeDaysThunk = createAsyncThunk(
	'calendar/getThreeDays',
	async ({ habitId, userId }) => {
		try {
			const response = await api.get(`/calendar/${habitId}/${userId}/three-days`);
			return response.data.data;
		} catch (err) {
			throw new Error(err.response.data.message);
		}
	},
);

export const getMonthThunk = createAsyncThunk(
	'calendar/getMonth',
	async ({ habitId, userId, year, month }) => {
		try {
			const response = await api.get(`/calendar/${habitId}/${userId}/month`, {
				params: { year, month },
			});
			return response.data.data;
		} catch (err) {
			throw new Error(err.response.data.message);
		}
	},
);

export const getAdjacentMonthThunk = createAsyncThunk(
	'calendar/getAdjacentMonth',
	async ({ habitId, userId, year, month, direction }) => {
		try {
			const response = await api.get(
				`/calendar/${habitId}/${userId}/month/adjacent`,
				{
					params: { year, month, direction },
				},
			);
			return response.data.data;
		} catch (err) {
			throw new Error(err.response.data.message);
		}
	},
);

export const getDateEntryThunk = createAsyncThunk(
	'calendar/getDateEntry',
	async ({ habitId, userId, year, month, date }) => {
		try {
			const response = await api.get(`/calendar/${habitId}/${userId}/date`, {
				params: { year, month, date },
			});
			return response.data.data;
		} catch (err) {
			throw new Error(err.response.data.message);
		}
	},
);

export const createCalendarThunk = createAsyncThunk(
	'calendar/createCalendar',
	async ({ userId, habitId }) => {
		try {
			const response = await api.post('/calendar', { userId, habitId });
			return response.data.data.calendarEntries;
		} catch (err) {
			throw new Error(err.response.data.message);
		}
	},
);

export const markDateAsDoneThunk = createAsyncThunk(
	'calendar/markDateAsDone',
	async ({ habitId, date }) => {
		try {
			const response = await api.patch(`/calendar/${habitId}/done`, date);
			return response.data.data.calendarEntry;
		} catch (err) {
			throw new Error(err.response.data.message);
		}
	},
);

export const updateStreakThunk = createAsyncThunk(
	'calendar/updateStreak',
	async ({ habitId, date }) => {
		try {
			const response = await api.patch(`/calendar/${habitId}/streak`, date);
			return response.data.data.streakInfo;
		} catch (err) {
			throw new Error(err.response.data.message);
		}
	},
);

const calendarSlice = createSlice({
	name: 'calendar',
	initialState,
	reducers: {},
	extraReducers: (builder) => {
		builder
			.addCase(fetchCalendarByIdThunk.pending, (state) => {
				state.loading = true;
				state.error = null;
			})
			.addCase(fetchCalendarByIdThunk.fulfilled, (state, action) => {
				state.loading = false;
				state.calendar = action.payload;
			})
			.addCase(fetchCalendarByIdThunk.rejected, (state, action) => {
				state.loading = false;
				state.error = action.error.message;
			})
			.addCase(getThreeDaysThunk.pending, (state) => {
				state.loading = true;
				state.error = null;
			})
			.addCase(getThreeDaysThunk.fulfilled, (state, action) => {
				state.loading = false;
				state.calendar = action.payload;
			})
			.addCase(getThreeDaysThunk.rejected, (state, action) => {
				state.loading = false;
				state.error = action.error.message;
			})
			.addCase(getMonthThunk.pending, (state) => {
				state.loading = true;
				state.error = null;
			})
			.addCase(getMonthThunk.fulfilled, (state, action) => {
				state.loading = false;
				state.calendar = action.payload;
			})
			.addCase(getMonthThunk.rejected, (state, action) => {
				state.loading = false;
				state.error = action.error.message;
			})
			.addCase(getAdjacentMonthThunk.pending, (state) => {
				state.loading = true;
				state.error = null;
			})
			.addCase(getAdjacentMonthThunk.fulfilled, (state, action) => {
				state.loading = false;
				state.calendar = action.payload;
			})
			.addCase(getAdjacentMonthThunk.rejected, (state, action) => {
				state.loading = false;
				state.error = action.error.message;
			})
			.addCase(getDateEntryThunk.pending, (state) => {
				state.loading = true;
				state.error = null;
			})
			.addCase(getDateEntryThunk.fulfilled, (state, action) => {
				state.loading = false;
				// Update calendar with the new date entry
			})
			.addCase(getDateEntryThunk.rejected, (state, action) => {
				state.loading = false;
				state.error = action.error.message;
			})
			.addCase(createCalendarThunk.pending, (state) => {
				state.loading = true;
				state.error = null;
			})
			.addCase(createCalendarThunk.fulfilled, (state, action) => {
				state.loading = false;
				state.calendar = action.payload;
			})
			.addCase(createCalendarThunk.rejected, (state, action) => {
				state.loading = false;
				state.error = action.error.message;
			})
			.addCase(markDateAsDoneThunk.pending, (state) => {
				state.loading = true;
				state.error = null;
			})
			.addCase(markDateAsDoneThunk.fulfilled, (state, action) => {
				state.loading = false;
				// Update calendar with the new date entry
			})
			.addCase(markDateAsDoneThunk.rejected, (state, action) => {
				state.loading = false;
				state.error = action.error.message;
			})
			.addCase(updateStreakThunk.pending, (state) => {
				state.loading = true;
				state.error = null;
			})
			.addCase(updateStreakThunk.fulfilled, (state, action) => {
				state.loading = false;
				// Update calendar with new streak info
			})
			.addCase(updateStreakThunk.rejected, (state, action) => {
				state.loading = false;
				state.error = action.error.message;
			});
	},
});

export default calendarSlice.reducer;
