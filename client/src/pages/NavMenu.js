import { Link } from "react-router-dom"


function NavMenu() {

    

    return (
        <div className="Container">

            <nav className="navbar">
                <Link to="/" className="navbar__pagetitle">BLAZE</Link>
                <ul>
                    <li><Link to="/orders" className="navbar__option">Orders</Link></li>
                    <li><Link to="/products" className="navbar__option" >Products</Link></li>
                </ul>
            </nav>
        </div>
    )



}

export default NavMenu

