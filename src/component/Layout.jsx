import { Outlet, Link } from "react-router-dom"
import './layout.css'
import Logo from './../assets/logo.png'



function Layout() {
    return (
        <div>
            <div className="navbar">
                <div className="links-bar">
                    <Link id="logo" to={''}></Link>
                    <div className="links-without-logo">
                        <Link to={'tipForm'} className="link-button">
                            <div>Tip Calculator</div>
                        </Link>
                        <Link className="link-button">
                            <div id="table-tip-link">Country Tips Overview</div>
                        </Link>
                    </div>
                </div>
            </div>
            <Outlet />
        </div>
    )
}
export default Layout