import { useEffect, useState } from "react";
import "./App.css";
import { getMovieList, searchMovie } from "./api";

function App() {
  const [popularMovies, setPopularMovies] = useState([]);

  const getMovies = async () => {
    getMovieList().then((result) => {
      setPopularMovies(result);
    });
  };

  useEffect(() => {
    getMovies();
  }, []);

  const ShowMovieList = () => {
    return popularMovies.map((movie, i) => {
      return (
        <div className="Movie-wrapper" key={i}>
          <div className="Movie-title">{movie.title}</div>
          <img
            className="Movie-image"
            src={`${process.env.REACT_APP_IMAGE}/${movie.poster_path}`}
          />
          <div className="Movie-date">release :{movie.release_date}</div>
          <div className="Movie-rate">{movie.vote_average}</div>
        </div>
      );
    });
  };

  const search = async (q) => {
    if (q.length > 3) {
      const query = await searchMovie(q);
      setPopularMovies(query.results);
      console.log({ query: query });
    }
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>MOVIE LIST</h1>
        <input
          placeholder="cari film ..."
          className="Movie-search"
          onChange={({ target }) => search(target.value)}
        />
        <div className="Movie-container">
          <ShowMovieList />
        </div>
      </header>
    </div>
  );
}

export default App;
