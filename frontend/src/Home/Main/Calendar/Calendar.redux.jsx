import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../../../utils/axios';

const initialState = {
	calendar: [],
	loading: false,
	error: null,
};

// export const fetchCalendarByIdThunk = createAsyncThunk(
// 	'calendar/fetchCalendarById',
// 	async ({ habitId, userId }) => {
// 		try {
// 			const response = await api.get(`/calendar/${habitId}/month`, {
// 				params: {
// 					year: new Date().getFullYear(),
// 					month: new Date().toLocaleString('default', { month: 'long' }),
// 				},
// 			});
// 			return response.data.data;
// 		} catch (err) {
// 			throw new Error(err.response.data.message);
// 		}
// 	},
// );

export const getThreeDaysThunk = createAsyncThunk(
	'calendar/getThreeDays',
	async ({ habitId }) => {
		try {
			const response = await api.get(`/calendar/${habitId}/three-days`);
			return response.data.data;
		} catch (err) {
			throw new Error(err.response.data.message);
		}
	},
);

export const getMonthThunk = createAsyncThunk(
	'calendar/getMonth',
	async ({ habitId, year, month }) => {
		try {
			const response = await api.get(`/calendar/${habitId}/month`, {
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
	async ({ habitId, year, month, direction }) => {
		try {
			const response = await api.get(`/calendar/${habitId}/month/adjacent`, {
				params: { year, month, direction },
			});
			return response.data.data;
		} catch (err) {
			throw new Error(err.response.data.message);
		}
	},
);

export const markDateAsDoneThunk = createAsyncThunk(
	'calendar/markDateAsDone',
	async ({ habitId, date }) => {
		try {
			const response = await api.patch(`/calendar/${habitId}/done`, { date });
			return response.data.data;
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
			//Get 3 days
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
			//Get month
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
			//Get another month
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
			//Marking habit
			.addCase(markDateAsDoneThunk.pending, (state) => {
				state.loading = true;
				state.error = null;
			})
			.addCase(markDateAsDoneThunk.fulfilled, (state, action) => {
				state.loading = false;
				state.calendar = state.calendar.map((entry) =>
					entry.date === action.meta.arg.date ? { ...entry, value: 1 } : entry,
				);
			})
			.addCase(markDateAsDoneThunk.rejected, (state, action) => {
				state.loading = false;
				state.error = action.error.message;
			});
	},
});

export default calendarSlice.reducer;
