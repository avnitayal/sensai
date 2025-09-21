import { FlatCompat } from "@eslint/eslintrc";
import js from "@eslint/js";
import next from "@next/eslint-plugin-next";

const compat = new FlatCompat({
  baseDirectory: import.meta.dirname || process.cwd(),
});

export default [
  js.configs.recommended,
  ...compat.extends("next/core-web-vitals"),
  {
    plugins: { next },
    rules: {
      "react/no-unescaped-entities": "off", // optional, silences common warnings
    },
  },
];
