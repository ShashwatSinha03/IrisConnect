import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./lib/**/*.{ts,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          50: "#eff6ff",
          100: "#dbeafe",
          200: "#bfdbfe",
          300: "#93c5fd",
          400: "#60a5fa",
          500: "#3b82f6",
          600: "#2563eb",
          700: "#1d4ed8",
          800: "#1e3a5f",
          900: "#172554"
        },
        gold: {
          50: "#fffbeb",
          100: "#fef3c7",
          200: "#fde68a",
          300: "#fcd34d",
          400: "#fbbf24",
          500: "#f59e0b",
          600: "#d97706",
          700: "#b45309"
        },
        surface: {
          DEFAULT: "#111420",
          light: "#1a1d2b",
          dark: "#080b15",
          darker: "#05070d"
        }
      },
      boxShadow: {
        xs: "0 1px 2px 0 rgb(0 0 0 / 0.2)",
        sm: "0 1px 3px 0 rgb(0 0 0 / 0.25), 0 1px 2px -1px rgb(0 0 0 / 0.2)",
        md: "0 2px 6px -1px rgb(0 0 0 / 0.3), 0 1px 3px -1px rgb(0 0 0 / 0.2)",
        lg: "0 4px 12px -2px rgb(0 0 0 / 0.35), 0 2px 4px -2px rgb(0 0 0 / 0.2)",
        xl: "0 8px 24px -4px rgb(0 0 0 / 0.4), 0 2px 6px -2px rgb(0 0 0 / 0.2)",
        card: "0 1px 2px 0 rgb(0 0 0 / 0.15), 0 1px 3px 0 rgb(0 0 0 / 0.2)",
        "card-hover": "0 1px 4px 0 rgb(0 0 0 / 0.2), 0 2px 8px 0 rgb(0 0 0 / 0.25)",
        elevated: "0 4px 16px -4px rgb(0 0 0 / 0.4), 0 1px 4px -1px rgb(0 0 0 / 0.3)",
        glow: "0 0 20px rgba(59, 130, 246, 0.15)",
        "glow-gold": "0 0 20px rgba(245, 158, 11, 0.15)"
      },
      backgroundImage: {
        "hero-grid":
          "linear-gradient(to right, rgba(255,255,255,0.03) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.03) 1px, transparent 1px)",
        "hero-grid-light":
          "linear-gradient(to right, rgba(255,255,255,0.015) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.015) 1px, transparent 1px)"
      },
      keyframes: {
        fadeUp: {
          "0%": { opacity: "0", transform: "translateY(6px)" },
          "100%": { opacity: "1", transform: "translateY(0)" }
        },
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" }
        },
        scaleIn: {
          "0%": { opacity: "0", transform: "scale(0.98)" },
          "100%": { opacity: "1", transform: "scale(1)" }
        },
        slideIn: {
          "0%": { opacity: "0", transform: "translateX(-4px)" },
          "100%": { opacity: "1", transform: "translateX(0)" }
        }
      },
      animation: {
        fadeUp: "fadeUp 0.4s ease-out",
        fadeIn: "fadeIn 0.3s ease-out",
        scaleIn: "scaleIn 0.3s ease-out",
        slideIn: "slideIn 0.25s ease-out"
      }
    }
  },
  plugins: []
};

export default config;
