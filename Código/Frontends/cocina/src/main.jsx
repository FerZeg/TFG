import ReactDOM from 'react-dom/client'
import Cocina from './pages/Cocina/Cocina.jsx'
import Layout from './layouts/MainLayout';
import Login from './pages/Login/Login';
import Logout from './components/Logout';
import {createBrowserRouter, RouterProvider} from 'react-router-dom'
import Admin from './pages/Admin/Admin.jsx';
import TicketsPage from './pages/Tickets/Tickets.jsx';
import EditorPage from './pages/Editor/Editor.jsx';

import './index.css'
import 'modern-normalize/modern-normalize.css'


const router = createBrowserRouter([
  { path: "logout", element: <Logout/> },
  { path: "login", element: <Login/> },
  {
    path: "/",
    element: <Layout/>,
    children: [
      { path: "", element: <Cocina/>},
      { path: "edit", element: <EditorPage/>},
      { path: "admin", element: <Admin/>},
      { path: "tickets", element: <TicketsPage/>},
    ]
  },
  { 
    path: "*", 
    async lazy() {
      const {Error404} = await import('./pages/Errors/Error404');
      return {Component: Error404}
    }

  },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
    <RouterProvider router={router}>
    </RouterProvider>,
)
