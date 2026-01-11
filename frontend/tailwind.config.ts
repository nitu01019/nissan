import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // Nissan Brand Colors
        nissan: {
          red: "#C3002F",
          darkRed: "#8B0000",
          black: "#1A1A1A",
          gray: "#58595B",
          lightGray: "#F5F5F5",
          silver: "#C0C0C0",
          white: "#FFFFFF",
        },
        primary: {
          50: "#FFF5F7",
          100: "#FFE0E6",
          200: "#FFC7D1",
          300: "#FFA3B3",
          400: "#FF7089",
          500: "#C3002F",
          600: "#A30028",
          700: "#8B0000",
          800: "#660019",
          900: "#4D0013",
        },
        secondary: {
          50: "#F8F8F8",
          100: "#F0F0F0",
          200: "#E4E4E4",
          300: "#D1D1D1",
          400: "#B4B4B4",
          500: "#58595B",
          600: "#4A4A4A",
          700: "#3D3D3D",
          800: "#1A1A1A",
          900: "#0D0D0D",
        },
      },
      fontFamily: {
        sans: ["var(--font-inter)", "system-ui", "sans-serif"],
        heading: ["var(--font-poppins)", "system-ui", "sans-serif"],
      },
      animation: {
        "fade-in": "fadeIn 0.5s ease-in-out",
        "fade-in-up": "fadeInUp 0.6s ease-out",
        "fade-in-down": "fadeInDown 0.6s ease-out",
        "slide-in-left": "slideInLeft 0.6s ease-out",
        "slide-in-right": "slideInRight 0.6s ease-out",
        "scale-in": "scaleIn 0.5s ease-out",
        "bounce-subtle": "bounceSubtle 2s infinite",
        "pulse-glow": "pulseGlow 2s infinite",
        "float": "float 3s ease-in-out infinite",
        "shimmer": "shimmer 2s linear infinite",
      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        fadeInUp: {
          "0%": { opacity: "0", transform: "translateY(30px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        fadeInDown: {
          "0%": { opacity: "0", transform: "translateY(-30px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        slideInLeft: {
          "0%": { opacity: "0", transform: "translateX(-50px)" },
          "100%": { opacity: "1", transform: "translateX(0)" },
        },
        slideInRight: {
          "0%": { opacity: "0", transform: "translateX(50px)" },
          "100%": { opacity: "1", transform: "translateX(0)" },
        },
        scaleIn: {
          "0%": { opacity: "0", transform: "scale(0.9)" },
          "100%": { opacity: "1", transform: "scale(1)" },
        },
        bounceSubtle: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-10px)" },
        },
        pulseGlow: {
          "0%, 100%": { boxShadow: "0 0 20px rgba(195, 0, 47, 0.4)" },
          "50%": { boxShadow: "0 0 40px rgba(195, 0, 47, 0.8)" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-20px)" },
        },
        shimmer: {
          "0%": { backgroundPosition: "-200% 0" },
          "100%": { backgroundPosition: "200% 0" },
        },
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic": "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
        "hero-pattern": "linear-gradient(135deg, #1A1A1A 0%, #C3002F 100%)",
        "shimmer-gradient": "linear-gradient(90deg, transparent, rgba(255,255,255,0.4), transparent)",
      },
      boxShadow: {
        "card": "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)",
        "card-hover": "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
        "nissan": "0 10px 40px -10px rgba(195, 0, 47, 0.3)",
        "nissan-lg": "0 25px 50px -12px rgba(195, 0, 47, 0.4)",
      },
      transitionTimingFunction: {
        "bounce-in": "cubic-bezier(0.68, -0.55, 0.265, 1.55)",
        "smooth": "cubic-bezier(0.4, 0, 0.2, 1)",
      },
    },
  },
  plugins: [],
};

export default config;
