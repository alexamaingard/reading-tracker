import { Header } from "./Header";
import { Footer } from "./Footer";

export const HomePage = () => {
  return (
    <>
      <Header />
      <main class="main-page-container">
        <div>
        <h1>bookWitch</h1>
        <hr />
        <h2>Our online book service</h2>
        </div>
      </main>
      <Footer />
    </>
  );
};