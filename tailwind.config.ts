import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
    },
  },
  plugins: [require('daisyui')],
  daisyui: {
    themes: [
      {
        mytheme: {
          "primary": "#3490dc",
          "secondary": "#ffed4a",
          "accent": "#38c172",
          "neutral": "#f9f9f9",
          "base-100": "#ffffff", // pastikan base-100 berwarna putih
        },
      },
    ],
    lightTheme: "mytheme", // atau gunakan "light" jika ingin tema default terang
  },
};
export default config;
