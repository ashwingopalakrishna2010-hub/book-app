import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";
import {
  onAuthStateChanged,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  updateProfile,
  type User,
} from "firebase/auth";
import { doc, setDoc, getDoc } from "firebase/firestore";
import { auth, db } from "../lib/firebase";

interface AuthContextType {
  user: User | null;
  loading: boolean;
  signUp: (
    email: string,
    password: string,
    displayName: string,
  ) => Promise<void>;
  logIn: (email: string, password: string) => Promise<void>;
  logOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | null>(null);

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
}

async function ensureUserDoc(user: User) {
  console.log("ensureUserDoc called for user:", user.uid);
  const ref = doc(db, "users", user.uid);
  const snap = await getDoc(ref);
  if (!snap.exists()) {
    console.log("Creating new user doc for:", user.uid);
    await setDoc(ref, {
      displayName: user.displayName || user.email?.split("@")[0] || "Reader",
      email: user.email,
      streak: { currentStreak: 0, longestStreak: 0, lastActivityDate: "" },
      createdAt: new Date().toISOString(),
    });
    console.log("User doc created successfully for:", user.uid);
  } else {
    console.log("User doc already exists for:", user.uid);
  }
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;
    console.log("AuthProvider useEffect started");

    const unsubscribe = onAuthStateChanged(auth, async (u) => {
      if (!isMounted) return;

      console.log("onAuthStateChanged triggered with user:", u ? u.uid : "null");
      setUser(u);
      if (u) {
        try {
          console.log("Creating/updating user doc for:", u.uid);
          await ensureUserDoc(u);
          console.log("User doc created/updated successfully");
        } catch (err) {
          console.error("Failed to create user doc:", err);
        }
      } else {
        console.log("User signed out");
      }
      setLoading(false);
      console.log("Auth state loading set to false");
    });

    return () => {
      isMounted = false;
      unsubscribe();
    };
  }, []);

  const signUp = async (
    email: string,
    password: string,
    displayName: string,
  ) => {
    try {
      console.log("Attempting sign up with:", { email, displayName });
      const cred = await createUserWithEmailAndPassword(auth, email, password);
      console.log("Sign up successful, user:", cred.user.uid);
      await updateProfile(cred.user, { displayName });
      await ensureUserDoc(cred.user);
      console.log("User document created successfully");
    } catch (error: any) {
      console.error("Sign up error details:", {
        code: error.code,
        message: error.message,
        fullError: error,
      });
      throw error;
    }
  };

  const logIn = async (email: string, password: string) => {
    try {
      console.log("AuthContext: Attempting log in with:", email);
      await signInWithEmailAndPassword(auth, email, password);
      console.log("AuthContext: Log in successful");
    } catch (error: any) {
      console.error("AuthContext: Log in error details:", {
        code: error.code,
        message: error.message,
        fullError: error,
      });
      throw error;
    }
  };

  const logOut = async () => {
    await signOut(auth);
  };

  return (
    <AuthContext.Provider
      value={{ user, loading, signUp, logIn, logOut }}
    >
      {children}
    </AuthContext.Provider>
  );
}
