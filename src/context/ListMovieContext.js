import React, { createContext, useState } from "react";

const GlobalContext = createContext();

export function GlobalProvider({ children }) {
  const [movieList, setMovieList] = useState([]);

  const addMovieToWatchList = function (movie) {
    setMovieList((prevState) => [...prevState, { ...movie }]);

    let storedMovies = localStorage.getItem("movies");

    if (storedMovies && storedMovies.split(",").includes(movie.id.toString())) {
      console.log("Цей фільм вже є у списку для перегляду.");
      return;
    }

    let updatedStoredMovies = storedMovies
      ? `${storedMovies},${movie.id}`
      : movie.id;

    localStorage.setItem("movies", updatedStoredMovies);
  };
  
  const removeMovieFromWatchList = function (movie) {
    let storedMovies = localStorage.getItem("movies");

    let idArray = storedMovies ? storedMovies.split(",") : [];

    let index = idArray.indexOf(movie.id.toString());

    idArray.splice(index, 1);
    let updatedStoredMovies = idArray.join(",");
    localStorage.setItem("movies", updatedStoredMovies);

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
