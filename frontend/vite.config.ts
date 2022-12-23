import { fileURLToPath, URL } from 'node:url';

import { defineConfig, loadEnv, type ESBuildOptions } from 'vite';
import vue from '@vitejs/plugin-vue';
import md from 'vite-plugin-md';

const esbuildProd: ESBuildOptions = {
  drop: ['console', 'debugger'],
};

const esbuildVercel: ESBuildOptions = {
  drop: [],
};

// https://vitejs.dev/config/
export default defineConfig(({ command, mode }) => {
  process.env = { ...process.env, ...loadEnv(mode, process.cwd()) };
  const isVercel = process.env.VERCEL === '1';
  const esbuildConf = isVercel ? esbuildVercel : esbuildProd;
  console.log(`Deploying on Vercel: ${isVercel}`);
  return {
    plugins: [vue({ include: [/\.vue$/, /\.md$/] }), md()],
    esbuild: esbuildConf,
    build: {
      sourcemap: mode !== 'production' || isVercel,
    },
    server: {
      host: '0.0.0.0',
      port: 5201,
      proxy: {
        '/data': {
          target: 'http://127.0.0.1:5201/dev',
          //target: 'https://www.volebnikalkulacka.cz',
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
          target:
            'https://volebni-kalkulacka-2022-ofzsih6xv-ceskodigital.vercel.app/',
          changeOrigin: true,
        },
        '/image': {
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
  };
});
