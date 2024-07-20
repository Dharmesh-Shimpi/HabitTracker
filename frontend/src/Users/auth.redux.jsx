//auth.redux.jsx
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../utils/axios';

// Async Thunks
export const registerUser = createAsyncThunk(
	'auth/registerUser',
	async ({ name, email, password }) => {
		try {
			await api.post('/register', { name, email, password });
		} catch (error) {
			return error.response.data;
		}
	},
);

export const loginUser = createAsyncThunk(
	'auth/loginUser',
	async ({ email, password }) => {
		try {
			const response = await api.post('/login', { email, password });
			console.log(response.data);
			localStorage.setItem('token', response.data);
		} catch (error) {
			return error.response.data;
		}
	},
);

export const googleOauth = createAsyncThunk(
	'auth/googleOauth',
	async (code) => {
		try {
			await api.post('/register/oauth', { code });
		} catch (error) {
			return error.response.data;
		}
	},
);

const authSlice = createSlice({
	name: 'auth',
	initialState: {
		name: '',
		email: '',
		password: '',
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
		setSuccess: (state, action) => {
			state.success = action.payload;
		},
		setError: (state, action) => {
			state.error = action.payload;
		},
	},
	extraReducers: (builder) => {
		builder
			// Register User
			.addCase(registerUser.pending, (state) => {
				state.loading = true;
				state.error = null;
				state.success = false;
			})
			.addCase(registerUser.fulfilled, (state, action) => {
				state.loading = false;
				state.email = action.payload.email;
				state.password = action.payload.password;
				state.success = true;
			})
			.addCase(registerUser.rejected, (state, action) => {
				state.loading = false;
				state.error = action.error.message;
			})
			// Login User
			.addCase(loginUser.pending, (state) => {
				state.loading = true;
				state.error = null;
				state.success = false;
			})
			.addCase(loginUser.fulfilled, (state, action) => {
				state.loading = false;
				state.success = true;
			})
			.addCase(loginUser.rejected, (state, action) => {
				state.loading = false;
				state.error = action.error.message;
			})
			// Google OAuth
			.addCase(googleOauth.pending, (state) => {
				state.loading = true;
				state.error = null;
				state.success = false;
			})
			.addCase(googleOauth.fulfilled, (state, action) => {
				state.loading = false;
				state.success = true;
			})
			.addCase(googleOauth.rejected, (state, action) => {
				state.loading = false;
				state.error = action.error.message;
			});
	},
});

export const { setEmail, setPassword, setSuccess, setError } = authSlice.actions;
export default authSlice.reducer;
