import React from "react";

export const StoreContext = React.createContext();

export class StoreActions {
  //static fetchLibrary = "fetchLibrary";
  static setUser = "setUser";
  //static setFilter = "setFilter"
}

/*
export const initialLibrary = {};

export const setLibraryReducer = (state, action) => {
  switch(action.type){
    case StoreActions.fetchLibrary:
      return action.payload;
    default:
      return state;
  }
}
*/

export const initialState = {
  userLogins: {
    username: "",
    password: "",
  },
  libraries: {
    read: [],
    reading: [],
  },
  filters: {
    filterByName: "",
    filterByISBN: ""
  }
};

export const setUserReducer = (state, action) => {
  switch(action.type){
    case StoreActions.setUser:
      return action.payload;
    default:
      return state;
  }
}

/*
export const setFiltersReducer = (state, action) => {

}
*/