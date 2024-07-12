import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../utils/axios';

const initialState = {
	habits: [],
	loading: false,
	error: null,
	status: false,
};

export const getHabitsThunk = createAsyncThunk('habits/getHabits', async () => {
	try {
		const response = await api.get('/habits');
		return response.data.habits;
	} catch (err) {
		throw new Error(err.response.data.message);
	}
});

export const createHabitsThunk = createAsyncThunk(
	'habits/createHabits',
	async (data, { dispatch }) => {
		try {
			const response = await api.post('/habits', data);
			dispatch(getHabitsThunk()); // Refresh the list of habits
			return response.data.newHabit;
		} catch (err) {
			throw new Error(err.response.data.message);
		}
	},
);

export const markDateAsDoneThunk = createAsyncThunk(
	'habits/markDateAsDone',
	async ({ habitId, date }, { dispatch }) => {
		try {
			const response = await api.patch(`/habits/${habitId}/markDateAsDone`, date);
			dispatch(getHabitsThunk()); // Refresh the list of habits
			return response.data;
		} catch (err) {
			throw new Error(err.response.data.message);
		}
	},
);

export const updateStreakThunk = createAsyncThunk(
	'habits/updateStreak',
	async ({ habitId, date }, { dispatch }) => {
		try {
			const response = await api.patch(`/habits/${habitId}/updateStreak`, date);
			dispatch(getHabitsThunk()); // Refresh the list of habits
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
			.addCase(createHabitsThunk.pending, (state) => {
				state.loading = true;
				state.error = null;
			})
			.addCase(createHabitsThunk.fulfilled, (state, action) => {
				state.loading = false;
				state.status = true;
			})
			.addCase(createHabitsThunk.rejected, (state, action) => {
				state.loading = false;
				state.error = action.error.message;
			})
			.addCase(markDateAsDoneThunk.pending, (state) => {
				state.loading = true;
				state.error = null;
			})
			.addCase(markDateAsDoneThunk.fulfilled, (state) => {
				state.loading = false;
			})
			.addCase(markDateAsDoneThunk.rejected, (state, action) => {
				state.loading = false;
				state.error = action.error.message;
			})
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
