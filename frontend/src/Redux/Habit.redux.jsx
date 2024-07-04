import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../../utils/axios';

const initialState = {
	name: '',
	email: '',
	habits: [
		{ id: '1', habit: 'running' },
		{ id: 2, habit: 'meeting' },
	],
	loading: false,
	error: null,
};

export const getHabitsThunk = createAsyncThunk('getHabits', async () => {
	const { data } = await api.get('/habits');
	return data;
});

export const createHabitsThunk = createAsyncThunk('createHabits', async () => {
	const { data } = await api.post('/habits');
	return data;
});

const habitsSlice = createSlice({
	name: 'habits',
	initialState,
	reducers: {},
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
			.addCase(getHabitsThunk.fulfilled, (state, action) => {
				state.loading = false;
				state.habits = [...action.payload];
			})
			.addCase(getHabitsThunk.rejected, (state, action) => {
				state.loading = false;
				state.error = action.error.message;
			});
	},
});

export default habitsSlice.reducer;
