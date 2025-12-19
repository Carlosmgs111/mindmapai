// tailwind.config.mjs
import defaultTheme from 'tailwindcss/defaultTheme';

/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    extend: {
      colors: {
        // Backgrounds
        'primary-bg': '#0a0e1a',      // Background principal oscuro
        'secondary-bg': '#0f1729',    // Background secundario (cards, panels)
        'tertiary-bg': '#1a1f35',     // Background terciario (hover states)
        
        // Accent colors
        'accent': {
          DEFAULT: '#3b82f6',         // Azul principal (botones)
          light: '#60a5fa',           // Azul claro (hover)
          dark: '#2563eb',            // Azul oscuro
          gray: '#06b6d4',            // gray para highlights (Mindmaps)
          'gray-light': '#22d3ee',    // gray brillante
        },
        
        // Text colors
        'text': {
          primary: '#f1f5f9',         // Texto principal
          secondary: '#cbd5e1',       // Texto secundario
          muted: '#64748b',           // Texto deshabilitado/labels
          accent: '#3b82f6',          // Texto con acento
        },
        
        // Border colors
        'border': {
          DEFAULT: '#1e293b',         // Bordes sutiles
          light: '#334155',           // Bordes más visibles
          accent: '#3b82f6',          // Bordes con acento
        },
        'status': {
          success: '#10b981',
          warning: '#f59e0b',
          error: '#ef4444',
          info: '#3b82f6',
        }
      },
      boxShadow: {
        'glow': '0 0 20px rgba(59, 130, 246, 0.3)',
        'glow-gray': '0 0 20px rgba(6, 182, 212, 0.3)',
        'card': '0 4px 6px -1px rgba(0, 0, 0, 0.3), 0 2px 4px -1px rgba(0, 0, 0, 0.2)',
        'card-hover': '0 10px 15px -3px rgba(0, 0, 0, 0.4), 0 4px 6px -2px rgba(0, 0, 0, 0.3)',
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-primary': 'linear-gradient(135deg, #0a0e1a 0%, #1a1f35 100%)',
        'gradient-accent': 'linear-gradient(135deg, #3b82f6 0%, #06b6d4 100%)',
      },
      
      fontFamily: {
        sans: ['Inter', ...defaultTheme.fontFamily.sans],
        mono: ['JetBrains Mono', ...defaultTheme.fontFamily.mono],
      },
    },
  },
  plugins: [
    require('tailwindcss-scrollbar')
  ],
}