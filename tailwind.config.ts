import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        pumaRed: '#E42A2A',
        pumaBlack: '#1A1A1A',
        pumaGold: '#FFB300',
        pumaWhite: '#FFFFFF',
        pumaGray: '#2D2D2D',
      },
      fontFamily: {
        rajdhani: ['var(--font-rajdhani)', 'sans-serif'],
        inter: ['var(--font-inter)', 'sans-serif'],
      },
      animation: {
        'pulse-glow': 'pulseGlow 2s ease-in-out infinite',
        'float': 'float 6s ease-in-out infinite',
        'slide-up': 'slideUp 0.8s ease-out forwards',
        'letter-reveal': 'letterReveal 0.5s ease-out forwards',
        'particle-float': 'particleFloat 10s linear infinite',
      },
      keyframes: {
        pulseGlow: {
          '0%, 100%': { 
            boxShadow: '0 0 20px rgba(228, 42, 42, 0.4), 0 0 40px rgba(228, 42, 42, 0.2)' 
          },
          '50%': { 
            boxShadow: '0 0 40px rgba(228, 42, 42, 0.6), 0 0 80px rgba(228, 42, 42, 0.4)' 
          },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-20px)' },
        },
        slideUp: {
          '0%': { opacity: '0', transform: 'translateY(50px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        letterReveal: {
          '0%': { opacity: '0', transform: 'translateY(30px) rotateX(-90deg)' },
          '100%': { opacity: '1', transform: 'translateY(0) rotateX(0deg)' },
        },
        particleFloat: {
          '0%': { transform: 'translateY(100vh) rotate(0deg)', opacity: '0' },
          '10%': { opacity: '1' },
          '90%': { opacity: '1' },
          '100%': { transform: 'translateY(-100vh) rotate(720deg)', opacity: '0' },
        },
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'puma-gradient': 'linear-gradient(135deg, #1A1A1A 0%, #E42A2A 50%, #1A1A1A 100%)',
        'diagonal-lines': 'repeating-linear-gradient(45deg, transparent, transparent 10px, rgba(228, 42, 42, 0.1) 10px, rgba(228, 42, 42, 0.1) 20px)',
      },
    },
  },
  plugins: [],
};

export default config;
