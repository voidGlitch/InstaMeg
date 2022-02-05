import React, { useState } from "react";
import { auth } from "../../../misc/firebase";
import { Tag, Button, toaster, Message } from "rsuite";
import firebase from "firebase/compat/app";

const ProviderBlock = () => {
  const [isConnected, setIsconnnected] = useState({
    "google.com": auth.currentUser.providerData.some(
      (data) => data.providerId === "google.com"
    ),
    "facebook.com": auth.currentUser.providerData.some(
      (data) => data.providerId === "facebook.com"
    ),
  });
  const updateIsconnect = (providerId, value) => {
    setIsconnnected((p) => {
      return {
        ...p,
        [providerId]: value,
      };
    });
  };

  const unlink = async (providerId) => {
    try {
      if (auth.currentUser.providerData.length === 1) {
        throw new Error(`You cannot disconnect to ${providerId}`);
      }
      await auth.currentUser.unlink(providerId);
      updateIsconnect(providerId, false);
      toaster.push(
        <Message showIcon type="success">
          Disconnected From {providerId}
        </Message>,
        { placement: "topCenter" }
      );
    } catch (err) {
      toaster.push(
        <Message showIcon type="error">
          {err.message}
        </Message>,
        { placement: "topCenter" }
      );
    }
  };

  const unlinkgoogle = () => {
    unlink("google.com");
  };
  const unlinkfacebook = () => {
    unlink("facebook.com");
  };
  const link = async (provider) => {
    try {
      await auth.currentUser.linkWithPopup(provider);
      updateIsconnect(provider.providerId, true);
      toaster.push(
        <Message showIcon type="success">
          Successfully Connected From {provider.providerId}
        </Message>,
        { placement: "topCenter" }
      );
    } catch (err) {
      toaster.push(
        <Message showIcon type="error">
          {err.message}
        </Message>,
        { placement: "topCenter" }
      );
    }
  };
  const linkgoogle = () => {
    link(new firebase.auth.GoogleAuthProvider());
  };
  const linkfacebook = () => {
    link(new firebase.auth.FacebookAuthProvider());
  };
  return (
    <div>
      {isConnected["google.com"] && (
        <Tag closable color="green" onClose={unlinkgoogle}>
          <img
            src="https://img.icons8.com/officexs/20/000000/google-logo.png"
            alt="kit"
          />{" "}
          Connected
        </Tag>
      )}
      {isConnected["facebook.com"] && (
        <Tag closable color="blue" onClose={unlinkfacebook}>
          <img
            src="https://img.icons8.com/color/20/000000/facebook-new.png"
            alt="not"
          />{" "}
          Connected
        </Tag>
      )}
      {!isConnected["google.com"] && (
        <div className="mt-2">
          <Button block color="green" appearance="primary" onClick={linkgoogle}>
            <img
              src="https://img.icons8.com/officexs/20/000000/google-logo.png"
              alt="kit"
            />{" "}
            Link to google
          </Button>
        </div>
      )}
      {!isConnected["facebook.com"] && (
        <div className="mt-2">
          <Button
            block
            color="blue"
            appearance="primary"
            onClick={linkfacebook}
          >
            <img
              src="https://img.icons8.com/color/20/000000/facebook-new.png"
              alt="not"
            />{" "}
            Link to facebook
          </Button>
        </div>
      )}
    </div>
  );
};

export default ProviderBlock;
