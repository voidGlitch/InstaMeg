import React from "react";
import firebase from "firebase/compat/app";
import { auth, database } from "../misc/firebase";
import { Container, Row, Col, Grid, Panel, Button } from "rsuite";
import { ReactComponent as Valid } from "../component/Icons/valid.svg";
import { ReactComponent as Facebook } from "../component/Icons/Facebookicon.svg";
import { ReactComponent as Google } from "../component/Icons/Googleicon.svg";
import { Message, toaster } from "rsuite";

import { Link, useHistory } from "react-router-dom";

const Signin = () => {
  const history = useHistory();
  const signInWithProvider = async (provider) => {
    //Provider is used to Authenticate users by integrating with federated identity providers like google,facebook and method used popup takes a provider object
    try {
      const { additionalUserInfo, user } = await auth.signInWithPopup(provider);
      if (additionalUserInfo.isNewUser) {
        await database.ref(`/profiles/${user.uid}`).set({
          name: user.displayName,
          createdAt: firebase.database.ServerValue.TIMESTAMP,
        });
      }
      history.push("/");
      toaster.push(
        <Message showIcon type="success">
          Signed in!
        </Message>,
        { placement: "topCenter" }
      );
    } catch (error) {
      toaster.push(
        <Message showIcon type="error">
          {error.message}
        </Message>,
        { placement: "topCenter" }
      );
    }
  };

  const facebookSignin = () => {
    //Represents the Facebook Login authentication provider. Use this class to obtain FacebookAuthCredential s.
    signInWithProvider(new firebase.auth.FacebookAuthProvider());
  };

  const googleSignin = () => {
    //Sets the OAuth custom parameters to pass in a Google OAuth request for popup and redirect sign-in operations
    signInWithProvider(new firebase.auth.GoogleAuthProvider());
  };

  return (
    <div style={{ background: "#0f2b1d" }}>
      <Container>
        <Grid className="mt-mid">
          <Row>
            <Col xs={24} md={12} mdOffset={6}>
              {/* panel use gives padding */}
              <Panel className="text-center mt-3">
                <div>
                  <Valid />
                </div>
                <p className="mt-3 text-white">
                  An intractive chat application with features like stickers and
                  videos
                </p>

                <div className="mt-3">
                  <Button
                    block
                    color="cyan"
                    appearance="primary"
                    onClick={facebookSignin}
                  >
                    <Facebook />
                    {auth.currentUser
                      ? "Continue with facebook"
                      : "Login with facebook"}
                  </Button>
                  <Button
                    block
                    style={{ backgroundColor: "#1ed71e" }}
                    appearance="primary"
                    onClick={googleSignin}
                  >
                    <Google />{" "}
                    {auth.currentUser
                      ? "Continue with google"
                      : "Login with google"}
                  </Button>

                  <Link to="/Register" style={{ textDecoration: "none" }}>
                    <Button
                      className="mt-1"
                      block
                      color="violet"
                      appearance="primary"
                    >
                      <img
                        src="https://img.icons8.com/ios-glyphs/30/000000/wolf.png"
                        alt=""
                      />{" "}
                      Register now
                    </Button>
                  </Link>
                </div>
              </Panel>
            </Col>
          </Row>
        </Grid>
      </Container>
    </div>
  );
};

export default Signin;
