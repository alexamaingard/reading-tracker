import React from "react";

export const StoreContext = React.createContext();

export class StoreActions {
  //signInButtonText:
  static updateSignInButtonText = "updateSignInButtonText";

  //userLogins:
  static setUserId = "setUserId";
  static setUsername = "setUsername";
  static setPassword = "setPassword";

  //userLibraries:
  static setReadLibrary = "setReadLibrary";
  static updateReadLibrary = "updateReadLibrary";
  static setReadingLibrary = "setReadingLibrary";
  static updateReadingLibrary = "updateReadingLibrary";
  static removeFromReadingLibrary = "removeFromReadingLibrary";

  //dataBaseLibrary:
  static setDataBaseLibrary = "setDataBaseLibrary";
  static updateDataBaseLibrary = "updateDataBaseLibrary";
  
  //filters:
  static setFilter = "setFilter";

  //chosenLibrary:
  static setChosenLibrary = "setChosenLibrary";
}

export const initialState = {
  signInButtonText: "Sign In",
  userLogins: {
    userId: null,
    username: "",
    password: "",
  },
  userLibraries: {
    read: [], //reference ids to dataBaseLibrary
    reading: [],
  },
  dataBaseLibrary: [],
  filter: "",
  chosenLibrary: "default"
};

export const signInButtonTextReducer = (state, action) => {
  switch(action.type){
    case StoreActions.updateSignInButtonText:
      return action.payload;
    default:
      return state;
  }
}

export const userLoginsReducer = (state, action) => {
  switch(action.type){
    case StoreActions.setUserId:
      return {
        ...state,
        userId: action.payload
      }
    case StoreActions.setUsername:
      return {
        ...state,
        username: action.payload
      }
    case StoreActions.setPassword:
      return {
        ...state,
        password: action.payload
      }
    default:
      return state;
  }
}

export const userLibraryReducer = (state, action) => {
  switch (action.type) {
    case StoreActions.setReadLibrary:
      return {
        ...state,
        read: action.payload
      }
    case StoreActions.updateReadLibrary:
      return {
        ...state,
        read: [
          ...state.read,
          action.payload
        ]
      }
    case StoreActions.setReadingLibrary:
      return {
        ...state,
        reading: action.payload
      }
    case StoreActions.updateReadingLibrary:
      return {
        ...state,
        reading: [
          ...state.reading,
          action.payload
        ]
      }
    default:
      return state;
  }
};

export const dataBaseLibraryReducer = (state, action) => {
  switch(action.type){
    case StoreActions.setDataBaseLibrary:
      return action.payload;
    case StoreActions.updateDataBaseLibrary:
      return [
        ...state,
        action.payload
      ]
    default:
      return state;
  }
}

export const filtersReducer = (state, action) => {
  switch(action.type){
    case StoreActions.setFilter:
      return action.payload;
    default:
      return state;
  }
}

export const chosenLibraryReducer = (state, action) => {
  switch(action.type){
    case StoreActions.setChosenLibrary:
      return action.payload;
    default:
      return state;
  }
}

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
  signInButtonText: signInButtonTextReducer,
  userLogins: userLoginsReducer,
  userLibraries: userLibraryReducer,
  dataBaseLibrary: dataBaseLibraryReducer,
  filters: filtersReducer,
  chosenLibrary: chosenLibraryReducer
});