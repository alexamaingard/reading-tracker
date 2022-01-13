import { useContext } from "react";
import { Link } from "react-router-dom";
import { StoreActions, StoreContext } from "../store";

export const Header = () => {
  const store = useContext(StoreContext);

  const handleClick = (event) => {
    if (event.target.innerText === "Sign Out") {
      store.dispatch({
        type: StoreActions.updateSignInButtonText,
        payload: "Sign In",
      });
    }
  };

  return (
    <nav>
      <div id="nav-logo">
        <Link to="/">
          <img
            id="logo"
            src={process.env.PUBLIC_URL + `assets/images/logo-s.png`}
            alt="logo"
          />
        </Link>
      </div>
      <div className="nav-right">
        <div className="page-links">
          <Link to="/sign-in" onClick={handleClick}>
            {store.state.signInButtonText}
          </Link>
          <Link to="/about-us">About Us</Link>
          <Link to="/contact-us">Contact Us</Link>
        </div>
      </div>
    </nav>
  );
};
