import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'
import { cwd } from 'node:process'

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, cwd(), "VITE_");
  const adminProxyTarget = env.VITE_ADMIN_URL;

  return {
    plugins: [react()],
    server: adminProxyTarget
      ? {
          proxy: {
            '/admin': {
              target: adminProxyTarget,
              changeOrigin: true,
              rewrite: (path) => path.replace(/^\/admin/, '')
            }
          }
        }
      : undefined
  };
})
