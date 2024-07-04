import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../../utils/axios';

export const googleOauth = createAsyncThunk(
	'oauth/googleOauth',
	async (code, { rejectWithValue }) => {
		try {
			const response = await api.post('/register/oauth', { code });
			return response.data;
		} catch (error) {
			return rejectWithValue(error.response.data);
		}
	},
);

const oauthSlice = createSlice({
	name: 'oauth',
	initialState: {
		name: '',
		email: '',
		loading: false,
		error: null,
		success: false,
	},
	reducers: {
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
			.addCase(googleOauth.pending, (state) => {
				state.loading = true;
				state.error = null;
				state.success = false;
			})
			.addCase(googleOauth.fulfilled, (state, action) => {
				state.loading = false;
				state.email = action.payload.email;
				state.name = action.payload.name;
				state.success = true;
			})
			.addCase(googleOauth.rejected, (state, action) => {
				state.loading = false;
				state.error = action.payload;
			});
	},
});

export const { resetSuccess, resetError, clearToken } = oauthSlice.actions;
export default oauthSlice.reducer;
