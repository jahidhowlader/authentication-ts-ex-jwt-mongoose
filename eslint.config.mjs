//https://blog.logrocket.com/linting-typescript-eslint-prettier/

import globals from "globals";
import pluginJs from "@eslint/js";
import tseslint from "typescript-eslint";

/** @type {import('eslint').Linter.Config[]} */
export default [
  { files: ["**/*.{js,mjs,cjs,ts}"] },
  { files: ["**/*.js"], languageOptions: { sourceType: "commonjs" } },
  {
    languageOptions: {
      globals: {
        ...globals.browser,
        ...globals.node,
        myCustomGlobal: "readonly"
      }
    }
  },
  {
    // check rules while build 
    rules: {
      eqeqeq: "off",
      "no-unused-vars": "error",
      "prefer-const": ["error", { ignoreReadBeforeAssign: true }],
    },
  },
  {
    // ignore file or folder while i build 
    ignores: ["dist/*", "node_modules/*"]
  },
  pluginJs.configs.recommended,
  ...tseslint.configs.recommended,
];