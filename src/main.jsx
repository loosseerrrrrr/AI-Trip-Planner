import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'

import {
  createBrowserRouter,
  RouterProvider,
  Outlet
} from 'react-router-dom'

import CreateTrip from './create-trip/index.jsx'
import ViewTrip from './view-trip/[tripId]/index.jsx'
import MyTrips from './my-trips/index.jsx'

import Header from './components/custom/Header.jsx'
import { Toaster } from './components/ui/sonner'
import ErrorBoundary from './components/ErrorBoundary.jsx'

import { GoogleOAuthProvider } from '@react-oauth/google'




// Layout Component
const Layout = () => {
  return (
    <>
      <Header />
      <Toaster />
      <Outlet />
    </>
  )
}


// Router
const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      {
        path: '/',
        element: <App />
      },
      {
        path: '/create-trip',
        element: <CreateTrip />
      },
      {
        path: '/view-trip/:tripId',
        element: <ViewTrip />
      },
      {
        path: '/my-trips',
        element: <MyTrips />
      }
    ]
  }
])



// Render App
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ErrorBoundary>
      <GoogleOAuthProvider
        clientId={import.meta.env.VITE_GOOGLE_AUTH_CLIENT_ID}
      >
        <RouterProvider router={router} />
      </GoogleOAuthProvider>
    </ErrorBoundary>
  </React.StrictMode>
)
