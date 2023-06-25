import './navbar.css'
import { Outlet, Link } from "react-router-dom"
function Navbar() {
    return (
        <ul>
            <li><a className="active" href="#home">Home</a></li>
            <li><a href="#news">News</a></li>
            <li><a href="#contact">Contact</a></li>
            <li><a href="#about">About</a></li>
        </ul>

    )
}
export default Navbar