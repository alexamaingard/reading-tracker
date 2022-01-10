export const ReadBook = (props) => {
  const { book, index } = props;

  return (
    <li className="book" key={index}>
      <div className="book-left">
        <img className="book-cover-small" src="" alt="" />
        <div className="book-info">
          <h4 className="book-title">{book.title}</h4>
          <p className="book-author">{book.author}</p>
        </div>
        <p className="isbn">{book.isbn}</p>
        <div className="book-actions">
          <button className="book-action">View</button>
        </div>
      </div>
    </li>
  );
};
