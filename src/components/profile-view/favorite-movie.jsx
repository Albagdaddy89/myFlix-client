import { MovieCard } from "../movie-card/movie-card";
import { Row, Col, Button } from "react-bootstrap";

export const FavoriteMovies = ({ favoriteMovieList }) => {
  return (
    <>
      <h2>Favorite Movies</h2>
      <Row className="justify-content-right justify-content-md-center">
        {favoriteMovieList.map((movie) => (
          <Col
            sm={6}
            md={4}
            lg={3}
            xl={2}
            className="mx-2 my-3 col-7 similar-movies-img"
            key={movie._id}
          >
            <MovieCard movie={movie} />
            <Button variant="secondary" onClick={() => removeFav(movies._id)}>
              Remove from list
            </Button>
          </Col>
        ))}
      </Row>
    </>
  );
};
