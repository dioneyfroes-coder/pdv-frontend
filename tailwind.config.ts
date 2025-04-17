// tailwind.config.ts
import { type Config } from "tailwindcss"

const config: Config = {
  
  darkMode: "class", // garante que dark mode funcione com a classe 'dark'
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        muted: "var(--muted)",
        'muted-foreground': "var(--muted-foreground)",
        border: "var(--border)",
        input: "var(--input)",
        primary: "var(--primary)",
        'primary-foreground': "var(--primary-foreground)",
        accent: "var(--accent)",
        'accent-foreground': "var(--accent-foreground)",
      },
      borderColor: {
        DEFAULT: "var(--border)",
      },
      textColor: {
        skin: {
          base: "var(--foreground)",
          muted: "var(--muted-foreground)",
          primary: "var(--primary)",
        },
      },
      backgroundColor: {
        skin: {
          base: "var(--background)",
          muted: "var(--muted)",
          primary: "var(--primary)",
          accent: "var(--accent)",
        },
      },
    },
  },
  plugins: [],
}

export default config;
