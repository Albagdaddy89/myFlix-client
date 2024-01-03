import { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { useNavigate } from "react-router-dom";

export const SignupView = ({ onLoggedIn }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [birthday, setBirthday] = useState("");

  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();

    const data = {
      Username: username,
      Password: password,
      Email: email,
      Birthday: birthday,
    };

    console.log("Sending data:", data); // Log data being sent

    fetch("https://tame-gray-viper-cap.cyclic.app/users", {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        if (!response.ok) {
          console.error("Response Status:", response.status); // Log response status
          return response.text().then((text) => {
            throw new Error(text || "Signup failed");
          });
        }
        return response.json();
      })
      .then(() => {
        // After successful signup, automatically log in the user
        const queryString = `?Username=${encodeURIComponent(
          username
        )}&Password=${encodeURIComponent(password)}`;
        return fetch(
          `https://tame-gray-viper-cap.cyclic.app/login${queryString}`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
      })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Login failed after signup");
        }
        return response.json();
      })
      .then((loginData) => {
        if (loginData.user) {
          localStorage.setItem("user", JSON.stringify(loginData.user));
          localStorage.setItem("token", loginData.token);
          onLoggedIn(loginData.user, loginData.token);
          navigate("/"); // Redirect to the home page
        } else {
          throw new Error("Failed to log in after signup");
        }
      })
      .catch((error) => {
        alert(error.message);
      });
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Label>Register:</Form.Label>
      <Form.Group controlId="formUsername">
        <Form.Label>Username:</Form.Label>
        <Form.Control
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
          minLength="3"
        />
      </Form.Group>

      <Form.Group controlId="formPassword">
        <Form.Label>Password:</Form.Label>
        <Form.Control
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
      </Form.Group>
      <Form.Group controlId="formEmail">
        <Form.Label>Email:</Form.Label>
        <Form.Control
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </Form.Group>
      <Form.Group controlId="formBirthday">
        <Form.Label>Birthday:</Form.Label>
        <Form.Control
          type="date"
          value={birthday}
          onChange={(e) => setBirthday(e.target.value)}
          required
        />
      </Form.Group>
      <Button variant="primary" type="submit">
        Submit
      </Button>
    </Form>
  );
};
