// Entry point for the app
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'

createRoot(document.getElementById('root')!).render(
  // Helps catch bugs in development
  <StrictMode>
    <App />
  </StrictMode>,
)
