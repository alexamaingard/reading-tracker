import { Route, Routes } from "react-router";
//import React, { useReducer, useMemo } from "react";
//import { StoreContext, setUserReducer, initialState } from "./store";

import { HomePage } from "./components/HomePage";
import { SignInPage } from "./components/pages/SignInPage";
import { AboutUsPage } from "./components/pages/AboutUsPage";
import { ContactUsPage } from "./components/pages/ContactUsPage";
import { UsersPage } from "./components/pages/UsersPage";

import "./styles/main.css";
import { useEffect, useState } from "react";
import { LocalAPIEndPoints } from "./config";

export const App = () => {
  //const [state, dispatch] = useReducer(setUserReducer, initialState);
  /*
  const store = useMemo(() => {
    return { state: state, dispatch: dispatch }
  }, [state, dispatch]);

  <StoreContext.Provider value={store}>
  </StoreContext.Provider>
  */

  const [dataBaseLibrary, setDataBaseLibrary] = useState([]);
  const [initialBaseLibraryFetch, setInitialBaseLibraryFetch] = useState(true);
  const [user, setUser] = useState({
    userLogins: {
      username: "lexymcr",
      password: "test123",
    },
    userLibraries: {
      read: [],
      reading: [],
    },
  });
  const [readLibrary, setReadLibrary] = useState([]);
  const [readingLibrary, setReadingLibrary] = useState([]);

  //Fetch Library Database
  useEffect(() => {
    const fetchLibrary = async () => {
      try {
        const res = await fetch(LocalAPIEndPoints.libraryURL);
        const data = await res.json();
        console.log("General library:", data);
        setDataBaseLibrary(data);
      }
      catch(error){
        console.log(error);
      }

    }
    initialBaseLibraryFetch && fetchLibrary();
    setInitialBaseLibraryFetch(false);
  }, [initialBaseLibraryFetch, dataBaseLibrary]);

  return (
    <>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route
          path="/sign-in"
          element={<SignInPage setUser={setUser} />}
        />
        <Route
          path="/:username"
          element={
            <UsersPage
              user={user}
              readLibrary={readLibrary}
              setReadLibrary={setReadLibrary}
              readingLibrary={readingLibrary}
              setReadingLibrary={setReadingLibrary}
              dataBaseLibrary={dataBaseLibrary}
              setDataBaseLibrary={setDataBaseLibrary}
            />
          }
        />
        <Route path="/about-us" element={<AboutUsPage />} />
        <Route path="/contact-us" element={<ContactUsPage />} />
      </Routes>
    </>
  );
};
