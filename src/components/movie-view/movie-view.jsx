import React from "react";
import { useParams, Link } from "react-router-dom";
import "./movie-view.scss";

export const MovieView = ({
  movies,
  onAddToFavorites,
  onRemoveFromFavorites,
}) => {
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

  const handleRemoveFromFavoritesClick = () => {
    onRemoveFromFavorites(movie.id);
  };

  return (
    <div className="movie-view">
      <div>
        <img
          className="w-100 movie-image"
          src={movie.image}
          alt={movie.title}
        />
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
        <span>Description: </span>
        <span>{movie.description}</span>
      </div>
      <div>
        <span>Genre: </span>
        <span>{movie.genre.Name}</span>
      </div>
      <div>
        <button onClick={handleAddToFavoritesClick}>Add to Favorites</button>
        <button
          onClick={handleRemoveFromFavoritesClick}
          className="remove-button"
        >
          Remove from Favorites
        </button>
      </div>
      <Link to="/">
        <button className="back-button">Back</button>
      </Link>
    </div>
  );
};
