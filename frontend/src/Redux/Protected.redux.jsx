import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../utils/axios';

export const verifyToken = createAsyncThunk('auth/verifyToken', async () => {
	try {
		const { data } = await api.get('/verify');
		console.log(data);
		return data;
	} catch (err) {
		throw err;
	}
});

const authSlice = createSlice({
	name: 'auth',
	initialState: {
		isAuthenticated: false,
		loading: true,
		error: null,
	},
	reducers: {},
	extraReducers: (builder) => {
		builder
			.addCase(verifyToken.pending, (state) => {
				state.loading = true;
			})
			.addCase(verifyToken.fulfilled, (state, action) => {
				state.isAuthenticated = action.payload.isVerified;
				state.loading = false;
			})
			.addCase(verifyToken.rejected, (state, action) => {
				state.isAuthenticated = false;
				state.loading = false;
				state.error = action.error.message;
			});
	},
});

export default authSlice.reducer;