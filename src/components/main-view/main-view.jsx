import { useState } from "react";
import { MovieCard } from "../movie-card/movie-card";
import { MovieView } from "./movie-view";
export const MainView = () => {
  const [movies, setMovies] = useState([
    {
      id: 1,
      title: "The Hateful Eight",
      image:
        "https://m.media-amazon.com/images/I/51uT6dck-CL._SX300_SY300_QL70_FMwebp_.jpg",
      director: "Quentin Tarantino",
    },
    {
      id: 2,
      title: "Pulp Fiction",
      image:
        "https://m.media-amazon.com/images/I/51LFlLl0ZOL._SX300_SY300_QL70_FMwebp_.jpg",
      director: "Quentin Tarantino",
    },
    {
      id: 3,
      title: "Unbreakable",
      image:
        "https://m.media-amazon.com/images/I/41mP1lz0xKL._SX300_SY300_QL70_FMwebp_.jpg",
      director: "M. Night Shyamalan",
    },
    {
      id: 4,
      title: "Snatch",
      image: "https://i.ebayimg.com/images/g/M30AAOSwkJRghuOt/s-l500.jpg",
      director: "Guy Ritchie",
    },
    {
      id: 5,
      title: "The Dark Knight",
      image:
        "https://m.media-amazon.com/images/I/51GBijGxSOL._SX300_SY300_QL70_FMwebp_.jpg",
      director: "Christopher Nolan",
    },
  ]);

  const [selectedMovie, setSelectedMovie] = useState(null);

  if (selectedMovie) {
    return (
      <MovieView
        movie={selectedMovie}
        onBackClick={() => setSelectedMovie(null)}
      />
    );
  }
  if (movies.length === 0) {
    return <div>The list is empty</div>;
  }
  return (
    <div>
      {movies.map((movie) => (
        <MovieCard
          key={movie.id}
          movie={movie}
          onMovieClick={(newSelectedMovie) => {
            setSelectedMovie(newSelectedMovie);
          }}
        />
      ))}
    </div>
  );
};
