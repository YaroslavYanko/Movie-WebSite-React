import { useEffect, useState, useContext } from "react";
import YouTube from "react-youtube";
import { useParams } from "react-router-dom";

import GlobalProvider from "../context/ListMovieContext";

import "./moviePage.css";

const PageMovie = () => {
  const imagePath = "https://image.tmdb.org/t/p/original";
  const apiKey = "9c1059867e4c0dbc6542a529b5a52aa8";

  const { addMovieToWatchList, movieList, removeMovieFromWatchList } =
    useContext(GlobalProvider);

  let idMovie = useParams();

  const [movie, setMovie] = useState([]);

  let storedMovies = localStorage.getItem("movies");

  let idArray = storedMovies ? storedMovies.split(",") : [];

  let storeMovie = idArray.find((id) => +id === +idMovie.id);

  let btnDisabled = storeMovie ? true : false;

  const getMovie = async function () {
    try {
      const res = await fetch(
        `https://api.themoviedb.org/3/movie/${idMovie.id}?api_key=${apiKey}&append_to_response=videos,images`
      );
      const data = await res.json();
      setMovie(data);
    } catch (err) {
      console.log(`Problem in MoviePage ${err}`);
    }
  };

  useEffect(() => {
    getMovie();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [idMovie]);

  const infoMovie = function (info) {
    const el = info.map((el) => {
      return el.name;
    });

    return(<p>{el.join(", ")} </p>)
  };

  const searchTrailer = function () {
    let trailer = movie.videos.results.find((tr) => {
      if (tr.name === "Official Trailer") {
        return tr;
      } else {
        return true;
      }
    });
    return <YouTube className="trailer_box" videoId={trailer?.key} />;
  };

  return (
    <div>
      <div
        className="movie_backdrop"
        data-tab={movie.id}
        style={{
          backgroundImage: `url(${
            movie.poster_path ? imagePath + movie.backdrop_path : null
          })`,
        }}
      >
        
      </div>
      <div className="info_movie_page">
        {movie.poster_path ? (
          <img
            data-tab={movie.id}
            className="movie_img_page"
            src={`${imagePath + movie.poster_path}`}
            alt={movie.original_title}
          />
        ) : null}
        <div className="info_movie_page main_info">
          <h1>{movie.title}</h1>

          <div className="box_info">
            <ul className="box_info_ul">
              <li>
                <span onClick={() => infoMovie(movie.genres)}>Year:</span>
              </li>
              <li>
                <span>Rating:</span>
              </li>
              <li>
                <span>Genres:</span>
              </li>
              <li>
                <span>Countries:</span>
              </li>
              <li>
                <span>Companies:</span>
              </li>
            </ul>
            <ul>
              <li className="info">
                <p>{movie.release_date?.slice(0, 4)}</p>
              </li>
              <li className="info">
                <p>{movie.vote_average}</p>
              </li>

              <li className="info">
               {movie.genres?infoMovie(movie.genres):''}
              </li>
     
              <li className="info">
                { movie.production_countries?infoMovie(movie.production_countries):''}
              </li>
             
              <li className="info">
                {movie.production_companies?infoMovie(movie.production_companies):''}
              </li>
            </ul>
          
          </div>

          {btnDisabled ? (
              <button
                onClick={() => removeMovieFromWatchList(movie)}
                className="btn removeList"
              >
                Remove in list
              </button>
            ) : (
              <button
                className="btn addList"
                onClick={() => addMovieToWatchList(movie)}
              >
                Add to list
              </button>
            )}
        </div>
      </div>
      <div className="movie_overview">
        <div className="overview_text">
          <h2>Description:</h2>
          <br />
          <p>{movie.overview}</p>
        </div>
      </div>

      {movie.videos && searchTrailer()}
      <br />
    </div>
  );
};

export default PageMovie;
