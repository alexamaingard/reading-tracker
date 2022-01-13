import { useState, useEffect, useContext } from "react";
import { LocalAPIEndPoints, ExternalAPIEndPoints } from "../../config";
import { StoreActions, StoreContext } from "../../store.js";

const values = {
  read: "Read",
  reading: "Reading",
  pending: "pendingLibrary",
};

export const UserLibraryHeader = () => {
  const store = useContext(StoreContext);

  const [selectedLibrarySubmit, setSelectedLibrarySubmit] = useState(false);
  const [isbnToAdd, setIsbnToAdd] = useState("");
  const [addBookSubmit, setAddBookSubmit] = useState(false);
  const [newBook, setNewBook] = useState({});

  const doDispatch = (type, payload) => {
    store.dispatch({
      type: type,
      payload: payload,
    });
  };
  console.log(store); 
  const handleLibrarySelector = (event) => {
    //console.log(event.target.value);
    doDispatch(StoreActions.setChosenLibrary, event.target.value);
    event.target.value !== "default"
      ? setSelectedLibrarySubmit(true)
      : setSelectedLibrarySubmit(false);
  };

  const handleFilterChange = (event) => {
    console.log(event.target.value);
    doDispatch(StoreActions.setFilter, event.target.value);
  }

  const handleAddBookChange = (event) => {
    setIsbnToAdd(event.target.value);
  };

  const handleAddBookSubmit = (event) => {
    event.preventDefault();
    setAddBookSubmit(true);
  };

  const isValidISBN = (isbn) => {
    if (isbn.length === 10 || isbn.length === 13) {
      for (let i = 0; i < isbn.length; i++) {
        if (isNaN(parseInt(isbn.charAt(i)))) {
          return false;
        }
      }
      return true;
    } else {
      return false;
    }
  };

  const cleanBookData = (fetchedData, ISBN) => {
    return {
      isbn: ISBN,
      title: fetchedData.title,
      authors: fetchedData.authors,
      cover: fetchedData.imageLinks
        ? fetchedData.imageLinks.thumbnail
        : "../../../public/assets/images/no-image.svg.png",
      description: fetchedData.description
        ? fetchedData.description
        : "No Description available",
      pages: fetchedData.pageCount,
    };
  };

  useEffect(() => {
    const doDispatch = (type, payload) => {
      store.dispatch({
        type: type,
        payload: payload,
      });
    };

    const updateLibrariesSwitchCase = (payload) => {
      switch (store.state.chosenLibrary) {
        case values.read:
          doDispatch(StoreActions.updateReadLibrary, payload);
          break;
        case values.reading:
          doDispatch(StoreActions.updateReadingLibrary, payload);
          break;
        default:
          break;
      }
    };

    const fetchBook = async () => {
      if (!isValidISBN(isbnToAdd)) {
        return;
      }
      try {
        const res = await fetch(ExternalAPIEndPoints.searchURL + isbnToAdd);
        const data = await res.json();
        const cleanData = cleanBookData(data.items[0].volumeInfo, isbnToAdd);
        setNewBook(cleanData);
      } catch (error) {
        console.log(error);
      }
    };

    const postBookToLibrary = async () => {
      try {
        const res = await fetch(LocalAPIEndPoints.libraryURL, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(newBook),
        });
        const postedData = await res.json();
        console.log("postedData:", postedData);
        doDispatch(StoreActions.updateDataBaseLibrary, postedData);
        updateLibrariesSwitchCase(postedData.id);
      } catch (error) {
        console.log(error);
      }
    };

    const updateUserLibrary = async () => {
      console.log("woohoo", store.state.userLibraries);
      await fetch(LocalAPIEndPoints.usersURL + store.state.userLogins.userId, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(store.state.userLibraries),
      });
    };

    if (addBookSubmit) {
      console.log("library:", store.state.dataBaseLibrary);
      const alreadyStoredBook = store.state.dataBaseLibrary.find(
        (book) => book.isbn === isbnToAdd
      );
      console.log("book found:", alreadyStoredBook);
      if (alreadyStoredBook) {
        switch (store.state.chosenLibrary) {
          case values.read:
            if (
              !store.state.userLibraries.read.includes(alreadyStoredBook.id)
            ) {
              updateLibrariesSwitchCase(alreadyStoredBook.id);
            }
            break;
          case values.reading:
            if (
              !store.state.userLibraries.reading.includes(alreadyStoredBook.id)
            ) {
              updateLibrariesSwitchCase(alreadyStoredBook.id);
            }
            break;
          default:
            break;
        }
        updateUserLibrary();
      } else {
        fetchBook();
        postBookToLibrary();
        updateUserLibrary();
      }
      setAddBookSubmit(false);
    }
  }, [addBookSubmit, isbnToAdd, store, newBook]);

  return (
    <header className="user-bar">
      <form onChange={handleLibrarySelector}>
        <select>
          <option value="default">My Libraries</option>
          <option value={values.read}>Read</option>
          <option value={values.reading}>Currently Reading</option>
          <option value={values.pending}>Want to Read</option>
        </select>
      </form>
      {selectedLibrarySubmit && (
        <>
          <form className="search-bar-container">
            <h3>Search in library:</h3>
            <input
              id="search-in-library"
              type="text"
              placeholder="Insert title or author"
              value={store.state.filter}
              onChange={handleFilterChange}
            />
            <div className="user-bar-actions">
              <button className="book-action">Search</button>
              <button className="book-action">Clear</button>
            </div>
          </form>
          <form className="add-book-container" onSubmit={handleAddBookSubmit}>
            <h3>Add Book:</h3>
            <input
              type="text"
              placeholder="Insert ISBN"
              onChange={handleAddBookChange}
            />
            <div className="user-bar-actions">
              <button className="book-action">Add Book</button>
            </div>
          </form>
        </>
      )}
    </header>
  );
};
