import { Route, Routes } from "react-router"
import React, { useReducer, useMemo } from 'react'
import { StoreContext, setUserReducer, initialState } from './store'

import { HomePage } from "./components/HomePage";
import { SignInPage } from "./components/pages/SignInPage";
import { AboutUsPage } from "./components/pages/AboutUsPage";
import { ContactUsPage } from "./components/pages/ContactUsPage";
import { UsersPage } from "./components/pages/UsersPage";

import "./styles/main.css"

export const App = () => {
  const [state, dispatch] = useReducer(setUserReducer, initialState);

  const store = useMemo(() => {
    return { state: state, dispatch: dispatch }
  }, [state, dispatch]);

  return (
    <>
      <StoreContext.Provider value={store}>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/sign-in" element={<SignInPage />} />
          <Route path="/:username" element={<UsersPage />} />
          <Route path="/about-us" element={<AboutUsPage />} />
          <Route path="/contact-us" element={<ContactUsPage />} />
        </Routes>
      </StoreContext.Provider>
    </>
  );
}