import { useContext } from "react";
import { StoreContext } from "../../store";
import { ReadBook } from "./ReadBook";

export const ReadLibrary = (props) => {
  const { read } = props;

  //const store = useContext(StoreContext);
  //console.log("library:", store.state.usersLibraries.read);

  return (
    <ul className="books-container">
      {read.map((book, index) => (
        <ReadBook book={book} index={index} />
      ))}
    </ul>
  );
};
