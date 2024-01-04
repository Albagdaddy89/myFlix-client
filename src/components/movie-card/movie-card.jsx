import React from "react";
import PropTypes from "prop-types";
import { Card } from "react-bootstrap";
import { Link } from "react-router-dom";
import "./movie-card.css"; // Import the custom CSS

export const MovieCard = ({ movie }) => {
  return (
    <Link
      to={`/movies/${encodeURIComponent(movie.id)}`}
      className="movie-card-link"
    >
      <Card className="movie-card h-100">
        <Card.Img variant="top" src={movie.image} alt="{movie.title}" />
        <div className="movie-title">{movie.title}</div>
      </Card>
    </Link>
  );
};

MovieCard.propTypes = {
  movie: PropTypes.shape({
    id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    image: PropTypes.string.isRequired,
    director: PropTypes.string, // Include other relevant fields as needed
  }).isRequired,
};
