/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",

    // Or if using `src` directory:
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#D8F5F6",
        secondary: "#65789C",
        // background: "#E8FFF1",
        background: "#FFFFFF",
        // primary: "#FFFFF",
      },
    },
  },
  plugins: [],
};
