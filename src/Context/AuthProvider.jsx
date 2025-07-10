import React, { useEffect, useState } from "react";
import { AuthContext } from "./AuthContext";
import { auth } from "../firebase/firebase.init";
import { createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile } from "firebase/auth";
import { GoogleAuthProvider } from "firebase/auth";
const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading,setLoading]=useState(true)
  const googleProvider = new GoogleAuthProvider();

  const createUser = (email, password) => {
    setLoading(true);
    return createUserWithEmailAndPassword(auth, email, password);
  };
  const signInUser = (email,password)=>{
    setLoading(true)
    return signInWithEmailAndPassword(auth,email,password)
  };
  const updateuserDetails = (updatedDetails)=>{
    return updateProfile(auth.currentUser, updatedDetails)
  }
  const SignOutuser = ()=>{
    setLoading(true)
    return signOut(auth)
  };
 const googleSignIn = ()=>{
    setLoading(true)
    return signInWithPopup(auth,googleProvider)
 }
 useEffect(()=>{
    const unsubscribe = onAuthStateChanged(auth,(currentUser)=>{
        setUser(currentUser);
        setLoading(false)
    })
    return ()=> unsubscribe();
 },[])

  const userInfo = {
    user,
    createUser,
    signInUser,
    SignOutuser,
    googleSignIn,
    loading,
    updateuserDetails
  };

  return (
    <AuthContext.Provider value={userInfo}>{children}</AuthContext.Provider>
  );
};

export default AuthProvider;
