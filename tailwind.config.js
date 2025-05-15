// tailwind.config.js
module.exports = {
    content: [
      "./src/**/*.{js,jsx,ts,tsx}",
    ],
    theme: {
      extend: {
        colors: {
          'cyberpunk': {
            'bg': '#000000',
            'panel': '#0a0f19',
            'accent': '#00f4ff',
            'accent-dark': '#00c4cc',
            'text': '#b3e6ff',
            'text-dim': '#778da9',
            'border': '#00f4ff',
            'success': '#00ff9d',
            'alert': '#ff3e3e',
            'caution': '#ffcc00',
          }
        },
        fontFamily: {
          'terminal': ['Courier New', 'monospace'],
        },
        boxShadow: {
          'terminal': '0 0 20px rgba(0, 244, 255, 0.4)',
          'terminal-glow': '0 0 8px rgba(0, 244, 255, 0.8)',
        },
        backgroundImage: {
          'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
          'scanlines': 'repeating-linear-gradient(transparent, transparent 2px, rgba(0, 244, 255, 0.03) 2px, rgba(0, 244, 255, 0.03) 4px)',
        },
        animation: {
          'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        },
      },
    },
    plugins: [],
  }