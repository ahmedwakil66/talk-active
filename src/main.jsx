import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import { RouterProvider } from 'react-router-dom'
import router from './routes/Router.jsx'
import PageProvider from './providers/PageProvider.jsx'
import ThemeProvider from './providers/ThemeProvider'
import AuthProvider from './providers/AuthProvider'
import { Toaster } from 'react-hot-toast'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AuthProvider>
      <ThemeProvider>
        <PageProvider>
          <QueryClientProvider client={queryClient}>
            <div>
              <RouterProvider router={router} />
              <Toaster />
            </div>
          </QueryClientProvider>
        </PageProvider>
      </ThemeProvider>
    </AuthProvider>
  </React.StrictMode>,
)
