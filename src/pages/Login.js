import React, { useState, useRef } from "react";
import { useAuth } from "../Context/AuthContext";
import { Link } from "react-router-dom";
import { Card, Form, Button, Alert } from "react-bootstrap";

const Login = () => {
  const emailRef = useRef();
  const passwordRef = useRef();
  const { login } = useAuth();
  const [error, seterror] = useState("");
  const [loading, setloading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      seterror("");
      setloading(true);
      await login(emailRef.current.value, passwordRef.current.value);
    } catch {
      seterror("Failed to login");
      setTimeout(() => {
        seterror(null);
      }, 4000);
    }
    setloading(false);
  };

  return (
    <>
      {error && (
        <Alert variant="danger" as="alert" className="Fade">
          {error}
        </Alert>
      )}
      <Card>
        <Card.Body>
          <h2 className="text-center mb-4">Login</h2>

          <Form onSubmit={handleSubmit}>
            <Form.Group id="email">
              <Form.Label>E-mail</Form.Label>
              <Form.Control type="email" ref={emailRef} required />
            </Form.Group>
            <Form.Group id="password">
              <Form.Label className="mt-2">Password</Form.Label>
              <Form.Control
                type="password"
                ref={passwordRef}
                autoComplete="on"
                required
              />
            </Form.Group>

            <Button disabled={loading} className="w-100 mt-3" type="submit">
              Login
            </Button>
          </Form>
        </Card.Body>
      </Card>

      <div className="w-100 text-center mt-2">
        Create a new Account?<br></br>
        Register<Link to="/signin">Here!</Link>
      </div>
    </>
  );
};

export default Login;
