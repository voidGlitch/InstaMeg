import React, { createContext, useContext, useState, useEffect } from "react";
import { auth } from "../misc/firebase";
import { updateProfile, sendEmailVerification } from "firebase/auth";

const AuthContext = createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export const AuthProvider = ({ children }) => {
  const [currentUser, setcurrentUser] = useState(null);
  const [Loading, setLoading] = useState(true);
  const signup = async (email, password) => {
    //function to create user with email and password
    const result = await auth.createUserWithEmailAndPassword(email, password);
    await updateProfile(auth.currentUser, {
      displayName: "User",
    });
    await sendEmailVerification(auth.currentUser);

    console.log(result);
  };

  const login = async (email, password) => {
    //function to create user with email and password
    const result = await auth.signInWithEmailAndPassword(email, password);
    console.log(result);
  };
  //runs only when we have a mount on our components
  useEffect(() => {
    //firebase has its own way of when the user is set and this method run when the user is set in firebase
    //unsubscribe when its done
    const unsubscribe = auth.onAuthStateChanged((user) => {
      //first we set the user and then we set the loading to false
      setcurrentUser(user);
      console.log(user);
      setLoading(false);
    });
    //work as a clean up funtion and unmount(remove) us from this listner when components change
    return unsubscribe;
  }, []);

  const value = {
    currentUser,
    signup,
    login,
  };
  return (
    <AuthContext.Provider value={value}>
      {/* we do not run any of the applyication unless and until loading is false */}
      {!Loading && children}
    </AuthContext.Provider>
  );
};
