import { useContext } from "react";
import { StoreContext } from "../../store";
import { ReadingBook } from "./ReadingBook";

export const ReadingLibrary = (props) => {
  const { reading } = props;

  const store = useContext(StoreContext);
  console.log(store);

  return (
    <ul className="books-container">
      {reading.map((book, index) => 
        <ReadingBook book={book} index={index} />
      )}
    </ul>
  );
};
