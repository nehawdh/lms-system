import React from 'react'
import ReactDOM from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Home from './pages/Home'
import Course from './pages/Course'
import './index.css'

const router = createBrowserRouter([
  { path: "/", element: <Home/> },
  { path: "/course/:slug", element: <Course/> },
])

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <RouterProvider router={router}/>
  </React.StrictMode>
)
