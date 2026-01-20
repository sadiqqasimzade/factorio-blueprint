import { FlatCompat } from "@eslint/eslintrc";
import { dirname } from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

// Try to load Next.js configs, fallback to minimal config
let nextConfigs = [];
try {
  nextConfigs = compat.extends("next/core-web-vitals", "next/typescript");
} catch (error) {
  // If configs fail to load, use minimal config with parser
  console.warn("ESLint: Using minimal config due to Next.js config loading issue");
}

export default [
  // Ignore patterns
  {
    ignores: ["**/.next/**", "**/node_modules/**", "**/dist/**", "**/build/**"],
  },
  // Next.js configs
  ...nextConfigs,
  // Custom rules - only apply if Next.js configs loaded
  ...(nextConfigs.length > 0 ? [{
    files: ["**/*.{js,jsx,ts,tsx}"],
    rules: {
      "no-unused-vars": "warn",
      "no-useless-escape": "warn",
      "no-case-declarations": "off",
      "no-unreachable": "warn",
      "no-extra-semi": "warn",
    },
  }] : []),
];
