import React from "react";
import { Redirect, Route } from "react-router";

import { useAuth } from "../Context/AuthContext";
//children will give all the components which is present inside privateroute and routeprops gives the route properties used in privateroute like to exact
const PrivateRoute = ({ children, ...routeProps }) => {
  const { authprofile, Loading } = useAuth();

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

  if (!authprofile && !Loading) {
    //redirect will send us the page which is given in to=""

    return <Redirect to="/signin" />;
  } else if (!authprofile && !Loading) {
    //redirect will send us the page which is given in to=""

    return <Redirect to="/signin" />;
  }
  //returns the route just we use to did in app.js
  return <Route {...routeProps}>{children}</Route>;
};

export default PrivateRoute;
