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

  if (!user) {
    return (
      <LoginView
        onLoggedIn={(user, token) => {
          setUser(user);
          setToken(token);
        }}
      />
    );
  }

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
  }, [token]); // Empty dependency array to run the effect only once after the component mounts

  // Check if a user is logged in (assuming 'user' is part of your component's state or context)
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

  // Check if a movie has been selected
  if (selectedMovie) {
    return (
      <MovieView
        movie={selectedMovie}
        onBackClick={() => setSelectedMovie(null)} // Function to handle the back click
      />
    );
  }

  // Handling the case when no movies are available
  if (movies.length === 0) {
    return <div>The list is empty</div>;
  }

  // Rendering the list of movies
  return (
    <div>
      {movies.map((movie) => (
        <MovieCard
          key={movie.id}
          movie={movie}
          onMovieClick={(newSelectedMovie) => {
            setSelectedMovie(newSelectedMovie); // Function to handle movie selection
          }}
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
