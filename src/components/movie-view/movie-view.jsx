import React from "react";
import { useParams, Link } from "react-router-dom";
import "./movie-view.scss";

export const MovieView = ({
  movies,
  onAddToFavorites,
  onRemoveFromFavorites,
}) => {
  const { movieId } = useParams();
  const movie = movies.find((m) => m.id === movieId);

  if (!movie) {
    return <div>Loading...</div>;
  }

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
        <button
          className="add-button"
          onClick={() => onAddToFavorites(movieId)}
        >
          Add to Favorites
        </button>
        <button
          onClick={() => onRemoveFromFavorites(movieId)}
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
