import React, { useState, useRef } from "react";
import { useAuth } from "../Context/AuthContext";
import { Link } from "react-router-dom";
import { Card, Form, Button, Alert } from "react-bootstrap";
import { Message, toaster } from "rsuite";

const Signup = () => {
  const emailRef = useRef();
  const usernameRef = useRef();
  const passwordRef = useRef();
  const passwordConfirmRef = useRef();
  const { signup, Loading } = useAuth();
  const [error, seterror] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (passwordRef.current.value !== passwordConfirmRef.current.value) {
      toaster.push(
        <Message showIcon type="warning" header="Warning">
          Please Confirm again!
        </Message>,
        { placement: "topCenter" }
      );
      return seterror("Password doesn't Match");
    }
    try {
      seterror("");

      await signup(
        emailRef.current.value,
        passwordRef.current.value,
        usernameRef.current.value
      );
    } catch (err) {
      seterror(`Error :${err.message}`);
      toaster.push(
        <Message showIcon type="error">
          {err.message}
        </Message>,
        { placement: "topCenter" }
      );
    }
  };

  return (
    <>
      <Card>
        <Card.Body>
          <h2 className="text-center mb-4">Signup</h2>
          {/* if we refresh the page it will send the error so to prevent that we pass currentuser presense 
          {JSON.stringify(currentUser.email)} */}
          {error && (
            <Alert variant="danger">
              <img
                src="https://img.icons8.com/external-flatart-icons-flat-flatarticons/30/000000/external-error-coronavirus-covid19-flatart-icons-flat-flatarticons.png"
                alt="not"
              />
              {error}
            </Alert>
          )}

          <Form onSubmit={handleSubmit}>
            <Form.Group id="email">
              <Form.Label>E-mail</Form.Label>
              <Form.Control
                type="email"
                ref={emailRef}
                required
                minLength={6}
              />
            </Form.Group>
            <Form.Group id="email">
              <Form.Label>Username</Form.Label>
              <Form.Control
                type="text"
                ref={usernameRef}
                required
                minLength={3}
              />
            </Form.Group>
            <Form.Group id="password">
              <Form.Label className="mt-2">Password</Form.Label>
              <Form.Control
                type="password"
                ref={passwordRef}
                autoComplete="on"
                required
                minLength={6}
              />
            </Form.Group>
            <Form.Group id="password-confirm" required>
              <Form.Label className="mt-2">Password Confirmation</Form.Label>
              <Form.Control
                type="password"
                ref={passwordConfirmRef}
                autoComplete="on"
                required
                minLength={6}
              />
            </Form.Group>
            <Button disabled={Loading} className="w-100 mt-3" type="submit">
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
