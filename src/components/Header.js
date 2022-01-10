import { Link } from "react-router-dom"

export const Header = () => {
    return (
        <nav>
            <div id="nav-logo">
                <Link to="/"><img id="logo" src={process.env.PUBLIC_URL + `assets/images/logo-s.png`} alt="logo" /></Link>
            </div>
            <div className="nav-right">
                <div className="page-links">
                <Link to="/sign-in">Sign In/Out</Link>
                <Link to="/about-us">About Us</Link>
                <Link to="/contact-us">Contact Us</Link>
                </div>
            </div>
        </nav>
    )
}