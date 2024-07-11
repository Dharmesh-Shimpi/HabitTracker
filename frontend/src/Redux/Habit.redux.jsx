import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../utils/axios';

const initialState = {
	habits: [],
	loading: false,
	error: null,
	status: false,
};

export const getHabitsThunk = createAsyncThunk('getHabits', async () => {
	try {
		const response = await api.get('/habits');
		console.log(response.data.habits);
		return response.data.habits;
	} catch (err) {
		return err.response.data;
	}
});

export const createHabitsThunk = createAsyncThunk(
	'createHabits',
	async (data, { dispatch }) => {
		try {
			const response = await api.post('/habits', data);
			dispatch(getHabitsThunk()); 
			return response.data;
		} catch (err) {
			return err.response.data;
		}
	},
);

const habitsSlice = createSlice({
	name: 'habits',
	initialState,
	reducers: {
		setStatus: (state) => {
			state.status = false;
		},
		// setGoal: (state, action) {
		// 	state.habits.wee
		// }
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
				state.error = action.payload;
			});
	},
});

export const { setStatus } = habitsSlice.actions;

export default habitsSlice.reducer;
