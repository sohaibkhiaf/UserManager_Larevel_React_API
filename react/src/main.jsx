import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import router from './router.jsx'
import { RouterProvider } from 'react-router-dom'
import { ContextProvider } from './contexts/ContextProvider.jsx'

//React + Laravel Full-stack Application | Build and Deploy
// 2:32:44

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ContextProvider>
        <RouterProvider router={router} />
    </ContextProvider>
  </StrictMode>,
)
