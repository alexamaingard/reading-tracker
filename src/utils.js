import { ExternalAPIEndPoints } from "./config";

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
    cover: fetchedData.imageLinks.thumbnail,
    description: fetchedData.description,
    pages: fetchedData.pageCount,
  };
};

export const fetchBookInfo = async (ISBN) => {
  if(isValidISBN(ISBN)){
    const res = await fetch(ExternalAPIEndPoints.searchURL + ISBN);
    const data = await res.json();
  
    const cleanData = cleanBookData(data.items[0].volumeInfo, ISBN);
    console.log("utils.js", cleanData);
    return cleanData;
  }
};