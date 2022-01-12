import { useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
//import { StoreContext } from '../../store'

import { Header } from "../Header";
import { Footer } from "../Footer";

import { LocalAPIEndPoints } from "../../config";

import "../../styles/sign-in.css";

export const SignInPage = props => {
  //const store = useContext(StoreContext);
  const { setUser } = props;

  const [userLogins, setUserLogins] = useState({
    username: "",
    password: "",
  });
  const [usersDataList, setUsersDataList] = useState({});
  const [initialFetch, setInitialFetch] = useState(true);
  const [userLoginsSubmit, setUserLoginsSubmit] = useState(false);

  const navigate = useNavigate();

  //Fetch list of users
  useEffect(() => {
    const fetchUsersData = async () => {
      try {
        const res = await fetch(LocalAPIEndPoints.usersURL);
        const data = await res.json();
        console.log("users:", data);
        setUsersDataList(data);
      } catch (error) {
        console.log(error);
      }
    };
    initialFetch && fetchUsersData();
    setInitialFetch(false);
  }, [usersDataList, initialFetch]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setUserLogins({ ...userLogins, [name]: value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setUserLoginsSubmit(true);
  };

  //Find user
  useEffect(() => {
    const getUserData = () => {
      const userFound = usersDataList.find(
        (user) =>
          user.userLogins.username === userLogins.username &&
          user.userLogins.password === userLogins.password
      );
      if (userFound) {
        console.log("selected user:", userFound);
        setUser(userFound);
        /*
        store.dispatch({
          type: "setUser",
          payload: userFound
        });*/
        navigate(`/${userLogins.username}`, { replace: true });
      }
      //alert wrong password or non-existing user
    };
    userLoginsSubmit && getUserData();
    setUserLoginsSubmit(false);
  }, [userLoginsSubmit, userLogins, usersDataList, navigate, setUser]);

  return (
    <>
      <Header />
      <main className="sign-in-page-container">
        <h1 className="page-title">Sign In</h1>
        <section className="username-form">
          <form className="contact-form" onSubmit={handleSubmit}>
            <label htmlFor="first-name">Username:</label>
            <input
              type="text"
              name="username"
              value={userLogins.username}
              onChange={handleChange}
              required
            />
            <label htmlFor="last-name">Password:</label>
            <input
              type="text"
              name="password"
              value={userLogins.password}
              onChange={handleChange}
              required
            />
            <div className="action">
              <button type="submit" className="submit-form-btn">
                Sign In
              </button>
            </div>
          </form>
        </section>
      </main>
      <Footer />
    </>
  );
};