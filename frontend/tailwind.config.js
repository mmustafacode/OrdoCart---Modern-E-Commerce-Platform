/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            fontFamily: {
                sans: ['Inter', 'sans-serif'],
                heading: ['Outfit', 'sans-serif'],
            },
            colors: {
                primary: {
                    DEFAULT: '#4F46E5', // Indigo 600
                    foreground: '#ffffff',
                },
                secondary: {
                    DEFAULT: '#10B981', // Emerald 500
                    foreground: '#ffffff',
                },
                dark: {
                    DEFAULT: '#1F2937', // Gray 800
                    lighter: '#374151', // Gray 700
                }
            },
            keyframes: {
                fadeIn: {
                    '0%': { opacity: '0' },
                    '100%': { opacity: '1' },
                },
                slideUp: {
                    '0%': { transform: 'translateY(20px)', opacity: '0' },
                    '100%': { transform: 'translateY(0)', opacity: '1' },
                }
            },
            animation: {
                fadeIn: 'fadeIn 0.5s ease-out',
                slideUp: 'slideUp 0.6s ease-out forwards',
            }
        },
    },
    plugins: [],
}
