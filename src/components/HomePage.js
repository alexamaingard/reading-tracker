import { useContext } from 'react'
import { StoreContext } from '../store'

import { Header } from "./Header";
import { Footer } from "./Footer";

export const HomePage = () => {
  const store = useContext(StoreContext);
  //console.log(store);
  
  return (
    <>
      <Header />
      <main className="main-page-container">
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