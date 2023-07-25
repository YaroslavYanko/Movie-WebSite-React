import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import GlobalProvider from "../context/ListMovieContext";
import GlobalContext from "../context/ListMovieContext";

import "./MyListMovie.css";

function MyListMovie() {
  const { movieList, removeMovieFromWatchList } = useContext(GlobalContext);
  const [loadedMovies, setLoadedMovies] = useState([]);


  const imagePath = "https://image.tmdb.org/t/p/original";
  const apiKey = "9c1059867e4c0dbc6542a529b5a52aa8";

  useEffect(() => {
    // Отримання id фільмів з localStorage
    let storedMovies = localStorage.getItem("movies");
    let idArray = storedMovies ? storedMovies.split(",") : [];

    // Запит до API для отримання даних про кожен фільм за його id
    const fetchMovies = async () => {
      const moviesPromises = idArray.map(async (id) => {
        const res = await fetch(
          `https://api.themoviedb.org/3/movie/${id}?api_key=${apiKey}&append_to_response=videos,images`
        );
        const data = await res.json();
        return data;
      });

      Promise.all(moviesPromises)
        .then((moviesData) => {
          setLoadedMovies(moviesData);
        })
        .catch((error) => {
          console.log("Error fetching movies data:", error);
        });
    };

    fetchMovies();
  }, [movieList]);

  return (
    <div className="movieList">
      {loadedMovies.length > 0 ? (
        loadedMovies.map((movie) => (
          <div key={movie.id} className="movie_box">
            <Link to={`/movie/${movie.id}`}>
              {movie.poster_path ? (
                <img
                  className="movie_poster"
                  src={`${imagePath}${movie.poster_path}`}
                  alt={movie.original_title}
                />
              ) : null}
            </Link>
            <button
              className="btn"
              onClick={() => removeMovieFromWatchList(movie)}
            >
              Remove from list
            </button>
            <h4>{movie.title}</h4>
            <p>{movie.release_date?.slice(0, 4)}</p>
          </div>
        ))
      ) : (
        <h1>Movies List is empty</h1>
      )}
    </div>
  );
}

export default MyListMovie;












