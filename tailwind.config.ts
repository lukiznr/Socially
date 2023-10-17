import { withMaterialColors } from "tailwind-material-colors";
export default withMaterialColors(
  {
    content: ["./app/**/*.{js,jsx,ts,tsx}"],
    darkMode: "class",
    theme: {
      extend: {},
    },
    plugins: [],
  },
  {
    primary: "#1381D4",
  },
  { extend: true }
);
