import React from "react";
import { Switch } from "react-router-dom";
import Home from "./pages/Home";
import "./styles/main.scss";
import "rsuite/dist/rsuite.min.css";
import Signin from "./pages/Signin";
import Login from "./pages/Login";
import PrivateRoute from "./component/PrivateRoute";
import PublicRoute from "./component/PublicRoute";
import { Container } from "react-bootstrap";
import Signup from "./pages/Signup";
import { AuthProvider } from "./Context/AuthContext";
import Wait from "./pages/Wait";

function App() {
  return (
    <>
      <AuthProvider>
        <Switch>
          <PublicRoute path="/Register" exact>
            <Container
              className="d-flex align-items-center justify-content-center"
              style={{ minHeight: "100vh" }}
            >
              <div className="w-100 " style={{ maxWidth: "400px" }}>
                <Signup />
              </div>
            </Container>
          </PublicRoute>
          <PublicRoute path="/login" exact>
            <Container
              className="d-flex align-items-center justify-content-center"
              style={{ minHeight: "100vh" }}
            >
              <div className="w-100 " style={{ maxWidth: "400px" }}>
                <Login />
              </div>
            </Container>
          </PublicRoute>
          <PublicRoute path="/signin" exact>
            <Signin />
          </PublicRoute>

          <PrivateRoute path="/" exact>
            <Home />
          </PrivateRoute>
          <PrivateRoute path="/wait" exact>
            <Wait />
          </PrivateRoute>
        </Switch>
      </AuthProvider>
    </>
  );
}

export default App;
