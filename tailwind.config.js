/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        tblue: '#043365',
        dBlue: '#0B1941',
        appleBlue: '#007AFF',
        appleBlueHover: '#0051D5',
        deepNavy: '#0B1941',
        navyHover: '#03264e',
        borderSoft: '#e3e8ef',
        borderLight: '#e0e0e0',
        borderField: '#d1d5db',
        mutedBg: '#f8fafc',
        surfaceBg: '#f5f5f7',
        sidebarBg: '#FAFAFA',
        sidebarBorder: '#CDD6E0',
        accordionBg: '#fafbfc',
        success: '#388E3C',
        danger: '#D32F2F',
        warning: '#e65100',
        error: '#c62828',
        info: '#3b82f6',
        appleGray: 'rgba(142, 142, 147, 0.08)',
        appleGrayHover: 'rgba(142, 142, 147, 0.12)',
        appleText: '#1d1d1f',
        placeholder: '#8E8E93',
      },
      fontFamily: {
        montserrat: ['Montserrat', 'sans-serif'],
        roboto: ['Roboto', 'sans-serif'],
        system: ['-apple-system', 'BlinkMacSystemFont', 'SF Pro Display', 'sans-serif'],
      },
      boxShadow: {
        card: '0px 1px 3px rgba(0, 0, 0, 0.1)',
        statCard: '0 2px 8px rgba(0, 0, 0, 0.1)',
        cardHover: '0 2px 6px rgba(0, 0, 0, 0.12)',
        glass: '0 8px 32px rgba(0, 0, 0, 0.12)',
        headerGlass: '0 8px 32px 0 rgba(31, 38, 135, 0.08)',
        dialog: '0 4px 20px rgba(0, 0, 0, 0.12)',
        focusApple: '0 0 0 4px rgba(0, 122, 255, 0.1)',
        buttonApple: '0 4px 14px rgba(0, 122, 255, 0.3)',
        subtle: '0 1px 3px rgba(0, 0, 0, 0.08)',
        accordionHover: '0 4px 12px rgba(0, 0, 0, 0.06)',
      },
      borderRadius: {
        glass: '16px',
        dialog: '12px',
        searchbar: '10px',
        button: '8px',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0', transform: 'translateY(8px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        slideDown: {
          '0%': { opacity: '0', transform: 'translateY(-10px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        slideInLeft: {
          '0%': { opacity: '0', transform: 'translateX(-16px)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
        pulseDot: {
          '0%, 100%': { opacity: '0.4' },
          '50%': { opacity: '1' },
        },
      },
      animation: {
        fadeIn: 'fadeIn 0.3s ease-out forwards',
        slideDown: 'slideDown 0.25s ease-out forwards',
        slideInLeft: 'slideInLeft 0.3s ease-out forwards',
        pulseDot: 'pulseDot 1s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
    },
  },
  corePlugins: {
    preflight: false,
  },
  plugins: [],
};
