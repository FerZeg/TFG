import "./LoginPage.css"
import { useState } from "react"
import { useLoginContext } from "../lib/context"
import { fetchMesaLogin, fetchMesaData } from "../lib/fetchers"

export default function Login() {
    const [mesa, setMesa] = useState("")
    const [password, setPassword] = useState("")
    const [email, setEmail] = useState("")
    const [error, setError] = useState("")
    const [loading, setLoading] = useState(false)
    const { updateLogin } = useLoginContext()

    const handleSubmit = async (ev) => {
        ev.preventDefault()
        setLoading(true)
        const login = await fetchMesaLogin(email, mesa, password)
        if(!login) {
            setError("Usuario o contraseña incorrectos")
            setPassword("")
            setLoading(false)
        } else {
            localStorage.setItem("token", login.token)
            const data = await fetchMesaData()
            if(!data) {
                setError("Error al obtener los datos del usuario")
                setPassword("")
                setMesa("")
                setLoading(false)
                return
            }
            updateLogin({value: true, data: data})
            setLoading(false)
        }
    }
    return (
        <div className="center-page margin-top-20 fade-in">
            <h1 className='title'>ComidaEnMarcha</h1>
            <div className='loginFormContainer'>
                <h2 className="loginTitle">Mesas</h2>
                <form className='loginForm' onSubmit={handleSubmit}>
                    <input type="email" placeholder="Correo Admin" value={email} onChange={(ev) => setEmail(ev.target.value)}/>
                    <input type="text" placeholder="Usuario" value={mesa} onChange={(ev) => setMesa(ev.target.value)}/>
                    <input type="password" placeholder="Contraseña" value={password} onChange={(ev) => setPassword(ev.target.value)}/>
                    <div>
                        <button type="submit" disabled={loading}>Enviar</button>
                    </div>
                    <p style={{color: "red"}}>{error}</p>
                </form>
            </div>
        </div>
    )
}