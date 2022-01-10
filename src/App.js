import { Route, Routes } from "react-router"

import { HomePage } from "./components/HomePage";
import { SignInPage } from "./components/pages/SignInPage";
import { AboutUsPage } from "./components/pages/AboutUsPage";
import { ContactUsPage } from "./components/pages/ContactUsPage";
import "./styles/main.css"

export const App = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/sign-in" element={<SignInPage />} />
        <Route path="/about-us" element={<AboutUsPage />} />
        <Route path="/contact-us" element={<ContactUsPage />} />
      </Routes>
    </>
  );
}