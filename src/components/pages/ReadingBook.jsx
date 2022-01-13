import { useContext } from "react";
import { useState } from "react/cjs/react.development";
import { StoreActions, StoreContext } from "../../store";

export const ReadingBook = (props) => {
  const { readingBook } = props;
  const [viewDescription, setViewDescription] = useState(false);
  const store = useContext(StoreContext);

  const authorsString = () => {
    let authors = "";
    if (readingBook.authors.length > 1) {
      for (let i = 0; i < readingBook.authors.length - 1; i++) {
        authors += `${readingBook.authors[i]}, ${readingBook.authors[i + 1]}`;
      }
    } else {
      authors = readingBook.authors[0];
    }
    return authors;
  };

  const authors = authorsString();

  const handleViewButton = () => {
    const activeView = viewDescription;
    setViewDescription(!activeView);
  };

  const handleUpdateButton = () => {

  }

  const handleDoneButton = () => {
    const index = store.state.userLibraries.reading.indexOf(readingBook.id);
    const updatedLibrary = [...store.state.userLibraries.reading];
    updatedLibrary.splice(index, 1);
    store.dispatch({
      type: StoreActions.setReadingLibrary,
      payload: updatedLibrary
    });
    store.dispatch({
      type: StoreActions.updateReadLibrary,
      payload: readingBook.id
    });
    //delete from json server
  }

  return (
    <>
      <div className="book">
        <div className="book-left">
          <img className="book-cover-small" src={readingBook.cover} alt="" />
          <div className="book-info">
            <h4 className="book-title">{readingBook.title}</h4>
            <p className="book-author">{authors}</p>
          </div>
        </div>
        <p className="isbn">
          <b>ISBN:</b>
          {readingBook.isbn}
        </p>
        <div className="book-actions">
          <button className="book-action" onClick={handleViewButton}>
            View
          </button>
          {readingBook.pages && (
            <button className="book-action" onClick={handleUpdateButton}>
              Update
            </button>
          )}
          <button className="book-action" onClick={handleDoneButton}>
            Done!
          </button>
        </div>
      </div>
      {viewDescription && (
          <div className="view-description">
            <p>{readingBook.description? readingBook.description : "No description available"}</p>
          </div>
        )}
    </>
  );
};
