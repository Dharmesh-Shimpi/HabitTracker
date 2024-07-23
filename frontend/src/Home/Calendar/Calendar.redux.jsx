import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { calendarAPI as api } from '../../utils/axios';

const initialState = {
	calendar: [],
	loading: false,
	error: null,
	success: false
};

export const getMonthThunk = createAsyncThunk(
	'calendar/getMonth',
	async ({ habitId }) => {
		try {
			const response = await api.get(`/${habitId}`);
			// console.log(response.data);
			return response.data;
		} catch (err) {
			throw new Error(err.response.data.message);
		}
	},
);

export const getAdjacentMonthThunk = createAsyncThunk(
	'calendar/getAdjacentMonth',
	async ({ habitId, direction, year, month }) => {
		try {
			const response = await api.patch(`/${habitId}`, {
				direction,
				year,
				month,
			});
			return response.data;
		} catch (err) {
			throw new Error(err.response.data.message);
		}
	},
);

export const markDateAsDoneThunk = createAsyncThunk(
	'calendar/markDateAsDone',
	async ({ habitId, date }) => {
		try {
			const response = await api.patch(`/${habitId}`, { value });
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
			//Get month
			.addCase(getMonthThunk.pending, (state) => {
				state.loading = true;
				state.error = null;
				
			})
			.addCase(getMonthThunk.fulfilled, (state, action) => {
				state.loading = false;
				state.calendar = action.payload;
				state.success = true;
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
				state.success = true;
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
				state.success = true;
			})
			.addCase(markDateAsDoneThunk.rejected, (state, action) => {
				state.loading = false;
				state.error = action.error.message;
			});
	},
});

export default calendarSlice.reducer;
