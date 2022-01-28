import React, { createContext, useState, useContext, useEffect } from "react";
import { auth, database } from "../misc/firebase";

const ProfileContext = createContext();

export const ProfileProvider = ({ children }) => {
  const [currentUser, setcurrentUser] = useState(null);
  const [verified, setverified] = useState(false);
  const [profile, setProfile] = useState(false);
  const [isLoading, setisLoading] = useState(true);

  useEffect(() => {
    //onauthstatechange is used to get the info of the current user which is logged in user session
    let userRef;
    const unsubscribe = auth.onAuthStateChanged((user) => {
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
          setProfile(data);
          setisLoading(false);
        });
      } else {
        //unsubs from the database if user is not present

        setProfile(null);
        setisLoading(false);
      }
    });
    return () => {
      //we are dealing with subs so we need to unsub from it whenever new data is comming
      unsubscribe();
      if (userRef) {
        userRef.off();
      }
    };
  }, []);
  const value = {
    profile,
    isLoading,
    currentUser,
    verified,
  };
  return (
    <ProfileContext.Provider value={value}>{children}</ProfileContext.Provider>
  );
};

export const useProfile = () => useContext(ProfileContext);
