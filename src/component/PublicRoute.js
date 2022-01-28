import React from "react";
import { Redirect, Route } from "react-router";
import { useProfile } from "../Context/ProfileContext";
import { useAuth } from "../Context/AuthContext";

//children will give all the components which is present inside privateroute and routeprops gives the route properties used in privateroute like to exact
const PublicRoute = ({ children, ...routeProps }) => {
  const { profile, isLoading, verified } = useProfile();
  const { authprofile, Loading, isVerified } = useAuth();

  if ((!profile || !authprofile) && (isLoading || Loading)) {
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
  if (
    (profile || authprofile) &&
    (!isLoading || !Loading) &&
    (isVerified || verified)
  ) {
    //redirect will send us the page which is given in to=""

    return <Redirect to="/" />;
  }

  //returns the route just we use to did in app.js
  return <Route {...routeProps}>{children}</Route>;
};

export default PublicRoute;
