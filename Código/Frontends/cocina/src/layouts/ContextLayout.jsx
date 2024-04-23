import { Outlet } from 'react-router-dom';
import { Toaster } from 'sonner';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { fetchUserData } from '../lib/fetchers';
import { useLoginContext } from '../lib/context';

export default function ContextLayout() {
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
        <Toaster richColors/>
        <Outlet />
        </>
    );
}