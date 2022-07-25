import Popular from "../components/Popular";

import "./home.css";

import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function Home() {
  const imagePath = "https://image.tmdb.org/t/p/w500";
  const apiKey = "9c1059867e4c0dbc6542a529b5a52aa8";

  const [movies, setMovies] = useState([]);
  const [movieName, setSearchMovie] = useState("");

  const getMovies = async (searchName) => {
    try {
      const serch = searchName ? "search/movie" : "movie/top_rated";
      const name = searchName ? `&query=${searchName}` : "";

      const res = await fetch(
        `https://api.themoviedb.org/3/${serch}?api_key=${apiKey}${name}`
      );
      const data = await res.json();

      setMovies(data.results);
    } catch (err) {
      console.log(`Error in Home page ${err}`);
    }
  };

  const searchMovie = function (e) {
    e.preventDefault();
    const name = e.target.value;
    setSearchMovie(name);
    getMovies(movieName);
  };

  const handleHoverEnter = function (e) {
    const link = e.target;
    link.style.boxShadow = '5px 5px 10px 5px rgba(0,0,0,0.29)'
  
  };
  const handleHoverLeave = function(e){
    const link = e.target;
    link.style.boxShadow = 'none'
  }

  useEffect(() => {
    getMovies();
  }, []);

  return (
    <div>
      <Popular />
      <form className="search_form" onSubmit={searchMovie}>
        <input
          placeholder="Serch to website..."
          type="text"
          onChange={(e) => setSearchMovie(e.target.value)}
        />
        <button type={"submit"}>Search</button>
      </form>

      <div className="movies_container">
        {movies.map((movie) => {
          return (
            <Link key={movie.id} to={`/movie/${movie.id}`}>
              <div className="movie_box">
                {movie.poster_path ? (
                  <img
                    onMouseEnter={handleHoverEnter}
                    onMouseLeave={handleHoverLeave}
                    className="movie_poster"
                    src={`${imagePath}${movie.poster_path}`}
                    alt={movie.original_title}
                  />
                ) : null}
                <h4>{movie.title}</h4>
                <p>{movie.release_date?.slice(0, 4)}</p>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}

export default Home;
