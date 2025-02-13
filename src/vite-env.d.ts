/// <reference types="vite-plugin-svgr/client" />

declare module "*.svg?raw" {
    const content: string;
    export default content;
}

declare module '*.glsl' {
    const value: string;
    export default value;
  }