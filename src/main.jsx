import React from 'react'
import ReactDOM from 'react-dom/client'
import { RouterProvider } from 'react-router-dom'
import router from './router'
import './index.css'
import { ProyProvider } from './context/ProyContext'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ProyProvider>
        <RouterProvider router={router} />
    </ProyProvider>
  </React.StrictMode>,
)
