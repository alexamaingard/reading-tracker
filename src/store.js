import React from "react";

export const StoreContext = React.createContext();

export class StoreActions {
  static setGeneralLibrary = "setGeneralLibrary";
  static setUser = "setUser";
  static addReadBookToUser = "addReadBookToUser";
  static addReadingBookToUser = "addReadingBookToUser";

  static setFilter_ISBN = "setFilterISBN";
  static setFilter_string = "setFilterString";
}

export const initialState = {
  userLogins: {
    username: "",
    password: "",
  },
  userLibraries: {
    read: [],
    reading: [],
  },
  generalLibrary: [],
  filters: {},
};

export const initialFilters = {
  filterByISBN: "",
  filterByString: "",
};

export const setGeneralLibraryReducer = (state, action) => {
  switch (action.type) {
    case StoreActions.setGeneralLibrary:
      return action.payload;
    default:
      return state;
  }
};

//USER STATE REDUCERS
export const setUserReducer = (state, action) => {
  switch (action.type) {
    case StoreActions.setUser:
      return action.payload;

    default:
      return state;
  }
};

export const addBookToUserReducer = (state, action) => {
  console.log("here state:", state);
  switch (action.type) {
    case StoreActions.addReadBookToUser:
      return { 
        ...state, 
        read: [
          ...state.read, 
          action.payload
        ] 
      };
    case StoreActions.addReadingBookToUser:
      return { ...state, reading: [...state.reading, action.payload] };
    default:
      return state;
  }
};

/*
const combineReducers = reducers => {
  return (state = {}, action) => {
    const newState = {}
    for (let key in reducers) {
      newState[key] = reducers[key](state[key], action)
    }
    return newState
  }
}

export const rootReducer = combineReducers({
  generalLibrary: setGeneralLibraryReducer,
  setUser: setUserReducer,
  addReadBookToUser: addBookToUserReducer,
  addReadingBookToUser: addBookToUserReducer
})
*/
