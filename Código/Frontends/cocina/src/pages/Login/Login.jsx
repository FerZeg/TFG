import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLoginContext } from '../../lib/context'
import { fetchLogin, fetchUserData } from '../../lib/fetchers';
import './Login.css';

export default function Login() {
    const [user, setUser] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const { login, updateLogin } = useLoginContext();

    const handleSubmit = async (ev) => {
        ev.preventDefault();
        setLoading(true);
        const login = await fetchLogin(user, password);
        if(!login) {
            setError('Usuario o contraseña incorrectos');
            setPassword('');
            setLoading(false);
        } else {
            localStorage.setItem('token', login);
            navigate('/')
            const data = await fetchUserData();
            if(!data) {
                setError('Error al obtener los datos del usuario');
                setPassword('');
                setUser('');
                setLoading(false);
                return
            }
            updateLogin({value: true, data: data})
            setLoading(false);
        }
    }

    useEffect(() => {
        if(login.value) navigate('/')
    }, [login.value, navigate])

    return (
        <div className="center-page margin-top-20">
            <h1 className='title'>ComidaEnMarcha</h1>
            <div className='loginFormContainer'>
                <h2 className="loginTitle">Iniciar Sesión</h2>
                <form className='loginForm' onSubmit={handleSubmit}>
                    <input type="text" placeholder="Usuario" value={user} onChange={(ev) => setUser(ev.target.value)}/>
                    <input type="password" placeholder="Contraseña" value={password} onChange={(ev) => setPassword(ev.target.value)}/>
                    <div>
                        <button type="submit" disabled={loading}>Enviar</button>
                    </div>
                    <p style={{color: 'red'}}>{error}</p>
                </form>
            </div>
        </div>
    );
}