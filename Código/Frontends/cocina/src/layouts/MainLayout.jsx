import Header from "../components/mainUI/Header";
import { useLoginContext } from "../lib/context";
import './MainLayout.css';
import { useEffect } from 'react';
import { useNavigate, Outlet } from 'react-router-dom';
import { fetchUserData } from '../lib/fetchers';



export default function Layout() {
  const { login, updateLogin } = useLoginContext()
  const navigate = useNavigate()

  useEffect(() => {
      if(login.value) return
      const token = localStorage.getItem('token')
      if(!token) {
          return navigate('/login')
      }
      (async() => {
          const data = await fetchUserData()
          if(data) updateLogin({value: true, data})
          else navigate('/logout')
      })()
      }, [navigate, login.value, updateLogin])

  return (
      <>
      {login.value &&
      <>
        <Header />
        <main className='main-section'>
          <Outlet />
        </main>
        </>
      }
      </>

    );
}
