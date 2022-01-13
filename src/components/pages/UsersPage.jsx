import { useContext } from "react";

import { StoreContext } from '../../store';

import { Header } from "../Header";
import { Footer } from "../Footer";
import { UserLibraryHeader } from "./UserLibraryHeader";
import { ReadLibrary } from "./ReadLibrary";
import { ReadingLibrary } from "./ReadingLibrary";

import "../../styles/library.css";

export const UsersPage = (props) => {
  const store = useContext(StoreContext);

  return (
    <>
      <Header />
      <main className="user-library">
        <h1 className="page-title">Your libraries</h1>
        <UserLibraryHeader />
        {store.state.chosenLibrary === "Read" && <ReadLibrary />}
        {store.state.chosenLibrary === "Reading" && (
          <ReadingLibrary />
        )}
      </main>
      <Footer />
    </>
  );
};