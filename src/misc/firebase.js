import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/database";

const config = {
  apiKey: "AIzaSyBs8za2PJHAtaInyTdzBC6gJP7bMhs2mUQ",
  authDomain: "instameg-e5a7b.firebaseapp.com",
  databaseURL:
    "https://instameg-e5a7b-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "instameg-e5a7b",
  storageBucket: "instameg-e5a7b.appspot.com",
  messagingSenderId: "95543389601",
  appId: "1:95543389601:web:a1aa1282b93b07a8eaefe0",
};
const app = firebase.initializeApp(config);
//it will give auth obejct which help us to interact with firebase
export const auth = app.auth();
export const database = app.database();
