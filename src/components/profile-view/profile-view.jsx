import React, { useState, useEffect } from "react";
import { MovieCard } from "../movie-card/movie-card";
import { Container, Row, Col, Form, Button } from "react-bootstrap";

export const ProfileView = ({ user, setUser }) => {
  const [username, setUsername] = useState(user.Username);
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState(user.Email);
  const [birthday, setBirthday] = useState(
    user.Birthday ? user.Birthday.slice(0, 10) : ""
  );
  const [favoriteMovies, setFavoriteMovies] = useState([]);

  useEffect(() => {
    fetch(
      `https://tame-gray-viper-cap.cyclic.app/users/${user.Username}/FavoriteMovies`
    )
      .then((response) => response.json())
      .then((data) => {
        const transformedMovies = data.map((movie) => ({
          id: movie._id,
          title: movie.Title,
          director: movie.Director.Name,
          image: movie.ImagePath,
          // Add other properties as needed
        }));
        setFavoriteMovies(transformedMovies);
      })
      .catch((error) =>
        console.error("Error fetching favorite movies:", error)
      );
  }, [user.Username]);

  const handleUpdate = (event) => {
    event.preventDefault();
    // Update logic here
  };

  return (
    <Container>
      {/* User information and update form */}
      <Row>
        {/* Profile Details */}
        <Col md={6}>
          <h2>My Profile</h2>
          {/* User Update Form */}
          <Form>
            {/* Username Field */}
            <Form.Group controlId="formUsername">
              <Form.Label>Username:</Form.Label>
              <Form.Control
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </Form.Group>
            {/* Password Field */}
            <Form.Group controlId="formPassword">
              <Form.Label>Password:</Form.Label>
              <Form.Control
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </Form.Group>
            {/* Email Field */}
            <Form.Group controlId="formEmail">
              <Form.Label>Email:</Form.Label>
              <Form.Control
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </Form.Group>
            {/* Birthday Field */}
            <Form.Group controlId="formBirthday">
              <Form.Label>Birthday:</Form.Label>
              <Form.Control
                type="date"
                value={birthday}
                onChange={(e) => setBirthday(e.target.value)}
              />
            </Form.Group>
            {/* Update Button */}
            <Button variant="primary" type="submit" onClick={handleUpdate}>
              Update
            </Button>
          </Form>
        </Col>
      </Row>

      {/* Favorite Movies */}
      <Row className="mt-4">
        <Col>
          <h2>Favorite Movies</h2>
          <Row>
            {favoriteMovies.map((movie) => (
              <Col xs={6} sm={4} md={3} lg={2} key={movie._id} className="mb-3">
                <MovieCard movie={movie} />
              </Col>
            ))}
          </Row>
        </Col>
      </Row>
    </Container>
  );
};
