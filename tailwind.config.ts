import type { Config } from "tailwindcss";

const config: Config = {
  // Keep content globs narrow to avoid scanning locked/unreadable folders under `src/app/*`.
  // The app router lives in `/app` in this repo.
  content: [
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/lib/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/types/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        ink: "#0f172a",
        mist: "#f5f7fb",
        sapphire: "#1d4ed8",
        royal: "#1e3a8a",
        steel: "#334155",
      },
      boxShadow: {
        "card-soft": "0 20px 45px -30px rgba(15, 23, 42, 0.45)",
      },
    },
  },
  plugins: [],
};

export default config;
