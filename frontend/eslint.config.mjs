import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";

const eslintConfig = defineConfig([
  ...nextVitals,
  ...nextTs,
  // Override default ignores of eslint-config-next.
  globalIgnores([
    // Default ignores of eslint-config-next:
    ".next/**",
    "out/**",
    "build/**",
    "next-env.d.ts",
  ]),
  {
    // Project-level rule overrides
    rules: {
      // `void asyncFn()` inside useEffect is the recommended safe pattern in Next.js.
      // Downgrade from error to warn so CI doesn't block on this style choice.
      "react-hooks/set-state-in-effect": "warn",
      // Plain <img> is intentional for user-uploaded images (task records/datasets).
      // next/image requires known dimensions which we don't have for dynamic uploads.
      "@next/next/no-img-element": "warn",
    },
  },
]);

export default eslintConfig;
