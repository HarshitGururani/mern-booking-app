/** @type {import('tailwindcss').Config} */
const withHSL = (variable) => `hsl(var(${variable}))`;
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}", // Adjust based on your file structure
  ],
  theme: {
    extend: {
      colors: {
        background: withHSL("--background"),
        tint: "#fc9051",
        foreground: withHSL("--foreground"),
        card: withHSL("--card"),
        "card-foreground": withHSL("--card-foreground"),
        popover: withHSL("--popover"),
        "popover-foreground": withHSL("--popover-foreground"),
        primary: withHSL("--primary"),
        "primary-foreground": withHSL("--primary-foreground"),
        secondary: withHSL("--secondary"),
        "secondary-foreground": withHSL("--secondary-foreground"),
        muted: withHSL("--muted"),
        "muted-foreground": withHSL("--muted-foreground"),
        accent: withHSL("--accent"),
        "accent-foreground": withHSL("--accent-foreground"),
        destructive: withHSL("--destructive"),
        "destructive-foreground": withHSL("--destructive-foreground"),
        border: withHSL("--border"),
        input: withHSL("--input"),
        ring: withHSL("--ring"),
        "chart-1": withHSL("--chart-1"),
        "chart-2": withHSL("--chart-2"),
        "chart-3": withHSL("--chart-3"),
        "chart-4": withHSL("--chart-4"),
        "chart-5": withHSL("--chart-5"),
      },
      borderRadius: {
        DEFAULT: "var(--radius)",
      },
    },
  },
  plugins: [],
  darkMode: "class", // Enable dark mode with the `dark` class
};
