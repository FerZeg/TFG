import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import Layout from './layouts/MainLayout';
import Login from './pages/Login';
import Logout from './components/Logout';
import {createBrowserRouter, RouterProvider} from 'react-router-dom'

console.log(import.meta.env.VITE_API_URL)

const router = createBrowserRouter([
  { path: "login", element: <Login/> },
  { path: "logout", element: <Logout/> },
  {
    path: "/",
    element: <Layout/>,
    children: [
      { path: "", element: <App/>},
    ]
  }
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router}></RouterProvider>
  </React.StrictMode>,
)
