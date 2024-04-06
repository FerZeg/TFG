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
    const [loading, setLoading] = useState(true)
    const navigate = useNavigate()
    useEffect(() => {
        const token = localStorage.getItem('token')
        if(!token) {
            setLoading(false)
            return navigate('/login')
        }
        (async() => {
            const data = await fetchUserData()
            if(data) {
                setLogin({value: true, data: data.data})
            }
            else navigate('/login')
            setLoading(false)
        })()
        }, [navigate])
    return (
        <loginContext.Provider value={{login, setLogin}}>
            <Toaster/>
            {!loading && <Outlet />}
        </loginContext.Provider>
    );
}