import React, { useState, useRef } from "react";
import { useAuth } from "../Context/AuthContext";
import { Link } from "react-router-dom";
import { Card, Form, Button, Alert } from "react-bootstrap";
import { Message, toaster } from "rsuite";

const Login = () => {
  const emailRef = useRef();
  const passwordRef = useRef();
  const { login, isverified, success } = useAuth();
  const [error, seterror] = useState("");
  const [loading, setloading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!isverified) {
      toaster.push(
        <Message showIcon type="error">
          Failed to Login!
        </Message>,
        { placement: "topCenter" }
      );

      return seterror(
        "Please Sign in again and verify with your email!.It is Seems you are not valid user"
      );
    }
    try {
      seterror("");
      setloading(true);
      await login(emailRef.current.value, passwordRef.current.value);
      console.log(success);
      setTimeout(() => {
        if (!success) {
          seterror("Invalid! Try Again");
        }
      }, 5000);
      emailRef.current.value = "";

      passwordRef.current.value = "";
    } catch (err) {
      seterror(err.message);
    }
    setloading(false);
  };

  return (
    <>
      <Card className="back">
        <Card.Body>
          {error && (
            <Alert variant="danger">
              <img
                src="https://img.icons8.com/external-flatart-icons-flat-flatarticons/30/000000/external-error-coronavirus-covid19-flatart-icons-flat-flatarticons.png"
                alt="not"
              />
              {error}
            </Alert>
          )}
          <h2 className="text-center">Welcome back!</h2>
          <p className="text-center text-gentle">
            We're so excited to see you again!
          </p>

          <Form onSubmit={handleSubmit}>
            <Form.Group id="email">
              <Form.Label>E-mail</Form.Label>
              <Form.Control
                style={{ backgroundColor: "#303339", color: "white" }}
                type="email"
                ref={emailRef}
                required
              />
            </Form.Group>
            <Form.Group id="password">
              <Form.Label className="mt-2">Password</Form.Label>
              <Form.Control
                style={{ backgroundColor: "#303339", color: "white" }}
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
          <div className="w-100 text-center ">
            Create a new Account?<br></br>
            <Link to="/Register" style={{ color: "#1ef7d8" }}>
              Register Here!
            </Link>
          </div>
        </Card.Body>
      </Card>
    </>
  );
};

export default Login;
