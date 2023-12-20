import React, { useEffect, useState } from "react";
import { createContext } from "react";
import app from "../firebase/Firebase.config";
import {
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  getAuth,
  onAuthStateChanged,
  signInWithPopup,
  updateProfile,
} from "firebase/auth";

export const AuthContext = createContext();
const auth = getAuth(app);
const provider = new GoogleAuthProvider();
const Authcontexts = ({ children }) => {
  const [user, setUser] = useState([]);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      console.log("auth context user ", currentUser);
      setUser(currentUser);
    });

    return () => {
      unsubscribe();
    };
  }, []);
  const Register=(email,password)=>{
      return createUserWithEmailAndPassword(auth,email,password)
  }

  const updateUser=(userInfo)=>{
      return updateProfile(auth.currentUser,userInfo)
  }
  const siginwithGoogle = () => {
    return signInWithPopup(auth, provider);
  };
  console.log("user", user);
  const authInfo = { siginwithGoogle, user ,Register,updateUser};
  return (
    <AuthContext.Provider value={authInfo}>{children}</AuthContext.Provider>
  );
};

export default Authcontexts;
