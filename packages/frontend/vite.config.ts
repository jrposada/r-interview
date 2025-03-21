import { TanStackRouterVite } from '@tanstack/router-plugin/vite';
import react from '@vitejs/plugin-react';
import { defineConfig, loadEnv } from 'vite';
import tsconfigPaths from 'vite-tsconfig-paths';

/** @see https://vite.dev/config/#using-environment-variables-in-config */
export default defineConfig(({ mode }) => {
  // Load env file based on `mode` in the current working directory.
  // Set the third parameter to '' to load all env regardless of the
  // `VITE_` prefix.
  const env = loadEnv(mode, process.cwd(), '');

  return defineConfig({
    base: `/${env.VITE_BASE_PATH}`,
    server: {
      host: 'localhost',
      port: parseInt(env.VITE_PORT),
      allowedHosts: [
        'http://localhost:3100',
        'localhost',
        'd3d5-170-253-8-113.ngrok-free.app',
      ],
      proxy: {
        '/api': {
          target: `http://localhost:3100`,
          changeOrigin: true,
          secure: false,
        },
        '/socket.io': {
          target: `http://localhost:3100/socket.io`,
          changeOrigin: true,
          secure: false,
        },
      },
    },
    plugins: [
      TanStackRouterVite({ autoCodeSplitting: true }),
      react(),
      tsconfigPaths(),
    ],
  });
});
