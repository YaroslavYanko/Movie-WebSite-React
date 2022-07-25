import React, { useContext } from "react";
import { Link } from "react-router-dom";

import "./MyListMovie.css";
import GlobalProvider from "../context/ListMovieContext";

function MyListMovie() {
  const { movieList, removeMovieFromWatchList } = useContext(GlobalProvider);

  const imagePath = "https://image.tmdb.org/t/p/original";

  return (
    
    <div className="movieList">
      {movieList.map((movie) => {
        return (
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
        );
      })}
      {movieList.length>0?'':(<h1>Movies List is empty</h1>)}
    </div>
  );
}

export default MyListMovie;
