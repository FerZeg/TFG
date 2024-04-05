import { loginContext } from "../../lib/context";
import { useContext } from "react";
import { Link } from "react-router-dom";
import './Header.css';
import { useLocation } from "react-router-dom";

export default function Header() {
    const { login } = useContext(loginContext);
    const { pathname } = useLocation();
    const isActive = (path) => {
        console.log(pathname, path)
        return pathname === path ? "active" : "";
    };
    return (
        <div className="main-header">
            <nav>
                <ul>
                    <li><Link to="/" className={isActive("/")}>Cocina</Link></li>
                    <li><Link to="/edit" className={isActive("/editor")}>Editor</Link></li>
                    {
                        login.data && (login.data.data.role === "admin" || login.data.data.type === "superadmin") &&
                        <>
                            <li><Link to="/admin" className={isActive("/admin")}>Admin</Link></li>
                            <li><Link to="/tickets" className={isActive("/tickets")}>Tickets</Link></li>
                        </>
                    }
                    <li><Link to="/logout">Salir</Link></li>
                </ul>
            </nav>
        </div>
    );
}