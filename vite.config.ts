import { defineConfig } from "vite";
export default defineConfig({
  base: "/",   // 必ず先頭と末尾にスラッシュ
  build: {
    outDir: "dist"      // Vite デフォルト dist/
  }
});