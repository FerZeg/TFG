import { fetchLogin } from '../lib/fetchers';
import './Login.css';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Login() {
    const [user, setUser] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();
    const handleSubmit = async (ev) => {
        ev.preventDefault();
        if(await fetchLogin(user, password)) {
            navigate('/');
        } else {
            setError('Usuario o contraseña incorrectos');
            setPassword('');
        }  
    }

    return (
        <div className="center-page">
            <div className='loginFormContainer'>
                <h1 className="loginTitle">Iniciar Sesión</h1>
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