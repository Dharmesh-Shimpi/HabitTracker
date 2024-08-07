import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { habitAPI as api } from '../../utils/axios';

const initialState = {
	habits: [],
	loading: false,
	error: null,
	status: false,
};

export const getHabitsThunk = createAsyncThunk(
	'habits/getHabits',
	async (id) => {
		try {
			const response = await api.get(`/${id}`);
			return response.data.habits;
		} catch (err) {
			throw new Error(err.response.data.message);
		}
	},
);

export const createHabitsThunk = createAsyncThunk(
	'habits/createHabits',
	async ({data, id}) => {
		console.log(data, id);
		try {
			const response = await api.post(`/${id}`, data);
			return response.data.newHabit;
		} catch (err) {
			throw new Error(err.response.data.message);
		}
	},
);

export const updateStreakThunk = createAsyncThunk(
	'habits/updateStreak',
	async ({ habitId, date, id }) => {
		try {
			const response = await api.patch(
				`/${id}/${habitId}/updateStreak`,
				date,
			);
			return response.data;
		} catch (err) {
			throw new Error(err.response.data.message);
		}
	},
);

const habitsSlice = createSlice({
	name: 'habits',
	initialState,
	reducers: {
		setStatus: (state, action) => {
			state.status = action.payload;
		},
	},
	extraReducers: (builder) => {
		builder
			// Get habit
			.addCase(getHabitsThunk.pending, (state) => {
				state.loading = true;
				state.error = null;
			})
			.addCase(getHabitsThunk.fulfilled, (state, action) => {
				state.loading = false;
				state.habits = action.payload;
			})
			.addCase(getHabitsThunk.rejected, (state, action) => {
				state.loading = false;
				state.error = action.error.message;
			})
			// Create habit
			.addCase(createHabitsThunk.pending, (state) => {
				state.loading = true;
				state.error = null;
			})
			.addCase(createHabitsThunk.fulfilled, (state, action) => {
				state.habits = [...state.habits, action.payload];
				state.loading = false;
				state.status = true;
			})
			.addCase(createHabitsThunk.rejected, (state, action) => {
				state.loading = false;
				state.error = action.error.message;
			})
			// Update Streak
			.addCase(updateStreakThunk.pending, (state) => {
				state.loading = true;
				state.error = null;
			})
			.addCase(updateStreakThunk.fulfilled, (state) => {
				state.loading = false;
			})
			.addCase(updateStreakThunk.rejected, (state, action) => {
				state.loading = false;
				state.error = action.error.message;
			});
	},
});

export const { setStatus } = habitsSlice.actions;

export default habitsSlice.reducer;
