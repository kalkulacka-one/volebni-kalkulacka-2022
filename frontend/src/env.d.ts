/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly NODE_ENV: string;
  // more env variables...
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
