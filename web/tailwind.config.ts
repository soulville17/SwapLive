import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        'neon-primary': '#00d4ff',
        'neon-secondary': '#7b2fff',
        'neon-pink': '#ff2d78',
        'neon-green': '#00ff88',
        'bg-void': '#050508',
        'bg-primary': '#0d0d14',
        'bg-secondary': '#13131f',
        'bg-elevated': '#1a1a2e',
      },
      fontFamily: {
        display: ['Space Grotesk', 'sans-serif'],
        body: ['Inter', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
      },
    },
  },
  plugins: [],
};
export default config;
