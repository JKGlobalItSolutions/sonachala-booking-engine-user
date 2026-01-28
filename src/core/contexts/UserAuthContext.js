import React, { createContext, useState, useEffect, useContext } from 'react';
import { signInWithPopup, GoogleAuthProvider, signInWithEmailAndPassword, signOut } from 'firebase/auth';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { userAuth, userDB } from '../firebase/firebase.user';

const AuthContext = createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = userAuth.onAuthStateChanged(async (user) => {
      if (user) {
        // Check if user exists in users collection
        const userRef = doc(userDB, "users", user.email);
        const snap = await getDoc(userRef);

        if (snap.exists()) {
          // Merge auth user with user data
          setCurrentUser({
            ...user,
            ...snap.data()
          });
        } else {
          // Create user document if it doesn't exist (for new registrations)
          const userData = {
            name: user.displayName || '',
            phone: '',
            createdAt: new Date(),
            email: user.email
          };
          await setDoc(userRef, userData);
          setCurrentUser({
            ...user,
            ...userData
          });
        }
      } else {
        setCurrentUser(null);
      }
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  const signInWithGoogle = async () => {
    const provider = new GoogleAuthProvider();
    const result = await signInWithPopup(userAuth, provider);
    const user = result.user;

    // Check if user exists after Google sign-in
    const userRef = doc(userDB, "users", user.email);
    await getDoc(userRef); // This will ensure user is created via useEffect

    return result;
  };

  const signInWithEmail = async (email, password) => {
    const result = await signInWithEmailAndPassword(userAuth, email, password);
    const user = result.user;

    // Check if user exists
    const userRef = doc(userDB, "users", user.email);
    const snap = await getDoc(userRef);

    if (!snap.exists()) {
      await signOut(userAuth);
      throw new Error("User account not found.");
    }

    return result;
  };

  const value = {
    currentUser,
    loading,
    signInWithGoogle,
    signInWithEmail,
    signOut: () => signOut(userAuth)
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
}
