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
        }
      }
    },
  },
  plugins: []
}