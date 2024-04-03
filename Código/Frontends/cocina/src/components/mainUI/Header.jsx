import { loginContext } from "../../lib/context";
import { useContext } from "react";
import { Link } from "react-router-dom";

export default function Header() {
    const { login } = useContext(loginContext);
    return (
        <div>
            <nav>
                <ul>
                    <li><Link to="/">Cocina</Link></li>
                    <li><Link to="/edit">Editor</Link></li>
                    {
                        login.data && (login.data.data.role === "admin" || login.data.data.type === "superadmin") &&
                        <>
                            <li><Link to="/admin">Admin</Link></li>
                            <li><Link to="/tickets">Tickets</Link></li>
                        </>
                    }
                    <li><Link to="/logout">Salir</Link></li>
                </ul>
            </nav>
        </div>
    );
}