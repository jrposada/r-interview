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
      allowedHosts: ['localhost'],
      proxy: {
        '/api': {
          target: `http://localhost:3100`,
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
