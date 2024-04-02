import { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

export default function Success() {
    const location = useLocation();
    const navigate = useNavigate();
    useEffect(() => {
        const params = new URLSearchParams(location.search);
        const token = params.get('token');
        if (token) {
            localStorage.setItem('token', token);
            navigate('/');
        }
    }, [location.search, navigate]);
    return (
        <></>
    );
}