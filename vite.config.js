import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173, // Puerto por defecto de Vite
    host: true, // Permite acceso desde la red
    open: true, // Abre el navegador automáticamente
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src"),
      contexts: path.resolve(__dirname, "src/contexts"),
    },
  },
});
