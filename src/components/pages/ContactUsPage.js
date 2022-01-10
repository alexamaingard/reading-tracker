import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"

import { Header } from "../Header"
import { Footer } from "../Footer"

import { APIEndPoints } from "../../config"

import "../../styles/contact-us.css"

const initialContactForm = {
  firstName: "",
  lastName: "",
  email: "",
  message: ""
};

export const ContactUsPage = () => {
  const [contactForm, setContactForm] = useState(initialContactForm);
  const [submitForm, setSubmitForm] = useState(false);

  const navigate = useNavigate();

  const handleChange = event => {
    const {name, value} = event.target;
    setContactForm({...contactForm, [name]: value});
  }
  //console.log('contact form:', contactForm);
  
  const handleSubmit = event => {
    event.preventDefault();
    setSubmitForm(true);
  }

  useEffect(() => {
    const postContactForm = async () => {
      try {
        await fetch(APIEndPoints.contactURL, {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify(contactForm)
        });
        navigate("/", {replace: true});
      }
      catch (error) {
        console.log(error);
      }
    }
    submitForm && postContactForm();
    setSubmitForm(false);
  }, [contactForm, submitForm, navigate]);

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
              value={contactForm.firstName}
              onChange={handleChange} 
              required 
            />
            <label htmlFor="last-name">Last Name:</label>
            <input 
              type="text" 
              id="last-name"
              name="lastName" 
              value={contactForm.lastName}
              onChange={handleChange}
              required 
            />
            <label htmlFor="email">Email:</label>
            <input 
              type="email" 
              id="email"
              name="email" 
              value={contactForm.email}
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
              value={contactForm.message}
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