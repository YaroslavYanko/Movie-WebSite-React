import React from "react";
import Home from "./Home";
import MoviePage from "./MoviePage";
import HeaderMenu from "./HeaderMenu";
import MyListMovie from './MyListMovie'
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { GlobalProvider } from '../context/ListMovieContext'

function Pages() {
  return (
    <GlobalProvider>
      <BrowserRouter>
        <HeaderMenu />
        <Routes>
          <Route path="/mylist" element={<MyListMovie/>} />
          <Route path="/" element={<Home />} />
          <Route path="/movie/:id" element={<MoviePage />} />
        </Routes>
      </BrowserRouter>
    </GlobalProvider>
  );
}

export default Pages;
