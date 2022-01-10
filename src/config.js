export class LocalAPIEndPoints {
  static baseURL = "http://localhost:3030/";
  static usersURL = "http://localhost:3030/users/";
  static libraryURL = "http://localhost:3030/library";
  static contactURL = "http://localhost:3030/contact";
}

export class ExternalAPIEndPoints {
  static searchURL_I = 'https://openlibrary.org/api/books?bibkeys=ISBN:';
  static searchURL_II = '&jscmd=data&format=json';
  static descriptionURL_I = 'https://www.googleapis.com/books/v1/volumes?q=isbn:';
}