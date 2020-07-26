import React, { useState, useEffect } from "react";
import axios from "./axios";
import requests from "./requests";
import "./style/Banner.css";

function Banner() {
  const [movie, setMovie] = useState([]);

  useEffect(() => {
    axios
      .get(requests.fetchNetflixOriginals)
      .then((res) => {
        //Get 1 random movie
        setMovie(
          res.data.results[
            Math.floor(Math.random() * res.data.results.length - 1)
          ]
        );
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const truncate = (str, n) => {
    return str?.length > n ? str.substr(0, n - 1) + "..." : str;
  };

  return (
    //Background image
    <header
      className="banner"
      style={{
        backgroundSize: "cover", //Use up all the size in the container
        backgroundImage: `url("https://image.tmdb.org/t/p/original/${movie?.backdrop_path}")`, //?, If the movies is undefined will not crash
        backgroundPosition: "center center",
      }}
    >
      <div className="banner_contents">
        {/* title */}
        <h1 className="banner_title">
          {movie?.title || movie?.name || movie?.original_name}
        </h1>
        {/* div > 2 buttons */}
        <div className="banner_buttons">
          <button className="banner_button">Play</button>
          <button className="banner_button">My List</button>
        </div>
        {/* desctiption */}
        <h1 className="banner_description">{truncate(movie?.overview, 150)}</h1>
      </div>

      <div className="banner--fadeBottom" />
    </header>
  );
}

export default Banner;
