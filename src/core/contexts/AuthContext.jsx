import React, { createContext, useState, useEffect, useContext } from 'react';
import { userAuth, userDB } from '../firebase/firebase.user';
import { onAuthStateChanged, signInWithEmailAndPassword, signOut, signInWithPopup, GoogleAuthProvider } from 'firebase/auth';
import { doc, getDoc, setDoc } from 'firebase/firestore';

const AuthContext = createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Function to handle Google Sign In
  const signInWithGoogle = async () => {
    const provider = new GoogleAuthProvider();
    try {
      await signInWithPopup(userAuth, provider);
      return true;
    } catch (error) {
      console.error('Error in Google sign in:', error);
      throw error;
    }
  };

  // Function to handle Email/Password Sign In
  const signInWithEmail = async (email, password) => {
    try {
      const result = await signInWithEmailAndPassword(userAuth, email, password);
      const user = result.user;

      const userRef = doc(userDB, 'Users', user.uid);
      const snap = await getDoc(userRef);

      if (!snap.exists()) {
        // Allow login, the onAuthStateChanged will handle creation
        console.log("User document not found, will be created.");
      }

      return true;
    } catch (error) {
      console.error('Error in email sign in:', error);
      throw error;
    }
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(userAuth, async (user) => {
      if (user) {
        // Get the user's Firestore data - only allow if user exists
        const userRef = doc(userDB, 'Users', user.uid);
        const userSnap = await getDoc(userRef);

        if (userSnap.exists()) {
          // Combine auth user and Firestore data
          setCurrentUser({
            ...user,
            ...userSnap.data()
          });
        } else {
          // New user logic: Create a basic user document
          const newUserData = {
            email: user.email,
            role: 'user', // Default role
            createdAt: new Date(),
          };

          try {
            await setDoc(userRef, newUserData);
            setCurrentUser({
              ...user,
              ...newUserData
            });
          } catch (err) {
            console.error("Error creating new user document:", err);
            // Fallback to just auth user if DB write fails
            setCurrentUser(user);
          }
        }
      } else {
        setCurrentUser(null);
      }
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  const value = {
    currentUser,
    loading,
    signInWithGoogle,
    signInWithEmail
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}
