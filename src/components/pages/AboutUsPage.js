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
            <h3>&nbsp;</h3>
            <p>&nbsp;</p>
          </div>
          <div className="about-us-info">
            <h3>&nbsp;</h3>
            <p>&nbsp;</p>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}