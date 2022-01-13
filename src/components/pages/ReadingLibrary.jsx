import { useContext } from "react";
import { StoreContext } from "../../store";
import { ReadingBook } from "./ReadingBook";

export const ReadingLibrary = (props) => {
  const store = useContext(StoreContext);

  return (
    <ul className="books-container">
      {store.state.userLibraries.reading.map((bookId, index) => {
        //console.log(bookId);
        const readingBook = store.state.dataBaseLibrary.find(book => book.id === bookId);
        //console.log(readingBook);
        return(<li key={index}>
          <ReadingBook readingBook={readingBook} />
        </li>)
        }
      )}
    </ul>
  );
};