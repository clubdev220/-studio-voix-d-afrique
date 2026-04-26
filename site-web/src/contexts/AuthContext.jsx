import React, { createContext, useContext, useEffect, useState } from 'react';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import { doc, onSnapshot } from 'firebase/firestore';
import { auth, db } from '../lib/firebase.js';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(null);
  const [userProfile, setUserProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let unsubProfile = null;

    const unsubAuth = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);

      // Unsubscribe previous profile listener if any
      if (unsubProfile) {
        unsubProfile();
        unsubProfile = null;
      }

      if (user) {
        // Real-time subscription to the user profile in Firestore
        unsubProfile = onSnapshot(
          doc(db, 'users', user.uid),
          (snap) => {
            setUserProfile(snap.exists() ? { uid: snap.id, ...snap.data() } : null);
            setLoading(false);
          },
          () => {
            // On error (e.g. rules block read before doc exists), still stop loading
            setUserProfile(null);
            setLoading(false);
          }
        );
      } else {
        setUserProfile(null);
        setLoading(false);
      }
    });

    return () => {
      unsubAuth();
      if (unsubProfile) unsubProfile();
    };
  }, []);

  async function logout() {
    await signOut(auth);
  }

  const isAdmin = userProfile?.role === 'admin';

  return (
    <AuthContext.Provider value={{ currentUser, userProfile, loading, isAdmin, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used inside AuthProvider');
  return ctx;
}
