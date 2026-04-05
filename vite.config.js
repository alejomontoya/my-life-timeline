import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

const repoName = 'my-life-timeline'

export default defineConfig({
  plugins: [react()],
  base: `/${repoName}/`,
})
