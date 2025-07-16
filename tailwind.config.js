/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: [
    './pages/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './app/**/*.{ts,tsx}',
    './src/**/*.{ts,tsx}',
  ],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      screens: {
        'xs': '475px',
        '3xl': '1600px',
        '4xl': '1920px',
      },
      spacing: {
        '18': '4.5rem',
        '88': '22rem',
        '128': '32rem',
      },
      colors: {
        // HHI Brand Colors using OKLCH
        primary: {
          DEFAULT: 'oklch(0.8664 0.0728 12.3312)', // Warm Orange
          foreground: 'oklch(0 0 0)',
        },
        secondary: {
          DEFAULT: 'oklch(0.7973 0.0831 235.0238)', // Professional Blue
          foreground: 'oklch(0 0 0)',
        },
        accent: {
          DEFAULT: 'oklch(0.9517 0.2169 115.6724)', // Success Green
          foreground: 'oklch(0 0 0)',
        },
        // Semantic colors
        background: 'oklch(0.9809 0.0025 228.7836)',
        foreground: 'oklch(0.3211 0 0)',
        card: 'oklch(1.0000 0 0)',
        'card-foreground': 'oklch(0.3211 0 0)',
        popover: 'oklch(1.0000 0 0)',
        'popover-foreground': 'oklch(0.3211 0 0)',
        muted: 'oklch(0.967 0.003 264.542)',
        'muted-foreground': 'oklch(0.551 0.027 264.364)',
        destructive: 'oklch(0.577 0.245 27.325)',
        'destructive-foreground': 'oklch(1.0000 0 0)',
        border: 'oklch(0.928 0.006 264.531)',
        input: 'oklch(0.928 0.006 264.531)',
        ring: 'oklch(0.707 0.022 261.325)',
        // Chart colors
        chart: {
          "1": 'oklch(0.646 0.222 41.116)',
          "2": 'oklch(0.6 0.118 184.704)',
          "3": 'oklch(0.398 0.07 227.392)',
          "4": 'oklch(0.828 0.189 84.429)',
          "5": 'oklch(0.769 0.188 70.08)',
        },
        // Sidebar colors
        sidebar: 'oklch(0.985 0.002 247.839)',
        'sidebar-foreground': 'oklch(0.13 0.028 261.692)',
        'sidebar-primary': 'oklch(0.21 0.034 264.665)',
        'sidebar-primary-foreground': 'oklch(0.985 0.002 247.839)',
        'sidebar-accent': 'oklch(0.967 0.003 264.542)',
        'sidebar-accent-foreground': 'oklch(0.21 0.034 264.665)',
        'sidebar-border': 'oklch(0.928 0.006 264.531)',
        'sidebar-ring': 'oklch(0.707 0.022 261.325)',
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      fontFamily: {
        sans: ["Poppins", "system-ui", "sans-serif"],
        serif: ["Georgia", "serif"],
        mono: ["JetBrains Mono", "monospace"],
      },
      fontSize: {
        'xs': ['0.75rem', { lineHeight: '1rem' }],
        'sm': ['0.875rem', { lineHeight: '1.25rem' }],
        'base': ['1rem', { lineHeight: '1.5rem' }],
        'lg': ['1.125rem', { lineHeight: '1.75rem' }],
        'xl': ['1.25rem', { lineHeight: '1.75rem' }],
        '2xl': ['1.5rem', { lineHeight: '2rem' }],
        '3xl': ['1.875rem', { lineHeight: '2.25rem' }],
        '4xl': ['2.25rem', { lineHeight: '2.5rem' }],
        '5xl': ['3rem', { lineHeight: '1' }],
        '6xl': ['3.75rem', { lineHeight: '1' }],
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
        "fade-in": {
          from: { opacity: "0" },
          to: { opacity: "1" },
        },
        "slide-in-from-top": {
          from: { transform: "translateY(-100%)" },
          to: { transform: "translateY(0)" },
        },
        "slide-in-from-bottom": {
          from: { transform: "translateY(100%)" },
          to: { transform: "translateY(0)" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        "fade-in": "fade-in 0.3s ease-out",
        "slide-in-from-top": "slide-in-from-top 0.3s ease-out",
        "slide-in-from-bottom": "slide-in-from-bottom 0.3s ease-out",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} 