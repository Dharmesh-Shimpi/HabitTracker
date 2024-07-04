// loginSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../../utils/axios';

export const loginUser = createAsyncThunk(
	'login/loginUser',
	async ({ email, password }, { rejectWithValue }) => {
		try {
			const response = await api.post('/login', { email, password });
			return response.data;
		} catch (error) {
			return rejectWithValue(error.response.data);
		}
	},
);

const loginSlice = createSlice({
	name: 'login',
	initialState: {
		name: '',
		email: '',
		token: null,
		loading: false,
		error: null,
		success: false,
	},
	reducers: {
		setEmail: (state, action) => {
			state.email = action.payload;
		},
		setPassword: (state, action) => {
			state.password = action.payload;
		},
		resetSuccess: (state) => {
			state.success = false;
		},
		resetError: (state) => {
			state.error = null;
		},
		clearToken: (state) => {
			state.token = null;
		},
	},
	extraReducers: (builder) => {
		builder
			.addCase(loginUser.pending, (state) => {
				state.loading = true;
				state.error = null;
				state.success = false;
			})
			.addCase(loginUser.fulfilled, (state, action) => {
				state.loading = false;
				state.token = action.payload.token;
				state.name = action.payload.name;
				state.success = true;
			})
			.addCase(loginUser.rejected, (state, action) => {
				state.loading = false;
				state.error = action.payload;
			});
	},
});

export const { setEmail, setPassword, resetSuccess, resetError, clearToken } =
	loginSlice.actions;
export default loginSlice.reducer;
