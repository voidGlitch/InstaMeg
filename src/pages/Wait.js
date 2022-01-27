import React from "react";
import { useAuth } from "../Context/AuthContext";
import { Button } from "rsuite";
import { useHistory } from "react-router-dom";

const Wait = () => {
  const history = useHistory();

  const { isverified } = useAuth();

  console.log(isverified);
  return (
    <div className="text-center mt-page">
      {isverified
        ? "You are now authorized to use the app"
        : "A verification link Has been sent to your email Account."}
      <br></br>
      {!isverified && "If done please Reload the page"}
      <br></br>
      {isverified && (
        <Button
          className="mt-3"
          appearance="primary"
          color="red"
          onClick={() => {
            history.push("/signin");
          }}
        >
          Continue
        </Button>
      )}
    </div>
  );
};

export default Wait;
