import { useEffect, useState } from "react"

import { Header } from "../Header"
import { Footer } from "../Footer"

import "../../styles/sign-in.css"

export const SignInPage = () => {
  const [userLogins, setUserLogins] = useState({});

  const handleChange = event => {
    console.log('sign in change handler:', event.target);
    const [name, value] = event.target;
    setUserLogins({...userLogins, [name]: value});
  }

  const handleSubmit = event => {
    console.log('sign in submit handler:', userLogins);
    event.preventDefault();
  }

  useEffect(() => {

  }, [userLogins])

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
              onChange={handleChange}
              required
            />
            <label htmlFor="last-name">Password:</label>
            <input 
              type="text" 
              name="password"
              onChange={handleChange}
              required
            />
            <div className="action">
              <button type="submit" className="submit-form-btn">Sign In</button>
            </div>
          </form>
        </section>
      </main>
      <Footer />
    </>
  )
}