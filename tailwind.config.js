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
                // Enhanced glassmorphism color system
                primary: {
                    50: '#fff7ed',
                    100: '#ffedd5',
                    200: '#fed7aa',
                    300: '#fdba74',
                    400: '#fb923c',
                    500: '#f97316', // Main orange
                    600: '#ea580c',
                    700: '#c2410c',
                    800: '#9a3412',
                    900: '#7c2d12',
                    950: '#431407',
                },
                secondary: {
                    50: '#fdf2f8',
                    100: '#fce7f3',
                    200: '#fbcfe8',
                    300: '#f9a8d4',
                    400: '#f472b6',
                    500: '#ec4899', // Main pink
                    600: '#db2777',
                    700: '#be185d',
                    800: '#9d174d',
                    900: '#831843',
                    950: '#500724',
                },
                // Enhanced neutral system for glassmorphism
                neutral: {
                    50: '#fafafa',
                    100: '#f5f5f5',
                    200: '#e5e5e5',
                    300: '#d4d4d4',
                    400: '#a3a3a3',
                    500: '#737373',
                    600: '#525252',
                    700: '#404040',
                    800: '#262626',
                    900: '#171717',
                    950: '#0a0a0a',
                },
                // Glassmorphism specific colors
                glass: {
                    light: 'rgba(255, 255, 255, 0.1)',
                    'light-hover': 'rgba(255, 255, 255, 0.2)',
                    'light-active': 'rgba(255, 255, 255, 0.3)',
                    dark: 'rgba(0, 0, 0, 0.1)',
                    'dark-hover': 'rgba(0, 0, 0, 0.2)',
                    'dark-active': 'rgba(0, 0, 0, 0.3)',
                },
                // Semantic colors with glassmorphism variants
                success: {
                    50: '#f0fdf4',
                    500: '#22c55e',
                    600: '#16a34a',
                    glass: 'rgba(34, 197, 94, 0.1)',
                },
                warning: {
                    50: '#fffbeb',
                    500: '#f59e0b',
                    600: '#d97706',
                    glass: 'rgba(245, 158, 11, 0.1)',
                },
                error: {
                    50: '#fef2f2',
                    500: '#ef4444',
                    600: '#dc2626',
                    glass: 'rgba(239, 68, 68, 0.1)',
                },
                // Enhanced light mode colors
                light: {
                    bg: '#ffffff',
                    surface: '#fafafa',
                    'surface-elevated': '#ffffff',
                    'surface-glass': 'rgba(255, 255, 255, 0.8)',
                    border: '#e5e5e5',
                    'border-hover': '#d4d4d4',
                    'border-glass': 'rgba(255, 255, 255, 0.2)',
                    text: {
                        primary: '#171717',
                        secondary: '#525252',
                        muted: '#737373',
                        inverse: '#ffffff',
                    }
                },
                // Enhanced dark mode colors
                dark: {
                    bg: '#0a0a0a',
                    surface: '#171717',
                    'surface-elevated': '#262626',
                    'surface-glass': 'rgba(23, 23, 23, 0.8)',
                    border: '#404040',
                    'border-hover': '#525252',
                    'border-glass': 'rgba(255, 255, 255, 0.1)',
                    text: {
                        primary: '#fafafa',
                        secondary: '#d4d4d4',
                        muted: '#a3a3a3',
                        inverse: '#171717',
                    }
                }
            },
            fontFamily: {
                sans: ['Inter', 'system-ui', 'sans-serif'],
            },
            spacing: {
                '18': '4.5rem',
                '88': '22rem',
            },
            borderRadius: {
                'xl': '0.75rem',
                '2xl': '1rem',
                '3xl': '1.5rem',
                '4xl': '2rem',
            },
            boxShadow: {
                // Enhanced shadow system for glassmorphism
                'glass-sm': '0 2px 8px rgba(0, 0, 0, 0.05), inset 0 1px 0 rgba(255, 255, 255, 0.1)',
                'glass': '0 8px 32px rgba(0, 0, 0, 0.1), inset 0 1px 0 rgba(255, 255, 255, 0.2)',
                'glass-lg': '0 20px 40px rgba(0, 0, 0, 0.15), inset 0 1px 0 rgba(255, 255, 255, 0.3)',
                'glass-xl': '0 32px 64px rgba(0, 0, 0, 0.2), inset 0 1px 0 rgba(255, 255, 255, 0.4)',
                // Dark mode glass shadows
                'glass-dark-sm': '0 2px 8px rgba(0, 0, 0, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.05)',
                'glass-dark': '0 8px 32px rgba(0, 0, 0, 0.4), inset 0 1px 0 rgba(255, 255, 255, 0.1)',
                'glass-dark-lg': '0 20px 40px rgba(0, 0, 0, 0.5), inset 0 1px 0 rgba(255, 255, 255, 0.15)',
                'glass-dark-xl': '0 32px 64px rgba(0, 0, 0, 0.6), inset 0 1px 0 rgba(255, 255, 255, 0.2)',
                // Colored glass shadows
                'glow-primary': '0 0 20px rgba(249, 115, 22, 0.3)',
                'glow-secondary': '0 0 20px rgba(236, 72, 153, 0.3)',
                'glow-success': '0 0 20px rgba(34, 197, 94, 0.3)',
                'glow-warning': '0 0 20px rgba(245, 158, 11, 0.3)',
                'glow-error': '0 0 20px rgba(239, 68, 68, 0.3)',
            },
            backdropBlur: {
                xs: '2px',
                '4xl': '72px',
            },
            animation: {
                'fade-in': 'fadeIn 0.6s ease-out',
                'slide-up': 'slideUp 0.6s ease-out',
                'slide-down': 'slideDown 0.4s ease-out',
                'scale-in': 'scaleIn 0.4s ease-out',
                'bounce-soft': 'bounceSoft 2s infinite',
                'float': 'float 6s ease-in-out infinite',
                'pulse-soft': 'pulseSoft 3s ease-in-out infinite',
                'shimmer': 'shimmer 2s linear infinite',
                'glow': 'glow 2s ease-in-out infinite alternate',
                'parallax': 'parallax 20s linear infinite',
            },
            keyframes: {
                fadeIn: {
                    '0%': { opacity: '0', transform: 'translateY(10px)' },
                    '100%': { opacity: '1', transform: 'translateY(0)' },
                },
                slideUp: {
                    '0%': { opacity: '0', transform: 'translateY(30px)' },
                    '100%': { opacity: '1', transform: 'translateY(0)' },
                },
                slideDown: {
                    '0%': { opacity: '0', transform: 'translateY(-20px)' },
                    '100%': { opacity: '1', transform: 'translateY(0)' },
                },
                scaleIn: {
                    '0%': { opacity: '0', transform: 'scale(0.9)' },
                    '100%': { opacity: '1', transform: 'scale(1)' },
                },
                bounceSoft: {
                    '0%, 100%': { transform: 'translateY(0)' },
                    '50%': { transform: 'translateY(-8px)' },
                },
                float: {
                    '0%, 100%': { transform: 'translateY(0px) rotate(0deg)' },
                    '33%': { transform: 'translateY(-10px) rotate(1deg)' },
                    '66%': { transform: 'translateY(-5px) rotate(-1deg)' },
                },
                pulseSoft: {
                    '0%, 100%': { opacity: '1', transform: 'scale(1)' },
                    '50%': { opacity: '0.8', transform: 'scale(1.02)' },
                },
                shimmer: {
                    '0%': { transform: 'translateX(-100%)' },
                    '100%': { transform: 'translateX(100%)' },
                },
                glow: {
                    '0%': { boxShadow: '0 0 20px rgba(249, 115, 22, 0.2)' },
                    '100%': { boxShadow: '0 0 40px rgba(249, 115, 22, 0.4)' },
                },
                parallax: {
                    '0%': { transform: 'translateX(0%)' },
                    '100%': { transform: 'translateX(-100%)' },
                },
            },
        },
    },
    plugins: ['daisyui'],
}