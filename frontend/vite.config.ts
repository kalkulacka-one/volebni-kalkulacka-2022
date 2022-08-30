import { fileURLToPath, URL } from 'node:url';

import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  server: {
    host: '0.0.0.0',
    port: 5201,
    proxy: {
      '/data': {
        target: 'https://kalkulacka.ceskodigital.net',
        changeOrigin: true,
        cookieDomainRewrite: { '*': '' },
        configure: (proxy) =>
          proxy.on('proxyRes', (proxyRes, req, res) => {
            if (proxyRes.headers['set-cookie']) {
              proxyRes.headers['set-cookie'][0] = proxyRes.headers[
                'set-cookie'
              ][0].replace('; Secure', '');
            }
          }),
      },
    },
  },
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
});
