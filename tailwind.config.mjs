/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        nicRed: "#98002E", // NIC Red
        darkSlate: "#2B2B2B", // Dark Slate
        lightGray: "#F1F1F1", // Light Gray
        coolWhite: "#FFFFFF", // Cool White
        forestGreen: "#2E8B57", // Forest Green
        goldenYellow: "#FFC107", // Golden Yellow
        slateBlue: "#4A90E2", // Slate Blue
      },
    },
  },
  plugins: [require("daisyui")],
  daisyui: {
    themes: [
      {
        nicProfessional: {
          primary: "#98002E", // NIC Red
          secondary: "#2E8B57", // Forest Green
          accent: "#FFC107", // Golden Yellow
          neutral: "#2B2B2B", // Dark Slate
          "base-100": "#F1F1F1", // Light Gray
          info: "#4A90E2", // Slate Blue
          success: "#2E8B57", // Forest Green
          warning: "#FFC107", // Golden Yellow
          error: "#98002E", // NIC Red (dual purpose for error).
        },
      },
    ],
  },
};
