import { defineConfig, type CSSOptions } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import fs from 'fs'
import path from 'path'

export const plugins = [
  react(),
  tailwindcss()
]

export const resolve = {
  alias: {
    '@': '/src',
  },
}
export const css: CSSOptions = {
  preprocessorOptions: {
    scss: {
      additionalData: `@import "@/index.css";`
    }
  }
}

export const build = {
  rollupOptions: {
    input: {
      ...Object.fromEntries(
        fs.readdirSync(path.join(__dirname, 'templates'))
          .filter((file: string) => file.endsWith('.html'))
          .map((file: string) => [file.replace('.html', ''), `templates/${file}`])
      ),
    },
  },
}

// https://vite.dev/config/
export default defineConfig({
  plugins,
  resolve,
  css,
  build,
})
