import { useEffect, useState } from "react";
import styled from "styled-components";
import { Splide, SplideSlide } from "@splidejs/react-splide";
import "@splidejs/react-splide/css";

import { Link } from "react-router-dom";

import "./popular.css";

function Popular() {
  const imagePath = "https://image.tmdb.org/t/p/w500";
  //const apiKey = '9c1059867e4c0dbc6542a529b5a52aa8'
  const nameMovie = document.querySelectorAll(".block_name_movie");

  const [popular, setPopular] = useState([]);

  useEffect(() => {
    getPopular();
  }, []);

  const getPopular = async function () {
    //console.log(process.env.REACT_APP_MOVIE_API_KEY)
    try {
      const res = await fetch(
        `https://api.themoviedb.org/3/movie/popular?api_key=${process.env.REACT_APP_MOVIE_KEY}&include_adult=false`
      );
      const data = await res.json();

      setPopular(data.results);
    } catch (err) {
      console.log(`Error in Popular page ${err}`);
    }
  };

  const handleHover = function (e) {
    const link = e.target.dataset.tab;

    nameMovie.forEach((el, i) => {
      if (link === el.dataset.tab) {
        el.style.display = "flex";

        setTimeout(() => {
          el.style.opacity = 1;
        }, 200);
      } else {
        el.style.opacity = -1;
        el.style.display = "none";
      }
    });
  };
  return (
    <div className="popular_movie">
      <Wrapper>
        <Splide
          options={{
            perPage: 1,
            pagination: false,
            gap: "5ram",
          }}
        >
          {popular.map((movie) => {
            return (
              <SplideSlide key={movie.id}>
                <Card className="card">
                  <Link to={`/movie/${movie.id}`}>
                    {movie.poster_path ? (
                      <img
                        data-tab={movie.id}
                        onMouseEnter={handleHover}
                        className="movie_img"
                        src={`${imagePath}${movie.poster_path}`}
                        alt={movie.original_title}
                      />
                    ) : null}
                    <div
                      data-tab={movie.id}
                      className="block_name_movie hidden"
                    >
                      <p data-tab={movie.id} className="tex_title">
                        {movie.title}
                      </p>
                    </div>
                  </Link>
                </Card>
              </SplideSlide>
            );
          })}
        </Splide>
      </Wrapper>
    </div>
  );
}

const Wrapper = styled.div`
  margin: 4rem 0rem;
  margin: auto;
  color: white;
`;
const Card = styled.div`
  min-height: 25rem;
  overwlof: hidden;
`;

export default Popular;
