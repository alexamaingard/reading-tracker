import { useEffect, useState } from "react"

import { Header } from "../Header"
import { Footer } from "../Footer"

import "../../styles/contact-us.css"

export const ContactUsPage = () => {
  const [contactForm, setContactForm] = useState({});

  const handleChange = event => {
    console.log('contact form change handler:', event.target);
    const [name, value] = event.target;
    setContactForm({...contactForm, [name]: value});
  }

  const handleSubmit = event => {
    console.log('contact form submit handler:', contactForm);
    event.preventDefault();
  }

  useEffect(() => {
    //post contact form to local storage
  }, [contactForm])

  return (
    <>
      <Header />
      <main className="contact-us-page">
        <h1 className="page-title">Get in Touch!</h1>
        <section className="contact-us-container">
          <form className="contact-form" onSubmit={handleSubmit}>
            <label htmlFor="first-name">First Name:</label>
            <input 
              type="text" 
              id="first-name"
              name="firstName"
              onChange={handleChange} 
              required 
            />
            <label htmlFor="last-name">Last Name:</label>
            <input 
              type="text" 
              id="last-name"
              name="lastName" 
              onChange={handleChange}
              required 
            />
            <label htmlFor="email">Email:</label>
            <input 
              type="email" 
              id="email"
              name="email" 
              onChange={handleChange}
              required 
            />
            <label htmlFor="message">Message:</label>
            <textarea 
              name="message" 
              id="message" 
              cols="30" 
              rows="10" 
              placeholder="Type your message here.." 
              onChange={handleChange}
              required>
            </textarea>
            <div className="action">
              <button 
                className="submit-form-btn" 
                id="contact-form-btn" 
                type="submit"
              >
                Submit
              </button>
            </div>
          </form>
        </section>
      </main>
      <Footer />
    </>
  )
}