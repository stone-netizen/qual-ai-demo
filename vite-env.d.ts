/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_LOGODEV_TOKEN: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
