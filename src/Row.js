import React, { useState, useEffect } from "react";
import axios from "./axios";
import "./Row.css";
import Youtube from "react-youtube";
import movieTrailer from "movie-trailer";

const base_url = "https://image.tmdb.org/t/p/original";

function Row({ title, fetchUrl, isLargeRow }) {
  const [movies, setMovie] = useState([]);
  const [trailerUrl, setTrailerUrl] = useState("");

  useEffect(() => {
    async function fetchData() {
      const request = await axios.get(fetchUrl);
      setMovie(request.data.results);
      return request;
    }
    fetchData();
    //この下の[input]が空であれば、ページロードごとに1回だけuseEffectを起動。
    //[input]に要素（この場合はfetchUrl）を入れると、fetchUrlの要素が変動するたびにuseEffectを起動。
  }, [fetchUrl]);

  const opts = {
    height: "390",
    width: "100%",
    playerVars: {
      autoplay: 1,
    },
  };

  const handleClick = (movie) => {
    /*既にトレーラーが表示されているときにクリックされると、動画を閉じる（trailerUrlを空にする) */
    if (trailerUrl) {
      setTrailerUrl("");
    } else {
      movieTrailer("Oceans Eleven").then((response) => console.log(response));
      /*movieTrailerは映画名を入れるとYoutubeのURLをフルで返す */
      movieTrailer(movie?.name || "")
        .then((url) => {
          /*URLの中で必要な要素はv=****の部分だけなので、抽出できるようにURLを分割 */
          const urlParams = new URLSearchParams(new URL(url).search);
          setTrailerUrl(urlParams.get("v"));
        })
        .catch((error) => console.log(error));
    }
  };

  return (
    <div className="row">
      <h2>{title}</h2>

      <div className="row_posters">
        {movies.map((movie) => (
          <img
            key={movie.id}
            className={`row_poster ${
              isLargeRow ? "row_posterLarge" : "row_poster"
            }`}
            src={`${base_url}${
              isLargeRow ? movie.poster_path : movie.backdrop_path
            }`}
            alt={movie.name}
            onClick={() => handleClick(movie)}
          />
        ))}
      </div>
      {trailerUrl && <Youtube videoId={trailerUrl} opts={opts} />}
    </div>
  );
}

export default Row;
