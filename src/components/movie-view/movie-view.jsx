import React from "react";
import { useParams, Link } from "react-router-dom";
import "./movie-view.scss";

export const MovieView = ({ movies }) => {
  const { movieId } = useParams();

  // Find the movie by ID from the movies array
  const movie = movies.find((m) => m.id === movieId);

  // Check if movie is available
  if (!movie) {
    return <div>Loading...</div>; // or any other placeholder content
  }

  return (
    <div>
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
      {/* Link to navigate back to the main view */}
      <Link to={`/`}>
        <button className="back-button">Back</button>
      </Link>
    </div>
  );
};
