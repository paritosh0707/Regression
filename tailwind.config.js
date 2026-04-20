/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        tblue: '#043365',
        dBlue: '#0B1941',
        appleBlue: '#007AFF',
        borderSoft: '#e3e8ef',
        mutedBg: '#f8fafc'
      },
      boxShadow: {
        card: '0 2px 8px rgba(0, 0, 0, 0.04)',
        glass: '0 8px 32px rgba(0, 0, 0, 0.12)'
      }
    }
  },
  corePlugins: {
    preflight: false
  },
  plugins: []
};
