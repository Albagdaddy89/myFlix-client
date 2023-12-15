import { useState } from "react";
import { useEffect } from "react";
import { MovieCard } from "../movie-card/movie-card";
import { MovieView } from "../movie-view/movie-view";

export const MainView = () => {
  const [movies, setMovies] = useState([]);

  const [selectedMovie, setSelectedMovie] = useState(null);

  useEffect(() => {
    fetch("https://tame-gray-viper-cap.cyclic.app/movies")
      .then((response) => response.json())
      .then((data) => {
        if (data && Array.isArray(data)) {
          // Ensure data is an array
          const moviesFromApi = data.map((doc) => {
            return {
              id: doc._id,
              title: doc.Title,
              director: doc.Director.Name,
              image: doc.ImagePath,
              // ... other fields
            };
          });

          setMovies(moviesFromApi);
        } else {
          console.error("Invalid data format received from API");
        }
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }),
    [];

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
