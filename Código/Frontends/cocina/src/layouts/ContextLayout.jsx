import { useState } from 'react';
import { loginContext } from '../lib/context';
import { Outlet } from 'react-router-dom';
import { Toaster } from 'sonner';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { fetchUserData } from '../lib/fetchers';

export default function ContextLayout() {
    const [ login, setLogin ] = useState({
        value: false,
        data: null
      })
    const navigate = useNavigate()
    useEffect(() => {
        if(login.value) return
        const token = localStorage.getItem('token')
        if(!token) {
            return navigate('/login')
        }
        (async() => {
            const data = await fetchUserData()
            if(data) setLogin({value: true, data})
            else navigate('/logout')
        })()
        }, [navigate, login.value])
    return (
        <loginContext.Provider value={{login, setLogin}}>
            <Toaster/>
            <Outlet />
        </loginContext.Provider>
    );
}