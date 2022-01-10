import { useState, useEffect } from "react";

export const UserLibraryHeader = (props) => {
  const { setChosenLibrary, library } = props;
  const [addBookSubmit, setAddBookSubmit] = useState(false);
  const [bookToAdd, setBookToAdd] = useState("");

  const handleLibrarySelectorChange = (event) => {
    setChosenLibrary(event.target.value);
  };

  const handleAddBookChange = (event) => {
    setBookToAdd(event.target.value);
  };

  const handleAddBookSubmit = (event) => {
    event.preventDefault();
    setAddBookSubmit(true);
  };

  useEffect(() => {
    //if book does not exist in general library:
    const addBookToLibrary = async () => {
      console.log(library);
    }
    if(addBookSubmit){
      const bookFoundInLibrary = library.find(book => book.isbn === bookToAdd);
      //add ID to user if it exists already in general library
    }
    setAddBookSubmit(false);
  }, [addBookSubmit, bookToAdd, library]);

  return (
    <header className="user-bar">
      <form onChange={handleLibrarySelectorChange}>
        <select>
          <option value="default">My Libraries</option>
          <option value="read">Read</option>
          <option value="reading">Currently Reading</option>
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
      <form className="add-book-container" onClick={handleAddBookSubmit}>
        <h3>Add Book:</h3>
        <input 
          type="text" 
          placeholder="Insert ISBN" 
          value={bookToAdd}
          onChange={handleAddBookChange}
        />
        <div className="user-bar-actions">
          <button className="book-action">Add Book</button>
        </div>
      </form>
    </header>
  );
};
