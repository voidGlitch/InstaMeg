import React, { createContext, useContext, useState, useEffect } from "react";
import { auth } from "../misc/firebase";
import { updateProfile, sendEmailVerification } from "firebase/auth";
import { Message, Notification, toaster } from "rsuite";
import { useHistory } from "react-router-dom";

const AuthContext = createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export const AuthProvider = ({ children }) => {
  const [currentUser, setcurrentUser] = useState(null);
  const [Loading, setLoading] = useState(true);
  const [isverified, setverified] = useState(false);
  const [success, setsuccess] = useState(false);
  const history = useHistory();

  const signup = async (email, password, username) => {
    //function to create user with email and password

    try {
      const result = await auth.createUserWithEmailAndPassword(email, password);

      await updateProfile(auth.currentUser, {
        displayName: `${username}`,
      });
      await sendEmailVerification(auth.currentUser, {
        url: "http://localhost:3000/",
        handleCodeInApp: true,
      });
      toaster.push(
        <Message showIcon type="info">
          Check your email {email}
        </Message>,
        { placement: "topCenter" }
      );
      console.log(result);
      history.push("/wait");
    } catch (error) {
      toaster.push(
        <Notification showicon="true" type="error" header="Error" closable>
          {error.message}
        </Notification>,
        { placement: "topStart" }
      );
      console.log(error.message);
      if (
        error.message ===
        "Firebase: The email address is already in use by another account. (auth/email-already-in-use)."
      ) {
        history.push("/signin");
      }
    }
  };

  const login = async (email, password) => {
    try {
      //function to create user with email and password
      const result = await auth.signInWithEmailAndPassword(email, password);
      console.log(result);
      toaster.push(
        <Message showIcon type="success">
          Successfully Logged in !
        </Message>,
        { placement: "topCenter" }
      );
      setsuccess(true);
    } catch (error) {
      toaster.push(
        <Message full showIcon type="error">
          {error.message}
        </Message>,
        { placement: "topCenter" }
      );
      console.log(error.message);
      setsuccess(false);
    }
  };
  //runs only when we have a mount on our components
  useEffect(() => {
    //firebase has its own way of when the user is set and this method run when the user is set in firebase
    //unsubscribe when its done
    const unsubscribe = auth.onAuthStateChanged((user) => {
      //first we set the user and then we set the loading to false

      if (user) {
        setverified(user.emailVerified);
      }
      setcurrentUser(user);

      setLoading(false);
    });

    //work as a clean up funtion and unmount(remove) us from this listner when components change
    return unsubscribe;
  }, []);

  const value = {
    currentUser,
    isverified,
    signup,
    login,
    success,
  };
  return (
    <AuthContext.Provider value={value}>
      {/* we do not run any of the applyication unless and until loading is false */}
      {!Loading && children}
    </AuthContext.Provider>
  );
};
