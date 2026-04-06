/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        border: 'var(--tw-border)',
        input: 'var(--tw-input)',
        ring: 'var(--tw-ring)',
        background: 'var(--tw-background)',
        foreground: 'var(--tw-foreground)',
        primary: {
          DEFAULT: 'var(--tw-primary)',
          foreground: 'var(--tw-primary-foreground)',
        },
        secondary: {
          DEFAULT: 'var(--tw-secondary)',
          foreground: 'var(--tw-secondary-foreground)',
        },
        destructive: {
          DEFAULT: 'var(--tw-destructive)',
          foreground: 'var(--tw-destructive-foreground)',
        },
        muted: {
          DEFAULT: 'var(--tw-muted)',
          foreground: 'var(--tw-muted-foreground)',
        },
        accent: {
          DEFAULT: 'var(--tw-accent)',
          foreground: 'var(--tw-accent-foreground)',
        },
        popover: {
          DEFAULT: 'var(--tw-popover)',
          foreground: 'var(--tw-popover-foreground)',
        },
        card: {
          DEFAULT: 'var(--tw-card)',
          foreground: 'var(--tw-card-foreground)',
        },
        gold: {
          DEFAULT: 'oklch(0.78 0.12 80 / <alpha-value>)',
          light: 'oklch(0.85 0.1 80 / <alpha-value>)',
          dark: 'oklch(0.65 0.12 80 / <alpha-value>)',
        },
        'cinema-red': 'oklch(0.55 0.22 20 / <alpha-value>)',
      },
      fontFamily: {
        sans: ['"DM Sans"', 'system-ui', 'sans-serif'],
        display: ['"Playfair Display"', 'Georgia', 'serif'],
        serif: ['"Playfair Display"', 'Georgia', 'serif'],
      },
      borderRadius: {
        lg: '0.5rem',
        md: 'calc(0.5rem - 2px)',
        sm: 'calc(0.5rem - 4px)',
        xl: 'calc(0.5rem + 4px)',
      },
      keyframes: {
        'accordion-down': {
          from: { height: '0' },
          to: { height: 'var(--radix-accordion-content-height)' },
        },
        'accordion-up': {
          from: { height: 'var(--radix-accordion-content-height)' },
          to: { height: '0' },
        },
      },
      animation: {
        'accordion-down': 'accordion-down 0.2s ease-out',
        'accordion-up': 'accordion-up 0.2s ease-out',
      },
    },
  },
  plugins: [],
}
