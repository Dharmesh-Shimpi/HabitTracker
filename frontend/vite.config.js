import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
// https://habittracker-g2pu.onrender.com
export default defineConfig({
	plugins: [react()],
	server: {
		proxy: {
			'/api': 'http://localhost:5000',
		},
	},
});
