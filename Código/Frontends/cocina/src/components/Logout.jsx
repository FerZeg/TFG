import { useEffect} from 'react';
import { useNavigate } from 'react-router-dom';
import { useLoginContext } from '../lib/context';

export default function Logout() {
    const navigate = useNavigate();
    const { updateLogin } = useLoginContext();
    useEffect(() => {
        updateLogin({ value: false, data: {} });
        localStorage.removeItem('token');
        navigate('/login');
    }, [navigate, updateLogin]);
    return (<></>);
}