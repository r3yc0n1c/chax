import React from 'react'
import ReactDOM from 'react-dom/client'
import App from '@/App.tsx'
import '@/index.css'
import SocketProvider from '@/context/SocketProvider.tsx'
import { BrowserRouter } from 'react-router-dom'

ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
        <BrowserRouter>
            <SocketProvider>
                <App />
            </SocketProvider>
        </BrowserRouter>
    </React.StrictMode>,
)
