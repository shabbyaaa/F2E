import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
const path = require('path') 

// https://vitejs.dev/config/
export default defineConfig({
  resolve: {
    alias: {
      "src": resolve("src"),
      "components": resolve("src/components"),
      "pages": resolve("src/pages"),
      "router": resolve("src/router"),
      "utils": resolve("src/utils"),
    },
  },
  plugins: [vue()],
})

function resolve(dir) {
  return path.resolve(__dirname, dir);
}