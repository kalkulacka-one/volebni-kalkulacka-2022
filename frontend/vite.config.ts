import { fileURLToPath, URL } from 'node:url';

import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import Markdown from 'vite-plugin-md';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue({ include: [/\.vue$/, /\.md$/] }), Markdown()],
  server: {
    host: '0.0.0.0',
    port: 5201,
    proxy: {
      '/data': {
        //target: 'http://127.0.0.1:5201/dev',
        target: 'https://www.volebnikalkulacka.cz',
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
      '/api': {
        //target: 'http://127.0.0.1:8080',
        target: 'https://www.volebnikalkulacka.cz',
        changeOrigin: true,
      },
      '/js/script.outbound-links.js': {
        target: 'https://www.volebnikalkulacka.cz',
        changeOrigin: true,
      },
    },
  },
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
});
