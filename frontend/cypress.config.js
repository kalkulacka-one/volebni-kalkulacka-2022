import { defineConfig } from 'cypress';

export default defineConfig({
  e2e: {
    baseUrl: 'http://localhost:5201/', // current localhost
    testIsolation: false,
  },
});
