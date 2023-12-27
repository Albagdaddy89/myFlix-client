import { useState, useEffect } from "react";
import { MovieCard } from "../movie-card/movie-card";
import { MovieView } from "../movie-view/movie-view";
import { LoginView } from "../login-view/login-view";
import { SignupView } from "../../signup-view/signup-view";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

// MainView component definition
export const MainView = () => {
  // State for storing the list of movies
  const [movies, setMovies] = useState([]);

  // State for storing the selected movie
  const [selectedMovie, setSelectedMovie] = useState(null);

  // State for user authentication
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);

  // useEffect hook to fetch movie data on component mount
  useEffect(() => {
    if (token) {
      // Fetch movies if token is available
      fetch("https://tame-gray-viper-cap.cyclic.app/movies", {
        headers: { Authorization: `Bearer ${token}` },
      })
        .then((response) => response.json())
        .then((data) => {
          if (data && Array.isArray(data)) {
            // Convert API data to required format
            const moviesFromApi = data.map((doc) => ({
              id: doc._id,
              title: doc.Title,
              director: doc.Director.Name,
              image: doc.ImagePath,
              // ... other fields
            }));
            setMovies(moviesFromApi); // Update state with fetched movies
          } else {
            console.error("Invalid data format received from API");
          }
        })
        .catch((error) => {
          console.error("Error fetching data:", error);
        });
    }
  }, [token]);

  // Rendering logic based on state
  return (
    <Row>
      {!user ? (
        <Col md={12}>
          <LoginView
            onLoggedIn={(user, token) => {
              setUser(user);
              setToken(token);
            }}
          />
          <SignupView />
        </Col>
      ) : selectedMovie ? (
        <Col md={12}>
          <MovieView
            movie={selectedMovie}
            onBackClick={() => setSelectedMovie(null)}
          />
        </Col>
      ) : movies.length === 0 ? (
        <Col md={12}>
          <div>The list is empty</div>
        </Col>
      ) : (
        movies.map((movie) => (
          <Col className="mb-3" key={movie.id} md={4}>
            <MovieCard
              movie={movie}
              onMovieClick={(newSelectedMovie) => {
                setSelectedMovie(newSelectedMovie);
              }}
            />
          </Col>
        ))
      )}
    </Row>
  );
};
