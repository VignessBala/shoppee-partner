// /** @type {import('tailwindcss').Config} */
// export default {
//   content: [
//     "./index.html",
//     "./src/**/*.{js,ts,jsx,tsx}",
//   ],
//   theme: {
//     extend: {},
//   },
//   plugins: [],
// }


module.exports = {
  theme: {
    extend: {
      colors: {
        primary: "var(--primary-color)",
        "primary-hover": "var(--primary-hover-color)",
        secondary: "var(--secondary-color)",
        text: "var(--text-color)",
        "text-light": "var(--text-light)",
        accent: "var(--accent-color)",
        background: "var(--bg-color)",
      },
      animation: {
              float: 'float 6s ease-in-out infinite',
            },
            keyframes: {
              float: {
                '0%, 100%': { transform: 'translateY(0)' },
                '50%': { transform: 'translateY(-10px)' },
              },
            },
    },
  },
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  variants: {},
  plugins: [],
};
