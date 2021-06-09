import React from "react";
import AddMovieForm from "./AddMovieForm";
import Movie from "./Movie";

function MovieList() {
  const [movies, setMovies] = React.useState([]);

  React.useEffect(() => {
    fetchMovies();
  }, []);

  const fetchMovies = () => {
    fetch("/movies")
      .then((response) => response.json())
      .then((data) => setMovies(data));
  };

  const createNewMovie = (movieToAdd) => {
    movieToAdd.year = Number(movieToAdd.year);
    movieToAdd.duration = Number(movieToAdd.duration);

    fetch("/movies", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(movieToAdd),
    })
      .then((response) => response.json())
      .then((newMovie) => setMovies([...movies, newMovie]));
  };

  return (
    <div>
      <AddMovieForm createNewMovie={createNewMovie} />
      {movies.map((item) => (
        <Movie {...item} />
      ))}
    </div>
  );
}

export default MovieList;
