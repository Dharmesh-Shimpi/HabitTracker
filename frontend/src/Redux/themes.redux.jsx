// src/redux/themeSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../../utils/axios';

export const fetchThemes = createAsyncThunk('theme/fetchThemes', async () => {
	const response = await api.get('/themes');
	return response.data;
});

export const fetchFonts = createAsyncThunk('theme/fetchFonts', async () => {
	const response = await api.get('/fonts');
	return response.data;
});

const themeSlice = createSlice({
	name: 'theme',
	initialState: {
		themes: [
			{
				name: 'Moody',
				syntax: 'url(/confetti-doodles-brown.svg)',
				color: 'wheat',
			},
			{
				name: 'Forest',
				syntax: 'url(/confetti-doodles-green.svg)',
				color: 'white',
			},
			{
				name: 'Barbie',
				syntax: 'url(/confetti-doodles-pink.svg)',
				color: '#f0f0f0',
			},
		],
		fonts: [
			{ name: 'Cursive', syntax: "'Playwrite MX', cursive" },
			{ name: 'Poppins', syntax: "'Poppins', sans-serif" },
			{ name: 'Cedarville', syntax: "'Cedarville Cursive', cursive" },
			{ name: 'Playwrite', syntax: "'Playfair Display', serif" },
		],
		selectedTheme: 'Moody',
		selectedFont: 'Poppins',
		status: 'idle',
		error: null,
	},
	reducers: {
		setTheme: (state, action) => {
			state.selectedTheme = action.payload;
		},
		setFont: (state, action) => {
			state.selectedFont = action.payload;
		},
	},
	extraReducers: (builder) => {
		builder
			.addCase(fetchThemes.pending, (state) => {
				state.status = 'loading';
			})
			.addCase(fetchThemes.fulfilled, (state, action) => {
				state.status = 'succeeded';
				state.themes = [...state.themes, action.payload];
			})
			.addCase(fetchThemes.rejected, (state, action) => {
				state.status = 'failed';
				state.error = action.error.message;
			})
			.addCase(fetchFonts.pending, (state) => {
				state.status = 'loading';
			})
			.addCase(fetchFonts.fulfilled, (state, action) => {
				state.status = 'succeeded';
				state.fonts = [...state.fonts, action.payload];
			})
			.addCase(fetchFonts.rejected, (state, action) => {
				state.status = 'failed';
				state.error = action.error.message;
			});
	},
});

export const { setTheme, setFont } = themeSlice.actions;

export default themeSlice.reducer;
