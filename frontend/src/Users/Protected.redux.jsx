import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../utils/axios';

export const verifyToken = createAsyncThunk(
	'auth/verifyToken',
	async (token) => {
		try {
			const { data } = await api.get(`/verify/${token}`);
			console.log(data);
			return data;
		} catch (err) {
			return err;
		}
	},
);

const authSlice = createSlice({
	name: 'auth',
	initialState: {
		id: null,
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
				state.id = action.payload.id;
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
