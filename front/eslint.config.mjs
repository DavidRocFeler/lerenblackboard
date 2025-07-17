import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  ...compat.extends("next/core-web-vitals"),
  {
    extends: [
      "plugin:@typescript-eslint/recommended",
    ],
    rules: {
      // 🔹 Permite el uso de 'any' (cambia a "off" si quieres desactivarlo por completo)
      "@typescript-eslint/no-explicit-any": "warn", // o "off" para ignorarlo

      // 🔹 Permite variables no usadas que empiezan con "_" (ej: _unusedVar)
      "@typescript-eslint/no-unused-vars": ["error", { "argsIgnorePattern": "^_", "varsIgnorePattern": "^_" }],

      // 🔹 Desactiva la advertencia por usar `<img>` (Next.js)
      "@next/next/no-img-element": "off",

      // 🔹 Configura react-hooks para ser más permisivo
      "react-hooks/exhaustive-deps": "warn", // o "off" si no quieres ver advertencias de dependencias
    },
  },
];

export default eslintConfig;