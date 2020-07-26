import React, { useState, useEffect } from "react";
import axios from "./axios";
import "./Row.css";
import YouTube from "react-youtube";
import movieTrailer from "movie-trailer"; //Gets trailer from movie name

const base_url = "https://image.tmdb.org/t/p/original/"; //Base URL for images

function Row({ title, fetchUrl, isLargeRow }) {
  const [movies, setMovies] = useState([]); //Empty array initial state
  const [trailerUrl, setTrailerUrl] = useState(""); //Store trailers

  //Runs based on a specific condition, once row loads..
  useEffect(() => {
    //if [], run once when the row loads and don't run again

    axios.get(fetchUrl).then((res) => {
      setMovies(res.data.results);
    });
    //If there is  any var being pulled from outside, need to specify it within the brackets
  }, [fetchUrl]);

  const opts = {
    height: "390",
    width: "100%",
    playerVars: {
      //https://developers.google.com/youtube/player_parameters
      autoplay: 1,
    },
  };

  const handleClick = (movie) => {
    // If player is open, close it
    if (trailerUrl) {
      setTrailerUrl("");
    } else {
      movieTrailer(movie?.title || movie?.name || movie?.original_name || "")
        .then((url) => {
          //Get parameters from URL https://www.youtube.com/watch?v=9bZkp7q19f0
          const urlParams = new URLSearchParams(new URL(url).search);
          console.log(urlParams);
          // Get parameters with the key "v"
          setTrailerUrl(urlParams.get("v"));
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  return (
    <div className="row">
      {/* Title */}
      <h2> {title}</h2>
      {/* Container > Images */}
      <div className="row_posters">
        {/* Serveral row_poster(s) */}
        {movies.map((movie) => (
          <img
            key={movie.id} //Optimisation
            onClick={() => handleClick(movie)}
            className={`row_poster ${isLargeRow && "row_posterLarge"}`} //If it isLargeRow, give additional class
            src={`${base_url}${
              isLargeRow ? movie.poster_path : movie.backdrop_path
            }`}
            alt={movie.name}
          />
        ))}
      </div>
      {/* Once we have trailerUrl, then show */}
      {trailerUrl && <YouTube videoId={trailerUrl} opts={opts} />}
    </div>
  );
}

export default Row;
