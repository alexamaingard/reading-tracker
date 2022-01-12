import { useContext, useEffect, useState } from "react";

//import { StoreContext } from '../../store';
import { LocalAPIEndPoints } from "../../config";

import { Header } from "../Header";
import { Footer } from "../Footer";
import { UserLibraryHeader } from "./UserLibraryHeader";
import { ReadLibrary } from "./ReadLibrary";
import { ReadingLibrary } from "./ReadingLibrary";

import "../../styles/library.css";

export const UsersPage = (props) => {
  //const store = useContext(StoreContext);
  //console.log("Userspage store:", store);
  const {
    user,
    readLibrary,
    setReadLibrary,
    readingLibrary,
    setReadingLibrary,
    dataBaseLibrary,
    setDataBaseLibrary,
  } = props;

  const [chosenLibrary, setChosenLibrary] = useState("");
  //console.log("Chosen library:", chosenLibrary);

  return (
    <>
      <Header />
      <main className="user-library">
        <h1 className="page-title">Your libraries</h1>
        <UserLibraryHeader
          chosenLibrary={chosenLibrary}
          setChosenLibrary={setChosenLibrary}
          dataBaseLibrary={dataBaseLibrary}
          setDataBaseLibrary={setDataBaseLibrary}
          readLibrary={readLibrary}
          setReadLibrary={setReadLibrary}
          readingLibrary={readingLibrary}
          setReadingLibrary={setReadingLibrary}
        />
        {chosenLibrary === "read" && <ReadLibrary read={readLibrary} />}
        {chosenLibrary === "reading" && (
          <ReadingLibrary reading={readingLibrary} />
        )}
      </main>
      <Footer />
    </>
  );
};
