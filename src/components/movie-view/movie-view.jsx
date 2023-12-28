import React from "react";
import { useParams, Link } from "react-router-dom";
import "./movie-view.scss";

export const MovieView = ({ movies, onAddToFavorites }) => {
  const { movieId } = useParams();

  // Find the movie by ID from the movies array
  const movie = movies.find((m) => m.id === movieId);

  // Check if movie is available
  if (!movie) {
    return <div>Loading...</div>;
  }

  const handleAddToFavoritesClick = () => {
    onAddToFavorites(movie.id);
  };

  return (
    <div className="movie-view">
      <div>
        <img className="w-100" src={movie.image} alt={movie.title} />
      </div>
      <div>
        <span>Title: </span>
        <span>{movie.title}</span>
      </div>
      <div>
        <span>Director: </span>
        <span>{movie.director}</span>
      </div>
      <div>
        <button onClick={handleAddToFavoritesClick}>Add to Favorites</button>
      </div>
      <Link to="/">
        <button className="back-button">Back</button>
      </Link>
    </div>
  );
};
