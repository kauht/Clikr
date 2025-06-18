/** @type {import('tailwindcss').Config} */
export default {
	content: [
	  "./index.html",
	  "./src/**/*.{js,ts,jsx,tsx}",
	],
	darkMode: 'class',
	theme: {
	  extend: {
		colors: {
		  background: {
			light: '#f0f2f5',
			dark: '#121218'
		  },
		  section: {
			light: '#f8fafc',
			dark: '#1e1e2a'
		  },
		  interactive: {
			light: '#e5e7eb',
			dark: '#131218'
		  },
		  'custom-purple': {
			DEFAULT: '#9333EA', // purple-600
			hover: '#A855F7',   // purple-500
			light: '#F3E8FF',   // purple-100
			dark: '#6B21A8'     // purple-800
		  }
		}
	  },
	},
	plugins: []
  }