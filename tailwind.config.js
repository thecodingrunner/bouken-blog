/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      colors: {
        "dark-background": "var(--dark-background)",
        "dark-highlight": "var(--dark-highlight)",
        "dark-text": "var(--dark-text)",
        "light-background": "var(--light-background)",
        "light-highlight": "var(--light-highlight)",
        "light-text": "var(--light-text)"
      }
    },
  },
  plugins: [],
};
