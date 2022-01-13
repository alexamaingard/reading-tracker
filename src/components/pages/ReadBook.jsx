import { useState } from "react/cjs/react.development";

export const ReadBook = (props) => {
  const { readBook } = props;
  const [viewDescription, setViewDescription] = useState(false);

  const authorsString = () => {
    let authors = "";
    if (readBook.authors.length > 1) {
      for (let i = 0; i < readBook.authors.length - 1; i++) {
        authors += `${readBook.authors[i]}, ${readBook.authors[i + 1]}`;
      }
    } else {
      authors = readBook.authors[0];
    }
    return authors;
  };

  const authors = authorsString();

  const handleViewButton = () => {
    const activeView = viewDescription;
    setViewDescription(!activeView);
  };

  return (
    <>
      <div className="book">
        <div className="book-left">
          <img className="book-cover-small" src={readBook.cover} alt="" />
          <div className="book-info">
            <h4 className="book-title">{readBook.title}</h4>
            <p className="book-author">{authors}</p>
          </div>
        </div>
        <p className="isbn">
          <b>ISBN:</b>
          {readBook.isbn}
        </p>
        <div className="book-actions">
          <button className="book-action" onClick={handleViewButton}>
            View
          </button>
        </div>
      </div>
      {viewDescription && 
        <div className="view-description">
            <p>{readBook.description? readBook.description : "No description available"}</p>
        </div>
      }
    </>
  );
};
