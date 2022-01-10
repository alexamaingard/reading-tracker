import { useContext, useEffect, useState } from "react";

import { StoreContext } from '../../store';
import { LocalAPIEndPoints } from "../../config";

import { Header } from "../Header";
import { Footer } from "../Footer";
import { UserLibraryHeader } from "./UserLibraryHeader";
import { ReadLibrary } from "./ReadLibrary";
import { ReadingLibrary } from "./ReadingLibrary";

import "../../styles/library.css";

export const UsersPage = () => {
  const store = useContext(StoreContext);
  console.log(store);
  const [library, setLibrary] = useState({});
  const [initialFetch, setInitialFetch] = useState(true);
  const [reading, setReading] = useState({});
  const [read, setRead] = useState({});

  useEffect(() => {
    const fetchLibrary = async () => {
      const res = await fetch(LocalAPIEndPoints.libraryURL);
      const data = await res.json();
      console.log("General library:", data);
      setLibrary(data);
    }
    initialFetch && fetchLibrary();
    setInitialFetch(false);
    //set read
    //set reading
  }, [library, initialFetch]);

  const [chosenLibrary, setChosenLibrary] = useState("");
  console.log("Chosen library:", chosenLibrary);

  return (
    <>
      <Header />
      <main className="user-library">
        <h1 className="page-title">Your libraries</h1>
        <UserLibraryHeader 
          setChosenLibrary={setChosenLibrary}
          library={library}
        />
        {chosenLibrary === "read" && <ReadLibrary read={read} />}
        {chosenLibrary === "reading" && <ReadingLibrary reading={reading} />}
      </main>
      <Footer />
    </>
  );
};