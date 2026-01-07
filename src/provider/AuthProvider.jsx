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
  setPersistence,
  browserLocalPersistence,
} from "firebase/auth";
import toast from "react-hot-toast";
import { app } from "../firebase/firebase.config";

export const AuthContext = createContext();
export const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [authInitialized, setAuthInitialized] = useState(false);

  // Initialize Firebase Auth persistence
  useEffect(() => {
    const initializeAuth = async () => {
      try {
        // Set persistence to LOCAL so user stays logged in across browser sessions
        await setPersistence(auth, browserLocalPersistence);
        console.log("Firebase auth persistence set to LOCAL");
      } catch (error) {
        console.error("Error setting auth persistence:", error);
      }
    };
    
    initializeAuth();
  }, []);

  // Create account
  const createUser = async (email, password) => {
    setLoading(true);
    try {
      const result = await createUserWithEmailAndPassword(auth, email, password);
      return result;
    } catch (error) {
      setLoading(false);
      throw error;
    }
  };

  // Login with email & password
  const signIn = async (email, password) => {
    setLoading(true);
    try {
      const result = await signInWithEmailAndPassword(auth, email, password);
      return result;
    } catch (error) {
      setLoading(false);
      throw error;
    }
  };

  // Google login/register
  const googleLogin = async () => {
    setLoading(true);
    try {
      const result = await signInWithPopup(auth, googleProvider);
      return result;
    } catch (error) {
      setLoading(false);
      throw error;
    }
  };

  // Update user profile
  const updateUserProfile = async (info) => {
    setLoading(true);
    try {
      await updateProfile(auth.currentUser, info);
      // Update the local user state to reflect the changes immediately
      setUser({ ...auth.currentUser });
      setLoading(false);
    } catch (error) {
      setLoading(false);
      throw error;
    }
  };

  // Logout
  const logOut = async () => {
    setLoading(true);
    try {
      await signOut(auth);
      setUser(null);
      toast.success("Successfully logged out!");
    } catch (err) {
      toast.error(err.message);
    } finally {
      setLoading(false);
    }
  };

  // Monitor authentication state changes
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      console.log("Auth state changed:", currentUser ? "User logged in" : "User logged out");
      setUser(currentUser);
      
      // Only set loading to false after the first auth state check
      if (!authInitialized) {
        setAuthInitialized(true);
        // Add a small delay to ensure smooth transition
        setTimeout(() => {
          setLoading(false);
        }, 100);
      } else {
        setLoading(false);
      }
    });

    return () => unsubscribe();
  }, [authInitialized]);

  // Enhanced initialization screen with better styling
  if (!authInitialized) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-bg-primary to-bg-surface relative overflow-hidden">
        {/* Background elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-primary-400/10 to-secondary-400/10 rounded-full blur-3xl animate-pulse-slow" />
          <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-gradient-to-tr from-secondary-400/10 to-primary-400/10 rounded-full blur-3xl animate-pulse-slow-delayed" />
        </div>
        
        <div className="relative z-10 text-center glass-primary rounded-2xl p-8 border border-white/20 dark:border-white/10">
          <div className="w-16 h-16 border-4 border-primary-500/30 border-t-primary-500 rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-text-secondary font-medium">Initializing PawMart...</p>
        </div>
      </div>
    );
  }

  const authData = {
    user,
    loading,
    setLoading,
    createUser,
    signIn,
    googleLogin,
    updateUserProfile,
    logOut,
    authInitialized,
  };

  return (
    <AuthContext.Provider value={authData}>{children}</AuthContext.Provider>
  );
};

export default AuthProvider;
