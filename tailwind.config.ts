import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        saturated: "var(--foreground-saturated)",
        muted: "var(--foreground-muted)",
        card: "var(--background-card)",
        decoration: "var(--decoration)",
        loading: "var(--loading)",
      },
    },
  },
  plugins: [],
};
export default config;
