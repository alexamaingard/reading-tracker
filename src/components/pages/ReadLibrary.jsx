import { useContext } from "react";
import { StoreContext } from "../../store";
import { ReadBook } from "./ReadBook";

export const ReadLibrary = () => {
  const store = useContext(StoreContext);

  return (
    <ul className="books-container">
      {store.state.userLibraries.read.map((bookId, index) => {
        //console.log(bookId);
        const readBook = store.state.dataBaseLibrary.find(book => book.id === bookId);
        //console.log(readBook);
        return(<li key={index}>
          <ReadBook readBook={readBook} />
        </li>)
        }
      )}
    </ul>
  );
};
