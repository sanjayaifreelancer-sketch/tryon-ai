/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./App.tsx", "./src/**/*.{ts,tsx}"],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors: {
        background: "#FFFFFF",
        primary: "#F59E0B",
        "text-primary": "#111111",
        "text-secondary": "#6B7280",
        "card-surface": "#F9FAFB",
        success: "#10B981",
        "border-light": "#E5E7EB",
      },
      fontFamily: {
        sans: ["Plus Jakarta Sans", "System"],
      },
      borderRadius: {
        card: "16px",
      },
    },
  },
  plugins: [],
};
