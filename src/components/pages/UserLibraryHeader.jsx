import { useState, useEffect, useContext } from "react";
import { LocalAPIEndPoints } from "../../config";
//import { StoreActions, StoreContext } from "../../store";
import { fetchBookInfo } from "../../utils";

export const UserLibraryHeader = (props) => {
  const {
    chosenLibrary,
    setChosenLibrary,
    dataBaseLibrary,
    setDataBaseLibrary,
    readLibrary,
    setReadLibrary,
    readingLibrary,
    setReadingLibrary
  } = props;
  //const store = useContext(StoreContext);
  //console.log(store);

  const [isbnToAdd, setIsbnToAdd] = useState("");
  const [addBookSubmit, setAddBookSubmit] = useState(false);
  const [newBook, setNewBook] = useState({});

  console.log("header > chosen library:", chosenLibrary);

  const handleLibrarySelector = (event) => {
    setChosenLibrary(event.target.value);
  };

  const handleAddBookChange = (event) => {
    console.log("isbn:", event.target.value);
    setIsbnToAdd(event.target.value);
  };

  const handleAddBookSubmit = (event) => {
    event.preventDefault();
    setAddBookSubmit(true);
  };

  //Fetch Book/Check if already stored in library
  useEffect(() => {
    if (addBookSubmit) {
      const alreadyStoredBook = dataBaseLibrary.find(
        (book) => book.isbn === isbnToAdd
      );
      console.log("header > alreadyStoredBook:", alreadyStoredBook);
      if (alreadyStoredBook) {
      }
      setAddBookSubmit(false);
    }
  }, [addBookSubmit, dataBaseLibrary, isbnToAdd]);

  return (
    <header className="user-bar">
      <form onChange={handleLibrarySelector}>
        <select>
          <option value="default">My Libraries</option>
          <option value="readLibrary">Read</option>
          <option value="readingLibrary">Currently Reading</option>
          <option value="pendingLibrary">Want to Read</option>
        </select>
      </form>
      <form className="search-bar-container">
        <h3>Search in library:</h3>
        <input
          id="search-in-library"
          type="text"
          placeholder="Insert title, author or ISBN"
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
    </header>
  );
}; /*

/*
  const [addBookSubmit, setAddBookSubmit] = useState(false);
  const [isbnToAdd, setIsbnToAdd] = useState("");
  const [newBookToAdd, setNewBookToAdd] = useState({});
  const [postBook, setPostBook] = useState(false);

  const handleLibrarySelectorChange = (event) => {
    setChosenLibrary(event.target.value);
  };

  const handleAddBookChange = (event) => {
    setIsbnToAdd(event.target.value);
  };
  
  const handleAddBookSubmit = (event) => {
    event.preventDefault();
    setAddBookSubmit(true);
  };

  //console.log(newBookToAdd);

    useEffect(() => {
    const fetchBook = async () => {
      console.log("inside fetchBook useEffect");
      const book = await fetchBookInfo(isbnToAdd);
      setNewBookToAdd(book);
    }

    if(addBookSubmit){
      const bookFound = library.find(book => book.isbn === isbnToAdd);
      if(bookFound){
        //get id and add it to user
        console.log("book found:", bookFound);
        console.log("current shelf:", chosenLibrary);
      }
      else{
        fetchBook();
        setPostBook(true);
      }  
      setAddBookSubmit(false); 
    }
  }, [addBookSubmit, isbnToAdd, library, chosenLibrary, postBook]);

  useEffect(() => {
    const addBookToUserLibrary = (bookId) => {
      if(chosenLibrary === "read"){
        /*store.dispatch({
          type: StoreActions.addReadBookToUser,
          payload: bookId
        });*/ /*
      }
      else if (chosenLibrary === "reading"){
        /*store.dispatch({
          type: StoreActions.addReadingBookToUser,
          payload: bookId
        });*/ /*
      }
    }

    const postBookToLibrary = async () => {
      let bookId;
      const res = await fetch(LocalAPIEndPoints.libraryURL, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(newBookToAdd)
      });
      const data = await res.json();
      bookId = data.id;
      console.log("bookId:", bookId);
      setLibrary([...library, newBookToAdd]);
      addBookToUserLibrary(bookId);
    }

    if(postBook){
      postBookToLibrary();
      setPostBook(false);
    }
  }, [postBook, newBookToAdd, setLibrary, library, chosenLibrary]);
*/
