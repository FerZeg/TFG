import { useContext } from 'react';
import { fetchLogin } from '../lib/fetchers';
import './Login.css';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { loginContext } from '../lib/context';
import { useEffect } from 'react';

export default function Login() {
    const [user, setUser] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();
    const {login} = useContext(loginContext);
    const handleSubmit = async (ev) => {
        ev.preventDefault();
        if(await fetchLogin(user, password)) {
            navigate('/');
        } else {
            setError('Usuario o contraseña incorrectos');
            setPassword('');
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
                        <button type="submit">Enviar</button>
                    </div>
                    <p>{error}</p>
                </form>
            </div>
        </div>
    );
}