import { StrictMode, Suspense } from 'react'
import { createRoot } from 'react-dom/client'
import './styles/index.scss'
import { Provider } from 'react-redux'
import { store } from './app/store'
import { RouterProvider } from 'react-router-dom'
import router from './app/router.jsx'
import AppErrorBoundary from "./ui/components/AppErrorBoundary/index.jsx";

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AppErrorBoundary>
        <Provider store={store}>
          <Suspense fallback={<div>Loading app...</div>}>
            <RouterProvider router={router} />
          </Suspense>
        </Provider>
    </AppErrorBoundary>
  </StrictMode>
)