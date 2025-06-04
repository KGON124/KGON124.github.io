import { defineConfig } from "vite";
export default defineConfig({
  base: "/KGON124.github.io/",   // 必ず先頭と末尾にスラッシュ
  build: {
    outDir: "dist"      // Vite デフォルト dist/
  }
});