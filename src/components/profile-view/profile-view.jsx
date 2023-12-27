import { useState } from "react";
import { Col, Row, Container } from "react-bootstrap";
import { Button, Card, Form } from "react-bootstrap";

export const ProfileView = ({ user, token, movies, setUser }) => {
  const [username, setUsername] = useState(user.Username);
  const [password, setPassword] = useState(user.Password);
  const [email, setEmail] = useState(user.Email);
  const [birthday, setBirthday] = useState(user.Birthday);

  //let userFavMovies = movies.filter((movie)) => user.FavoriteMovies.includes(movie._id);

  const handleUpdate = (event) => {
    event.preventDefault();

    const data = {
      Username: username,
      Password: password,
      Email: email,
      Birthday: birthday,
    };

    fetch("https://tame-gray-viper-cap.cyclic.app//users/${user.Username}", {
      method: "PUT",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    }).then(async (response) => {
      if (response.ok) {
        response.json();
        alert("Update was successful");
        window.location.reload();
      } else {
        alert("Update failed");
      }
    });
  };

  return (
    <Container className="my-5">
      <Row>
        <Col md={5}>
          <Card>
            <Card.Body>
              <Card.Title>My Profile</Card.Title>
              <Card.Img
                variant="top"
                src="https://via.placeholder.com/250"
                className="w-50 rounded"
              />
              <Card.Text>Username: {user.Username}</Card.Text>
              <Card.Text>Email: {user.Email}</Card.Text>
              <Card.Text>Birthday: {user.Birthday}</Card.Text>
            </Card.Body>
          </Card>
        </Col>
        <Col md={7}>
          <Form onSubmit={handleUpdate}>
            <Form.Group controlId="formUsername">
              <Form.Label>Username:</Form.Label>
              <Form.Control
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                minLength="3"
                placeholder={user.Username}
              />
            </Form.Group>
            <Form.Group controlId="formPassword">
              <Form.Label>Password:</Form.Label>
              <Form.Control
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="*****"
              />
            </Form.Group>
            <Form.Group controlId="formEmail">
              <Form.Label>Email:</Form.Label>
              <Form.Control
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder={user.Email}
              />
            </Form.Group>
            <Form.Group controlId="formBirthday">
              <Form.Label>Birthday:</Form.Label>
              <Form.Control
                type="date"
                value={birthday}
                onChange={(e) => setBirthday(e.target.value)}
                placeholder={user.Birthday}
              />
            </Form.Group>
            <Button type="submit" onClick={handleUpdate} className="mt-2">
              Update
            </Button>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};
