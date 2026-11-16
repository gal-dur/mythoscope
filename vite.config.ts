import react from "@vitejs/plugin-react";
import { type Plugin, searchForWorkspaceRoot } from "vite";
import { defineConfig } from "vitest/config";

// Vite binds inside the container and would print that address; `task dev` passes the one the
// browser on the host opens (127.0.0.1-published), and that is the only URL shown.
const DEV_URL = process.env.DEV_URL;
const hostUrl: Plugin = {
  name: "host-url",
  configureServer(server) {
    if (DEV_URL) server.printUrls = () => server.config.logger.info(`\n  ➜  Open ${DEV_URL}\n`);
  },
};

export default defineConfig({
  base: "./", // the build opens from any path, a subdirectory included
  plugins: [react(), hostUrl],
  cacheDir: "/tmp/vite", // never inside the mounted checkout
  server: {
    watch: { usePolling: true, interval: 300 }, // inotify does not cross the podman mount reliably
    // The dependencies live in /node_modules, above the checkout at /work (see Containerfile), so
    // Vite's default (the checkout only) refuses the font files the @fontsource CSS points at.
    fs: { allow: [searchForWorkspaceRoot(process.cwd()), "/node_modules"] },
  },
  test: { environment: "node", include: ["src/**/*.test.{ts,tsx}"] },
});
