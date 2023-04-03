import { Link, useNavigate } from "react-router-dom"
import "./NavBar.css"

export const NavBar = () => {
    const navigate = useNavigate()

    return (
        <ul className="navbar">
            <li className="navbar__item active">
                <Link className="navbar__link" to="/login">LOGIN</Link> </li>
                <li className="navbar__item active">
                <Link className="navbar__link" to="/register">REGISTER</Link>
                            </li>       
                <li className="navbar__item active">
                <Link className="navbar__link" to="products">QR PRODUCTS</Link>
            </li>
            <li className="navbar__item active">
                <Link className="navbar__link" to="orders">MY ORDERS</Link>
            </li>
            {
                localStorage.getItem("QueenRoots_user")
                    ? <li className="navbar__item navbar__logout">
                        <Link className="navbar__link" to="" onClick={() => {
                            localStorage.removeItem("QueenRoots_user")
                            navigate("/", {replace: true})
                        }}>LOGOUT</Link>
                    </li>
                    : ""
            }
        </ul>
    )
}

