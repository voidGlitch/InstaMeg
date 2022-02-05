import React from "react";
import { Redirect, Route } from "react-router";

import { useAuth } from "../Context/AuthContext";

//children will give all the components which is present inside privateroute and routeprops gives the route properties used in privateroute like to exact
const PublicRoute = ({ children, ...routeProps }) => {
  const { authprofile, Loading, currentUser } = useAuth();

  if (!authprofile && Loading) {
    //redirect will send us the page which is given in to=""
    return (
      <div
        className="d-flex align-items-center justify-content-center"
        style={{ minHeight: "100vh", backgroundColor: "#0f2b1d" }}
      >
        <img
          src="https://img.icons8.com/fluency/144/000000/reactos.png"
          alt="no"
          className="spinner"
        />
      </div>
    );
  }

  //if profile is false we will be on the signin page for eternity i mean if we are not logged in or signin
  if (authprofile && !Loading) {
    //redirect will send us the page which is given in to=""
    console.log(currentUser.emailVerified);
    if (currentUser.emailVerified) {
      console.log(currentUser);
      return <Redirect to="/" />;
    } else {
      return <Redirect to="/wait" />;
    }
  }

  //returns the route just we use to did in app.js
  return <Route {...routeProps}>{children}</Route>;
};

export default PublicRoute;
