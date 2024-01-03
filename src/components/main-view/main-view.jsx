import React, { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { MovieCard } from "../movie-card/movie-card";
import { MovieView } from "../movie-view/movie-view";
import { LoginView } from "../login-view/login-view";
import { SignupView } from "../signup-view/signup-view";
import { ProfileView } from "../profile-view/profile-view";
import { NavigationBar } from "../../components/navigation-bar/navigation-bar";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

export const MainView = () => {
  const storedUser = JSON.parse(localStorage.getItem("user"));
  const storedToken = localStorage.getItem("token");
  const [user, setUser] = useState(storedUser ? storedUser : null);
  const [token, setToken] = useState(storedToken ? storedToken : null);
  const [movies, setMovies] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  //connect to API via HOOK
  useEffect(() => {
    if (token) {
      fetch("https://tame-gray-viper-cap.cyclic.app/movies", {
        headers: { Authorization: `Bearer ${token}` },
      })
        .then((response) => response.json())
        .then((data) => {
          if (data && Array.isArray(data)) {
            const moviesFromApi = data.map((doc) => ({
              id: doc._id,
              title: doc.Title,
              director: doc.Director.Name,
              image: doc.ImagePath,
              genre: doc.Genre,
              description: doc.Description,
            }));
            setMovies(moviesFromApi);
          } else {
            console.error("Invalid data format received from API");
          }
        })
        .catch((error) => {
          console.error("Error fetching data:", error);
        });
    }
  }, [token]);

  const onLoggedIn = (loggedInUser, loggedInToken) => {
    setUser(loggedInUser);
    setToken(loggedInToken);
  };

  const handleAddToFavorites = (id) => {
    if (user && user.FavoriteMovies.includes(id)) {
      console.log("Movie is already in favorites.");
      alert("Movie is already in favorites.");
      return;
    }

    fetch(
      `https://tame-gray-viper-cap.cyclic.app/users/${user.Username}/movies/${id}`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    )
      .then((response) => {
        if (response.ok) {
          console.log("Movie added to favorites.");
          return response.json();
        } else {
          console.error(
            "Error adding movie to favorites:",
            response.statusText
          );
        }
      })
      .then((updatedUser) => {
        if (updatedUser) {
          localStorage.setItem("user", JSON.stringify(updatedUser));
          setUser(updatedUser);
          alert("Movie added to Favorites");
        }
      })
      .catch((error) => {
        console.error("Error adding movie to favorites:", error);
      });
  };

  const handleRemoveFromFavorites = (id) => {
    console.log("Attempting to remove from favorites with token:", token);

    if (!token) {
      alert("No authorization token available.");
      return;
    }

    fetch(
      `https://tame-gray-viper-cap.cyclic.app/users/${user.Username}/movies/${id}`,
      {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    )
      .then((response) => {
        if (!response.ok) {
          console.error("Response from server:", response);
          alert("Failed to remove");
          throw new Error("Failed to remove movie from favorites");
        }
        return response.json();
      })
      .then((updatedUser) => {
        if (updatedUser) {
          localStorage.setItem("user", JSON.stringify(updatedUser));
          setUser(updatedUser);
          alert("Movie removed from Favorites");
        }
      })
      .catch((error) => {
        console.error("Error: ", error);
      });
  };

  const handleDeleteAccount = () => {
    fetch(`https://tame-gray-viper-cap.cyclic.app/users/${user.Username}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => {
        if (response.ok) {
          setUser(null); // Remove user from state
          setToken(null); // Remove token from state
          localStorage.clear(); // Clear local storage
          // Redirect to login or home page as needed
        } else {
          // Handle non-successful responses
        }
      })
      .catch((error) => {
        // Handle errors
      });
  };

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const filteredMovies = movies.filter((movie) =>
    movie.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <BrowserRouter>
      <NavigationBar
        user={user}
        onLoggedOut={() => {
          setUser(null);
          setToken(null);
          localStorage.clear();
        }}
      />

      <Row className="justify-content-md-center mt-4">
        {/* Search Bar */}
        <Col md={12} className="mb-4">
          <Form.Control
            type="text"
            placeholder="Search for a movie..."
            value={searchTerm}
            onChange={handleSearchChange}
          />
        </Col>

        {/* Routes */}
        <Routes>
          <Route
            path="/signup"
            element={
              user ? (
                <Navigate to="/" />
              ) : (
                <Col md={6}>
                  <SignupView onLoggedIn={onLoggedIn} />
                </Col>
              )
            }
          />
          <Route
            path="/login"
            element={
              user ? (
                <Navigate to="/" />
              ) : (
                <Col md={6}>
                  <LoginView onLoggedIn={onLoggedIn} />
                </Col>
              )
            }
          />
          <Route
            path="/movies/:movieId"
            element={
              !user ? (
                <Navigate to="/login" replace />
              ) : (
                <Col md={8}>
                  <MovieView movies={movies} />
                </Col>
              )
            }
          />
          <Route
            path="/profile"
            element={
              user ? (
                <Col md={8}>
                  <ProfileView
                    user={user}
                    movies={movies}
                    token={token}
                    onDeleteAccount={handleDeleteAccount}
                  />
                </Col>
              ) : (
                <Navigate to="/login" />
              )
            }
          />

          {/* Home Route */}
          <Route
            path="/"
            element={
              <Row>
                {filteredMovies.length === 0 ? (
                  <Col>No movies found!</Col>
                ) : (
                  filteredMovies.map((movie) => (
                    <Col md={4} key={movie.id} className="mb-4">
                      <MovieCard movie={movie} />
                    </Col>
                  ))
                )}
              </Row>
            }
          />
        </Routes>
      </Row>
    </BrowserRouter>
  );
};
