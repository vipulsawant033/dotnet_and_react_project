import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import mkcert from "vite-plugin-mkcert";

// https://vite.dev/config/
export default defineConfig({
  server: { port: 3000 },
  plugins: [react(), mkcert()],
  // resolve: {
  //   // prevents multiple React copies when deps import their own
  //   dedupe: ["react", "react-dom"],
  //   alias: {
  //     // (optional) ensure both resolve to the same path
  //     react: require.resolve("react"),
  //     "react-dom": require.resolve("react-dom"),
  //   },
  // },
  // optimizeDeps: {
  //   // don't prebundle react separately in another graph
  //   exclude: ["react", "react-dom"],
  // },
});
