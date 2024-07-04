import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../../utils/axios';

export const registerUser = createAsyncThunk(
	'register/registerUser',
	async ({ name, email, password }, { rejectWithValue }) => {
		try {
			const response = await api.post('/register', { name, email, password });
			return response.data;
		} catch (error) {
			return rejectWithValue(error.response.data);
		}
	},
);

const registerSlice = createSlice({
	name: 'register',
	initialState: {
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
		resetSuccess: (state) => {
			state.success = false;
		},
		resetError: (state) => {
			state.error = null;
		},
	},
	extraReducers: (builder) => {
		builder
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
				state.error = action.payload;
			});
	},
});

export const { setEmail, setPassword, resetSuccess, resetError } =
	registerSlice.actions;
export default registerSlice.reducer;
