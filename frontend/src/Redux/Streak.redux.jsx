import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import StreakAwardRepo from '../api/StreakAwardRepo';

export const fetchAwardsStreaksThunk = createAsyncThunk(
	'streaks/fetchAwardsStreaks',
	async (type, thunkAPI) => {
		try {
			const awards = await StreakAwardRepo.getAwardsStreaks(type);
			return awards;
		} catch (error) {
			return thunkAPI.rejectWithValue(error.response.data);
		}
	},
);

export const fetchUserStreakThunk = createAsyncThunk(
	'streaks/fetchUserStreak',
	async (_, thunkAPI) => {
		try {
			const userStreak = await StreakAwardRepo.getUserStreak();
			return userStreak;
		} catch (error) {
			return thunkAPI.rejectWithValue(error.response.data);
		}
	},
);

const streaksSlice = createSlice({
	name: 'streaks',
	initialState: {
		userStreak: {},
		awards: [],
		status: 'idle',
		error: null,
	},
	reducers: {},
	extraReducers: (builder) => {
		builder
			.addCase(fetchAwardsStreaksThunk.pending, (state) => {
				state.status = 'loading';
			})
			.addCase(fetchAwardsStreaksThunk.fulfilled, (state, action) => {
				state.status = 'succeeded';
				state.awards = action.payload;
			})
			.addCase(fetchAwardsStreaksThunk.rejected, (state, action) => {
				state.status = 'failed';
				state.error = action.payload;
			})
			.addCase(fetchUserStreakThunk.pending, (state) => {
				state.status = 'loading';
			})
			.addCase(fetchUserStreakThunk.fulfilled, (state, action) => {
				state.status = 'succeeded';
				state.userStreak = action.payload;
			})
			.addCase(fetchUserStreakThunk.rejected, (state, action) => {
				state.status = 'failed';
				state.error = action.payload;
			});
	},
});

export default streaksSlice.reducer;
