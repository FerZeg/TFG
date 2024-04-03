import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import Layout from './layouts/MainLayout';
import Login from './pages/Login';
import Logout from './components/Logout';
import {createBrowserRouter, RouterProvider} from 'react-router-dom'
import ContextLayout from './layouts/ContextLayout.jsx';

console.log(import.meta.env.VITE_API_URL)

const router = createBrowserRouter([
  { path: "logout", element: <Logout/> },
  {
    path: "/",
    element: <ContextLayout/>,
    children: [
      { path: "", element: <Layout><App/></Layout>},
      { path: "editar", element: <Layout><h1>Editar</h1></Layout>},
      { path: "admin", element: <Layout><h1>Administrar</h1></Layout>},
      { path: "tickets", element: <Layout><h1>Tickets</h1></Layout>},
      { path: "login", element: <Login/> }
    ]
  }
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router}></RouterProvider>
  </React.StrictMode>,
)
