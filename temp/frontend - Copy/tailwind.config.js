/** @type {import('tailwindcss').Config} */
export default {
    content: ["./index.html","./src/**/*.{ts,tsx}"],
    theme: { 
      extend: {
        colors: {
          primary: {
            blue: '#3b82f6',
            'blue-dark': '#2563eb',
            'blue-light': '#dbeafe',
          },
          secondary: {
            purple: '#8b5cf6',
            'purple-light': '#ede9fe',
          },
          accent: {
            green: '#10b981',
            'green-light': '#d1fae5',
            orange: '#f59e0b',
            'orange-light': '#fef3c7',
          },
          text: {
            primary: '#1f2937',
            secondary: '#6b7280',
            muted: '#9ca3af',
          },
          bg: {
            primary: '#ffffff',
            secondary: '#f9fafb',
            tertiary: '#f3f4f6',
          },
          border: {
            light: '#e5e7eb',
            medium: '#d1d5db',
          }
        },
        fontFamily: {
          sans: ['Inter', 'system-ui', 'sans-serif'],
        },
        animation: {
          'fade-in-up': 'fadeInUp 0.8s cubic-bezier(0.4, 0, 0.2, 1)',
          'slide-in-left': 'slideInLeft 0.8s cubic-bezier(0.4, 0, 0.2, 1)',
          'slide-in-right': 'slideInRight 0.8s cubic-bezier(0.4, 0, 0.2, 1)',
          'float': 'float 3s ease-in-out infinite',
          'pulse-glow': 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        },
        keyframes: {
          fadeInUp: {
            '0%': { opacity: '0', transform: 'translateY(30px)' },
            '100%': { opacity: '1', transform: 'translateY(0)' },
          },
          slideInLeft: {
            '0%': { opacity: '0', transform: 'translateX(-30px)' },
            '100%': { opacity: '1', transform: 'translateX(0)' },
          },
          slideInRight: {
            '0%': { opacity: '0', transform: 'translateX(30px)' },
            '100%': { opacity: '1', transform: 'translateX(0)' },
          },
          float: {
            '0%, 100%': { transform: 'translateY(0px)' },
            '50%': { transform: 'translateY(-10px)' },
          },
        },
        boxShadow: {
          'modern-sm': '0 1px 2px 0 rgb(0 0 0 / 0.05)',
          'modern-md': '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)',
          'modern-lg': '0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)',
          'modern-xl': '0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)',
        },
        borderRadius: {
          'modern': '16px',
          'modern-lg': '20px',
        }
      } 
    },
    plugins: [],
  }
  