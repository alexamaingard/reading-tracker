import { Header } from "../Header"
import { Footer } from "../Footer"

import "../../styles/about-us.css"

export const AboutUsPage = () => {
  return (
    <>
      <Header />
      <main className="about-us-main">
        <h1>About bookWitch</h1>
        <section className="about-us-container">
          <div className="about-us-info">
            <h3>Who are we?</h3>
            <p>We are a non-profitable online reading tracker service.</p>
          </div>
          <div className="about-us-info">
            <h3>How does bookWitch work?</h3>
            <p>Every user has it's own personal username. Once you provide your username, 
              you will be able to access your library. In your library you can add any 
              books you are reading, already have read or would like to read to your
              personal shelves.
            </p>
          </div>
          <div className="about-us-info">
            <h3>&nbsp;</h3>
            <p>&nbsp;</p>
          </div>
          <h2>FAQs</h2>
          <div className="about-us-info">
            <h3>Can I add books I've read in the past?</h3>
            <p>You absolutely can be using our Add Book button in your "Read" library.
              You just have to add the book to your library and it'll be automatically
              marked as Read.
            </p>
          </div>
          <div className="about-us-info">
            <h3>How many shelves/libraries can I have?</h3>
            <p>At the moment we only have the "Reading" and "Read" options. But we are 
              working on a "Want to Read" shelf and customized ones.
            </p>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}