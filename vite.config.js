import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// Configuración de Vite para el proyecto React.
// 'base' debe apuntar al nombre del repositorio para el despliegue en GitHub Pages.
// El repositorio se llama "S3_Frontend_I", por lo que el sitio queda en
// https://nicolasarielcc.github.io/S3_Frontend_I/
export default defineConfig({
  plugins: [react()],
  base: '/S3_Frontend_I/',
})
