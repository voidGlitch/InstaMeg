import React, { useState, useRef } from "react";
import { useAuth } from "../Context/AuthContext";
import { Link } from "react-router-dom";
import { Card, Form, Button, Alert } from "react-bootstrap";

const Signup = () => {
  const emailRef = useRef();
  const passwordRef = useRef();
  const passwordConfirmRef = useRef();
  const { signup } = useAuth();
  const [error, seterror] = useState("");
  const [info, setinfo] = useState("");
  const [loading, setloading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (passwordRef.current.value !== passwordConfirmRef.current.value) {
      seterror("Password Doesn't match");
      setTimeout(() => {
        seterror(null);
      }, 4000);
    }
    try {
      seterror("");
      setloading(true);
      await signup(emailRef.current.value, passwordRef.current.value);
      setinfo(
        `An email verification key has been send to ${emailRef.current.value} `
      );
      setTimeout(() => {
        setinfo(null);
      }, 4000);
    } catch {
      seterror("Failed to create an account");
      setTimeout(() => {
        seterror(null);
      }, 4000);
    }
    setloading(false);
  };

  return (
    <>
      {error && (
        <Alert variant="danger" className="Fade">
          {error}
        </Alert>
      )}
      {info && (
        <Alert variant="info" className="Fade">
          {info}
        </Alert>
      )}
      <Card>
        <Card.Body>
          <h2 className="text-center mb-4">Signup</h2>
          {/* if we refresh the page it will send the error so to prevent that we pass currentuser presense 
          {JSON.stringify(currentUser.email)} */}
          {/* {currentUser.email} */}
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
            <Form.Group id="password-confirm" required>
              <Form.Label className="mt-2">Password Confirmation</Form.Label>
              <Form.Control
                type="password"
                ref={passwordConfirmRef}
                autoComplete="on"
                required
              />
            </Form.Group>
            <Button disabled={loading} className="w-100 mt-3" type="submit">
              Sign up
            </Button>
          </Form>
        </Card.Body>
      </Card>

      <div className="w-100 text-center mt-2">
        Already have an Account? <Link to="/login">Login</Link>
      </div>
    </>
  );
};

export default Signup;
