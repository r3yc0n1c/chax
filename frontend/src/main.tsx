import React from 'react'
import ReactDOM from 'react-dom/client'
import App from '@/App.tsx'
import '@/index.css'
import SocketProvider from '@/context/SocketProvider.tsx'
import { BrowserRouter } from 'react-router-dom'
import { GoogleOAuthProvider } from '@react-oauth/google';

ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
        <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_AUTH_CLIENT_ID}>
            <BrowserRouter>
                <SocketProvider>
                    <App />
                </SocketProvider>
            </BrowserRouter>
        </GoogleOAuthProvider >
    </React.StrictMode>,
)
