import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
const path = require("path");

export default ({ mode }) => {
  return defineConfig({
    plugins: [react()],
    define: {
      "process.env.NODE_ENV": `"${mode}"`,
    },
    server: {
      port: 3000,
      host: true,
    },
    resolve: {
      alias: {
        components: path.resolve("src/components/"),
        pages: path.resolve("src/pages/"),
        lib: path.resolve("src/lib/"),
        hooks: path.resolve("src/hooks/"),
        images: path.resolve("src/images/"),
      },
    },
  });
};
