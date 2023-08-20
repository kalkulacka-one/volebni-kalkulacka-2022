import { fileURLToPath, URL } from 'node:url';
import { resolve, dirname } from 'node:path';

import { defineConfig, loadEnv, type ESBuildOptions } from 'vite';
import vue from '@vitejs/plugin-vue';
import md from 'vite-plugin-md';
import VueI18nPlugin from '@intlify/unplugin-vue-i18n/vite';

const esbuildProd: ESBuildOptions = {
  //drop: ['console', 'debugger'],
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
    plugins: [
      vue({ include: [/\.vue$/, /\.md$/] }),
      md(),
      VueI18nPlugin({
        include: resolve(
          dirname(fileURLToPath(import.meta.url)),
          './src/i18n/locales/**',
        ),
      }),
    ],
    esbuild: esbuildConf,
    build: {
      sourcemap: mode !== 'production' || isVercel,
    },
    server: {
      host: '0.0.0.0',
      port: 5201,
      proxy: {
        '/data': process.env.DATA_PROXY
          ? {
              target: process.env.DATA_PROXY,
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
            }
          : undefined,
        '/api': process.env.API_PROXY
          ? {
              target: process.env.API_PROXY,
              changeOrigin: true,
            }
          : undefined,
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
