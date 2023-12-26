import type { Config } from "tailwindcss";

export default {
  content: ["./app/**/*.{js,jsx,ts,tsx}"],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        surface: {
          "50": "#f6f6f6",
          "100": "#e7e7e7",
          "200": "#d1d1d1",
          "300": "#b0b0b0",
          "400": "#808080",
          "500": "#6d6d6d",
          "600": "#5d5d5d",
          "700": "#4f4f4f",
          "800": "#454545",
          "900": "#3d3d3d",
          "950": "#262626",
        },
        primary: {
          "50": "#f0faff",
          "100": "#e0f5fe",
          "200": "#bae8fd",
          "300": "#7dd5fc",
          "400": "#38bcf8",
          "500": "#0ea5e9",
          "600": "#028ac7",
          "700": "#0370a1",
          "800": "#075e85",
          "900": "#0c506e",
          "950": "#083549",
        },
      },
    },
  },
  plugins: [],
} satisfies Config;
