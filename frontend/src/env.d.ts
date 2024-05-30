/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly NODE_ENV: string;
  // more env variables...
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}

declare module '*.md' {
  import type { ComponentOptions } from 'vue';
  const Component: ComponentOptions;
  export default Component;
}

declare function plausible(
  eventName: string,
  options?: { props?: Record<string, any> }
): void;
