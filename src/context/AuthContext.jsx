import { useState, useEffect, createContext, useContext } from "react";
import {
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithRedirect,
  signOut,
} from "firebase/auth";
import { auth } from "../firebase";

//import { Spinner } from "@material-tailwind/react";

//creando contexto
const AuthContext = createContext();

//proveyendo contexto
export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);
  //sign-in with google
  const signInWithGoogle = () => {
    const provider = new GoogleAuthProvider();
    signInWithRedirect(auth, provider);
  };

  //sing-out
  const logout = () => signOut(auth);

  const value = {
    // currentIp,
    currentUser,
    signInWithGoogle,
    logout,
    loading,
  };

  // set current user
  useEffect(() => {
    const unsuscribe = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
      setLoading(false);
    });

    return unsuscribe;
  }, []);

  return (
    <AuthContext.Provider value={value}>
      {loading ? (
        <span className="loading loading-spinner loading-lg m-auto"></span>
      ) : (
        children
      )}
    </AuthContext.Provider>
  );
};

export const UserAuth = () => {
  return useContext(AuthContext);
};

/* <Spinner className="h-12 w-12 m-auto" /> */
