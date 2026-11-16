import React, { createContext, useContext, useEffect, useState } from 'react';
import { onAuthStateChanged, signInWithPopup, signOut, User } from 'firebase/auth';
import { auth, googleProvider } from '../lib/firebase';
import {
  CourseEnrollment,
  ensureUserProfile,
  subscribeToEnrollments,
  updateUserProfile,
  UserProfile,
} from '../lib/firestoreHelpers';

export type AuthModalMode = 'login' | 'signup';

interface AuthContextValue {
  user: User | null;
  profile: UserProfile | null;
  enrollments: Record<string, CourseEnrollment>;
  authReady: boolean;
  authModalOpen: boolean;
  authModalMode: AuthModalMode;
  openAuthModal: (mode: AuthModalMode) => void;
  closeAuthModal: () => void;
  signInWithGoogle: (signupDetails?: {
    displayName?: string;
    country?: string;
    targetMajor?: string;
  }) => Promise<void>;
  signOutUser: () => Promise<void>;
  refreshProfileUpdates: (
    updates: Partial<Pick<UserProfile, 'displayName' | 'country' | 'targetMajor' | 'plan'>>
  ) => Promise<void>;
  authError: string | null;
  clearAuthError: () => void;
  authLoading: boolean;
}

const AuthContext = createContext<AuthContextValue | null>(null);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [enrollments, setEnrollments] = useState<Record<string, CourseEnrollment>>({});
  const [authReady, setAuthReady] = useState(false);
  const [authModalOpen, setAuthModalOpen] = useState(false);
  const [authModalMode, setAuthModalMode] = useState<AuthModalMode>('login');
  const [authError, setAuthError] = useState<string | null>(null);
  const [authLoading, setAuthLoading] = useState(false);

  useEffect(() => {
    let unsubEnrollments: (() => void) | null = null;

    const unsubAuth = onAuthStateChanged(auth, async (firebaseUser) => {
      setUser(firebaseUser);
      if (unsubEnrollments) {
        unsubEnrollments();
        unsubEnrollments = null;
      }

      if (firebaseUser) {
        try {
          const loadedProfile = await ensureUserProfile(firebaseUser);
          setProfile(loadedProfile);
          unsubEnrollments = subscribeToEnrollments(
            firebaseUser.uid,
            (map) => setEnrollments(map),
            (err) => console.error(err.message)
          );
        } catch (err) {
          console.error('Failed to sync learner profile:', err);
        }
      } else {
        setProfile(null);
        setEnrollments({});
      }
      setAuthReady(true);
    });

    return () => {
      unsubAuth();
      if (unsubEnrollments) unsubEnrollments();
    };
  }, []);

  const openAuthModal = (mode: AuthModalMode) => {
    setAuthModalMode(mode);
    setAuthError(null);
    setAuthModalOpen(true);
  };

  const closeAuthModal = () => {
    setAuthModalOpen(false);
    setAuthError(null);
  };

  const signInWithGoogle = async (signupDetails?: {
    displayName?: string;
    country?: string;
    targetMajor?: string;
  }) => {
    setAuthLoading(true);
    setAuthError(null);
    try {
      const result = await signInWithPopup(auth, googleProvider);
      const synced = await ensureUserProfile(result.user, signupDetails);
      setProfile(synced);
      setAuthModalOpen(false);
    } catch (err) {
      const message =
        err instanceof Error ? err.message : 'Unable to sign in right now. Please try again.';
      if (message.includes('popup-closed-by-user')) {
        setAuthError('Sign-in popup was closed before completing authentication.');
      } else {
        setAuthError(message);
      }
    } finally {
      setAuthLoading(false);
    }
  };

  const signOutUser = async () => {
    await signOut(auth);
    setProfile(null);
    setEnrollments({});
  };

  const refreshProfileUpdates = async (
    updates: Partial<Pick<UserProfile, 'displayName' | 'country' | 'targetMajor' | 'plan'>>
  ) => {
    if (!user) return;
    await updateUserProfile(user.uid, updates);
    setProfile((prev) => (prev ? { ...prev, ...updates } : prev));
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        profile,
        enrollments,
        authReady,
        authModalOpen,
        authModalMode,
        openAuthModal,
        closeAuthModal,
        signInWithGoogle,
        signOutUser,
        refreshProfileUpdates,
        authError,
        clearAuthError: () => setAuthError(null),
        authLoading,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export function useAuth(): AuthContextValue {
  const ctx = useContext(AuthContext);
  if (!ctx) {
    throw new Error('useAuth must be used inside AuthProvider');
  }
  return ctx;
}
