import React, { useState, useEffect } from "react";
import { MovieCard } from "../movie-card/movie-card";
import { Container, Row, Col, Form, Button } from "react-bootstrap";

export const ProfileView = ({ user, setUser, token, onDeleteAccount }) => {
  const [username, setUsername] = useState(user.Username);
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState(user.Email);
  const [birthday, setBirthday] = useState(
    user.Birthday ? user.Birthday.slice(0, 10) : ""
  );
  const [favoriteMovies, setFavoriteMovies] = useState([]);

  useEffect(() => {
    fetch(
      `https://tame-gray-viper-cap.cyclic.app/users/${user.Username}/FavoriteMovies`,
      { headers: { Authorization: `Bearer ${token}` } }
    )
      .then((response) => response.json())
      .then((data) => {
        const transformedMovies = data.map((movie) => ({
          id: movie._id,
          title: movie.Title,
          director: movie.Director.Name,
          image: movie.ImagePath,
        }));
        setFavoriteMovies(transformedMovies);
      })
      .catch((error) =>
        console.error("Error fetching favorite movies:", error)
      );
  }, [user.Username, token]);

  // Inside your ProfileView component

  const handleUpdate = (event) => {
    event.preventDefault();

    // Create a user object with the updated details
    const updatedUser = {
      Username: username,
      Password: password, // Make sure to hash the password on the server-side before saving
      Email: email,
      Birthday: birthday,
    };

    // Make a PUT request to the server endpoint
    fetch(`https://tame-gray-viper-cap.cyclic.app/users/${user.Username}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`, // Ensure the token is included for authentication
      },
      body: JSON.stringify(updatedUser),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to update user");
        }
        return response.json();
      })
      .then((data) => {
        // Update the user state with the new details if necessary
        // setUser(data); // Uncomment this line if you need to update the user state
        alert("Profile updated successfully.");
      })
      .catch((error) => {
        console.error("Error updating profile:", error);
        alert("Error updating profile.");
      });
  };

  return (
    <Container>
      {/* User information and update form */}
      <Row>
        {/* Profile Details */}
        <Col md={6}>
          <h2>My Profile</h2>
          {/* User Update Form */}
          <Form onSubmit={handleUpdate}>
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
            <Button variant="primary" type="submit">
              Update
            </Button>
          </Form>
          {/* Delete Account Button */}
          <Button variant="danger" className="mt-3" onClick={onDeleteAccount}>
            Delete Account
          </Button>
        </Col>
      </Row>

      {/* Favorite Movies */}
      <Row className="mt-4">
        <Col>
          <h2>Favorite Movies</h2>
          <Row>
            {favoriteMovies.map((movie) => (
              <Col xs={6} sm={4} md={3} lg={2} key={movie.id} className="mb-3">
                <MovieCard movie={movie} />
              </Col>
            ))}
          </Row>
        </Col>
      </Row>
    </Container>
  );
};
