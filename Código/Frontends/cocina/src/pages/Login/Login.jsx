import { fetchLogin } from '../../lib/fetchers';
import './Login.css';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import { loginContext } from '../../lib/context'
import { fetchUserData } from '../../lib/fetchers';

export default function Login() {
    const [user, setUser] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();
    const { setLogin } = useContext(loginContext);
    const handleSubmit = async (ev) => {
        ev.preventDefault();
        const login = await fetchLogin(user, password);
        if(!login) {
            setError('Usuario o contraseña incorrectos');
            setPassword('');
        } else {
            localStorage.setItem('token', login);
            navigate('/')
            const data = await fetchUserData();
            if(!data) {
                setError('Error al obtener los datos del usuario');
                setPassword('');
                setUser('');
                return
            }
            setLogin({value: true, data: data.data})
        }
    }
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
                    <p style={{color: 'red'}}>{error}</p>
                </form>
            </div>
        </div>
    );
}