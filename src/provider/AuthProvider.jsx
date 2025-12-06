import { createContext, useState, useEffect } from "react";
import {
  getAuth,
  onAuthStateChanged,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
  updateProfile,
  signOut,
} from "firebase/auth";
import toast from "react-hot-toast";
import { app } from "../firebase/firebase.config";
import Loading from "../components/Loading";

export const AuthContext = createContext();
export const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Create account
  const createUser = async (email, password) => {
    setLoading(true);
    try {
      return await createUserWithEmailAndPassword(auth, email, password);
    } finally {
      setLoading(false);
    }
  };

  // Login with email
  const signIn = async (email, password) => {
    setLoading(true);
    try {
      return await signInWithEmailAndPassword(auth, email, password);
    } finally {
      setLoading(false);
    }
  };

  // Google login/register
  const googleLogin = async () => {
    setLoading(true);
    try {
      return await signInWithPopup(auth, googleProvider);
    } catch (err) {
      toast.error(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  // Update profile
  const updateUserProfile = (info) => updateProfile(auth.currentUser, info);

  // Logout
  const logOut = async () => {
    setLoading(true);
    try {
      await signOut(auth);
      toast.success("Logged out");
    } catch (err) {
      toast.error(err.message);
    } finally {
      setLoading(false);
    }
  };

  // Listen to auth changes
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  const authData = {
    user,
    loading,
    createUser,
    signIn,
    googleLogin,
    updateUserProfile,
    logOut,
  };

  if (loading) {
    return <Loading />;
  }

  return (
    <AuthContext.Provider value={authData}>{children}</AuthContext.Provider>
  );
};

export default AuthProvider;
