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
  const [movies, setMovies] = useState([]);
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);

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

  const handleAddToFavorites = (movieId) => {
    if (user && user.FavoriteMovies.includes(movieId)) {
      console.log("Movie is already in favorites.");
      return;
    }

    fetch(
      `https://tame-gray-viper-cap.cyclic.app/users/${user.Username}/movies/${movieId}`,
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
          // Update user's favorites in state, if needed
        } else {
          console.error(
            "Error adding movie to favorites:",
            response.statusText
          );
        }
      })
      .catch((error) => {
        console.error("Error adding movie to favorites:", error);
      });
  };

  const handleRemoveFromFavorites = (movieId) => {
    if (!user || !user.FavoriteMovies.includes(movieId)) {
      console.log("Movie is not in favorites.");
      return;
    }

    fetch(
      `https://tame-gray-viper-cap.cyclic.app/users/${user.Username}/movies/${movieId}`,
      {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    )
      .then((response) => {
        if (response.ok) {
          console.log("Movie removed from favorites.");
          // Update user's favorites in state, if needed
        } else {
          console.error(
            "Error removing movie from favorites:",
            response.statusText
          );
        }
      })
      .catch((error) => {
        console.error("Error removing movie from favorites:", error);
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
      <Row className="justify-content-md-center">
        <Routes>
          <Route
            path="/signup"
            element={
              user ? (
                <Navigate to="/" />
              ) : (
                <Col md={6}>
                  <SignupView />
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
                  <LoginView
                    onLoggedIn={(user, newToken) => {
                      setUser(user);
                      setToken(newToken);
                    }}
                  />
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
                  <MovieView
                    movies={movies}
                    onAddToFavorites={handleAddToFavorites}
                    onRemoveFromFavorites={handleRemoveFromFavorites}
                  />
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
          <Route
            path="/"
            element={
              !user ? (
                <Navigate to="/login" replace />
              ) : (
                <Row>
                  {movies.length === 0 ? (
                    <Col>The list is empty!</Col>
                  ) : (
                    movies.map((movie) => (
                      <Col md={4} key={movie.id} className="mb-4">
                        <MovieCard movie={movie} />
                      </Col>
                    ))
                  )}
                </Row>
              )
            }
          />
        </Routes>
      </Row>
    </BrowserRouter>
  );
};
