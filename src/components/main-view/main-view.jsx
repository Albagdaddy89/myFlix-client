// Importing necessary hooks and components from React and other files
import { useState, useEffect } from "react";
import { MovieCard } from "../movie-card/movie-card";
import { MovieView } from "../movie-view/movie-view";
import { LoginView } from "../login-view/login-view";
import { SignupView } from "../../signup-view/signup-view";

// MainView component definition
export const MainView = () => {
  // State for storing the list of movies
  const [movies, setMovies] = useState([]);

  // State for storing the selected movie
  const [selectedMovie, setSelectedMovie] = useState(null);
  // State for storing token
  const [token, setToken] = useState(null);
  // State for user
  const [user, setUser] = useState(null);

  // useEffect hook to fetch movie data on component mount
  useEffect(() => {
    if (!token) {
      return;
    }
    // Fetching data from the API
    fetch("https://tame-gray-viper-cap.cyclic.app/movies", {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((response) => response.json()) // Parsing the response as JSON
      .then((data) => {
        if (data && Array.isArray(data)) {
          // Mapping the API data to a format suitable for the application
          const moviesFromApi = data.map((doc) => ({
            id: doc._id,
            title: doc.Title,
            director: doc.Director.Name,
            image: doc.ImagePath,
            // ... other fields
          }));
          setMovies(moviesFromApi); // Updating the state with the fetched movies
        } else {
          console.error("Invalid data format received from API");
        }
      })
      .catch((error) => {
        console.error("Error fetching data:", error); // Handling any errors in fetching data
      });
  }, [token]); // Dependency array to re-run the effect if token changes

  // Rendering logic
  if (!user) {
    return (
      <>
        <LoginView
          onLoggedIn={(user, token) => {
            setUser(user);
            setToken(token);
          }}
        />
        or
        <SignupView />
      </>
    );
  }

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
          onMovieClick={(newSelectedMovie) =>
            setSelectedMovie(newSelectedMovie)
          }
        />
      ))}
      <button
        onClick={() => {
          setUser(null);
          setToken(null);
        }}
      >
        Logout
      </button>
    </div>
  );
};
