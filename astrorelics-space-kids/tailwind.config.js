/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        space: {
          void: "#030614",
          abyss: "#070B1E",
          deep: "#0B132B",
          navy: "#1C2541",
          border: "#1E293B",
          card: "rgba(15, 23, 42, 0.75)",
          cardHover: "rgba(30, 41, 59, 0.85)",
        },
        nebula: {
          purple: "#7928CA",
          violet: "#9D4EDD",
          cyan: "#00F0FF",
          electric: "#0070F3",
          gold: "#FFB703",
          amber: "#FB8500",
        },
        mars: {
          red: "#C84B31",
          rust: "#A33327",
          dust: "#D97706",
          dune: "#F59E0B",
          soil: "#4A1D16",
        },
      },
      fontFamily: {
        sans: ["var(--font-fredoka)", "system-ui", "sans-serif"],
        display: ["var(--font-orbitron)", "sans-serif"],
        mono: ["var(--font-jetbrains-mono)", "monospace"],
      },
      animation: {
        "spin-slow": "spin 25s linear infinite",
        "spin-reverse": "spin-reverse 35s linear infinite",
        "pulse-glow": "pulseGlow 2.5s ease-in-out infinite",
        "float": "float 4s ease-in-out infinite",
        "twinkle": "twinkle 3s ease-in-out infinite",
        "scanline": "scanline 2s linear infinite",
      },
      keyframes: {
        "spin-reverse": {
          "0%": { transform: "rotate(360deg)" },
          "100%": { transform: "rotate(0deg)" },
        },
        pulseGlow: {
          "0%, 100%": { opacity: 0.6, transform: "scale(1)" },
          "50%": { opacity: 1, transform: "scale(1.05)" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-10px)" },
        },
        twinkle: {
          "0%, 100%": { opacity: 0.3, transform: "scale(0.8)" },
          "50%": { opacity: 1, transform: "scale(1.2)" },
        },
        scanline: {
          "0%": { transform: "translateY(-100%)" },
          "100%": { transform: "translateY(1000%)" },
        },
      },
      boxShadow: {
        "glow-cyan": "0 0 25px rgba(0, 240, 255, 0.45)",
        "glow-gold": "0 0 25px rgba(255, 183, 3, 0.45)",
        "glow-purple": "0 0 25px rgba(157, 78, 221, 0.45)",
        "glow-mars": "0 0 25px rgba(200, 75, 49, 0.45)",
        "glow-sm-cyan": "0 0 10px rgba(0, 240, 255, 0.35)",
      },
    },
  },
  plugins: [],
};
