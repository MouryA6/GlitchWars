/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        pixel: ['"Press Start 2P"', "cursive"],
      },
      keyframes: {
        glowBar: {
          "0%, 100%": { width: "70%" },
          "50%": { width: "90%" },
        },
        glitch: {
          "0%": { transform: "translate(0)" },
          "20%": { transform: "translate(-2px, 2px)" },
          "40%": { transform: "translate(-2px, -2px)" },
          "60%": { transform: "translate(2px, 2px)" },
          "80%": { transform: "translate(2px, -2px)" },
          "100%": { transform: "translate(0)" },
        },
        flicker: {
          "0%, 100%": { opacity: "1" },
          "10%": { opacity: "0.8" },
          "20%": { opacity: "0.6" },
          "30%, 70%": { opacity: "0.9" },
          "40%": { opacity: "0.4" },
          "60%": { opacity: "0.7" },
          "80%": { opacity: "0.5" },
          "90%": { opacity: "0.8" },
        },
        wiggle: {
          "0%, 100%": { transform: "rotate(-3deg)" },
          "50%": { transform: "rotate(3deg)" },
        },
        bounceGlow: {
          "0%, 100%": {
            transform: "translateY(0)",
            boxShadow: "0 0 10px #fff",
          },
          "50%": { transform: "translateY(-5px)", boxShadow: "0 0 20px #0ff" },
        },
      },
      animation: {
        glowBar: "glowBar 2s ease-in-out infinite",
        glitch: "glitch 0.7s infinite",
        flicker: "flicker 2s infinite",
        wiggle: "wiggle 0.3s ease-in-out infinite",
        bounceGlow: "bounceGlow 1.5s ease-in-out infinite",
      },
    },
  },
  plugins: [],
};
