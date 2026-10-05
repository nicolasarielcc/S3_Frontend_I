import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'

// Estilos propios
import './index.css'

import App from './App.jsx'

// Punto de entrada: monta la aplicación en el elemento #root del HTML.
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
