import ReactDOM from 'react-dom/client'
import Cocina from './pages/Cocina/Cocina.jsx'
import './index.css'
import Layout from './layouts/MainLayout';
import Login from './pages/Login/Login';
import Logout from './components/Logout';
import {createBrowserRouter, RouterProvider} from 'react-router-dom'
import Admin from './pages/Admin/Admin.jsx';
import { Toaster } from 'sonner';


const router = createBrowserRouter([
  { path: "logout", element: <Logout/> },
  { path: "login", element: <Login/> },
  {
    path: "/",
    element: <Layout/>,
    children: [
      { path: "", element: <Cocina/>},
      { path: "edit", element: <h1>Editar</h1>},
      { path: "admin", element: <Admin/>},
      { path: "tickets", element: <h1>Tickets</h1>},
    ]
  }
]);

ReactDOM.createRoot(document.getElementById('root')).render(
    <RouterProvider router={router}>
      <Toaster richColors/>
    </RouterProvider>,
)
