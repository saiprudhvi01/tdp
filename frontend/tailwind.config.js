/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          yellow: '#F4C400',
          deep: '#E6B800',
          light: '#FFF9E6',
        },
        text: {
          primary: '#1F2937',
          secondary: '#4B5563',
          light: '#6B7280',
        },
        accent: {
          success: '#22C55E',
          warning: '#F59E0B',
          error: '#DC2626',
          info: '#2563EB',
        }
      },
      backgroundImage: {
        'gradient-gold': 'linear-gradient(135deg, #FFFDF5 0%, #FFF6CC 35%, #FFE066 100%)',
        'glass': 'rgba(255, 255, 255, 0.6)',
      }
    },
  },
  plugins: [],
}
