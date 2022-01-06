import { Link } from "react-router-dom"

export const HomePage = () => {
  return(
    <>
      <nav>
        <div id="nav-logo">
            <Link to="/"><img id="logo" src="../assets/images/logo-s.png" alt="logo" /></Link>
        </div>
        <div class="nav-right">
            <div class="page-links">
                <a href="pages/sign-in.html">
                    <h4 className="sign-in-text">Sign In</h4>
                </a>
                <a href="pages/about-us.html">
                    <h4>About Us</h4>
                </a>
                <a href="pages/contact-us.html">
                    <h4>Contact Us</h4>
                </a>
            </div>
        </div>
      </nav>
      <main class="main-page-container">
        <div>
            <h1>Trade with bookWitch</h1>
            <hr />
            <h2>Our online book trading service</h2>
        </div>
      </main>
      <footer>
        <div className="footer-left">
            <h3 id="logo-footer">bookWitch</h3>
        </div>
        <div className="footer-right">
            <p>Copyright Alexa Maingard &copy;</p>
        </div>
      </footer>
    </>
  )
}