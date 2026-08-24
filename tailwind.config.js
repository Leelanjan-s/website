/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        studio: {
          bg: "var(--studio-bg)",
          surface: "var(--studio-surface)",
          surfaceAlt: "var(--studio-surface-alt)",
          text: "var(--studio-text)",
          textMuted: "var(--studio-text-muted)",
          border: "var(--studio-border)",
        },
        acid: {
          DEFAULT: "var(--acid)",
          hover: "var(--acid-hover)",
          text: "var(--acid-text)",
        },
        accent: {
          indigo: "#4F46E5",
          coral: "#FF6B57",
          coralHover: "#E05A47",
          amber: "#FFB627",
          teal: "#0EA5A0",
          violet: "#8B5CF6",
        }
      },
      fontFamily: {
        display: ["'Space Grotesk'", "sans-serif"],
        body: ["Inter", "sans-serif"],
        mono: ["'DM Mono'", "monospace"],
      }
    }
  },
  plugins: [],
}
