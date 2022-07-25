import React, { createContext, useState } from "react";

const GlobalContext = createContext();

export function GlobalProvider({ children }) {
  const [movieList, setMovieList] = useState([]);

  const addMovieToWatchList = function (movie) {
    setMovieList((prevState) => [...prevState, { ...movie }]);
  
  };
  const removeMovieFromWatchList = function (movie) {
    setMovieList(movieList.filter((mov) => mov.id !== movie.id));
  };
  return (
    <GlobalContext.Provider
      value={{ movieList, addMovieToWatchList, removeMovieFromWatchList }}
    >
      {children}
    </GlobalContext.Provider>
  );
}

export default GlobalContext;
