import { defineConfig } from "vite";
import svgr from "vite-plugin-svgr";
import react from "@vitejs/plugin-react";
import glsl from 'vite-plugin-glsl';

export default defineConfig({
  build: {
  },
  plugins: [ svgr(), react(), glsl()],
  base: '/Redwood-Forest/',
});