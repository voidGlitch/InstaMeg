import React, { createContext, useContext, useState, useEffect } from "react";
import firebase from "firebase/compat/app";
import { auth, database } from "../misc/firebase";
import { updateProfile, sendEmailVerification } from "firebase/auth";
import { Message, Notification, toaster } from "rsuite";
import { useHistory } from "react-router-dom";

const AuthContext = createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export const AuthProvider = ({ children }) => {
  const [currentUser, setcurrentUser] = useState(null);
  const [authprofile, setauthProfile] = useState(false);
  const [Loading, setLoading] = useState(true);
  const [isverified, setverified] = useState(false);

  const history = useHistory();

  const signup = async (email, password, username) => {
    //function to create user with email and password

    try {
      setLoading(true);
      const { additionalUserInfo, user } =
        await auth.createUserWithEmailAndPassword(email, password);
      if (additionalUserInfo.isNewUser) {
        await database.ref(`/profiles/${user.uid}`).set({
          name: username,
          createdAt: firebase.database.ServerValue.TIMESTAMP,
        });
      }
      await updateProfile(auth.currentUser, {
        displayName: `${username}`,
      });
      await sendEmailVerification(auth.currentUser, {
        url: "http://localhost:3000/",
      });

      toaster.push(
        <Message showIcon type="info">
          Check your email {email}
        </Message>,
        { placement: "topCenter" }
      );

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
    setLoading(false);
  };

  const login = async (email, password) => {
    try {
      //function to create user with email and password
      setLoading(true);
      const result = await auth.signInWithEmailAndPassword(email, password);
      console.log(result);
      toaster.push(
        <Message showIcon type="success">
          Successfully Logged in !
        </Message>,
        { placement: "topCenter" }
      );
      history.push("/");
    } catch (error) {
      toaster.push(
        <Message full showIcon type="error">
          {error.message}
        </Message>,
        { placement: "topCenter" }
      );
      console.log(error.message);
    }
    setLoading(false);
  };
  //runs only when we have a mount on our components
  useEffect(() => {
    //firebase has its own way of when the user is set and this method run when the user is set in firebase
    //unsubscribe when its done
    let userRef;
    const unsubscribe = auth.onAuthStateChanged((user) => {
      //first we set the user and then we set the loading to false
      setcurrentUser(user);
      console.log(user);

      if (user) {
        setverified(user.emailVerified);

        //get actual data from database of the user
        //on is a Listens for data changes at a particular location.
        //This is the primary way to read data from a Database. Your callback will be triggered for the initial data and again whenever the data changes

        userRef = database.ref(`/profiles/${user.uid}`);
        userRef.on("value", (snap) => {
          const { name, createdAt } = snap.val();

          const data = {
            name,
            createdAt,
            uid: user.uid,
            email: user.email,
          };
          setauthProfile(data);
          setLoading(false);
        });
      } else {
        if (userRef) {
          userRef.off();
        }
        setauthProfile(null);
        setverified(false);
        setLoading(false);
      }
    });

    //work as a clean up funtion and unmount(remove) us from this listner when components change
    return () => {
      //we are dealing with subs so we need to unsub from it whenever new data is comming
      unsubscribe();
      if (userRef) {
        userRef.off();
      }
    };
  }, []);

  console.log(currentUser);
  const value = {
    currentUser,
    isverified,
    signup,
    login,

    Loading,
    authprofile,
  };
  return (
    <AuthContext.Provider value={value}>
      {/* we do not run any of the applyication unless and until loading is false */}
      {children}
    </AuthContext.Provider>
  );
};
