"use client";
// "use client" -> Next.js ko batata hai: ye component browser me chalega (state, onClick use kar sakta hai).
// Default Next.js components "server" par chalte hain jahan interactivity (useState, onClick) allowed nahi.

import { createContext, useContext, useEffect, useState, ReactNode } from "react";

interface AuthUser {
  name: string;
  email: string;
  role: "CUSTOMER" | "ADMIN";
}

interface AuthContextType {
  user: AuthUser | null;
  login: (token: string, user: AuthUser) => void;
  logout: () => void;
}

// Context = poore app me kahin se bhi "current logged-in user" access karne ka tareeka,
// bina har component me props pass kiye.
const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(null);

  // Page reload hone par bhi login state yaad rahe, isliye localStorage se wapas load karo
  useEffect(() => {
    const stored = localStorage.getItem("user");
    if (stored) setUser(JSON.parse(stored));
  }, []);

  const login = (token: string, userData: AuthUser) => {
    localStorage.setItem("token", token);
    localStorage.setItem("user", JSON.stringify(userData));
    setUser(userData);
  };

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

// Custom "hook" -- har component me ye ek line likh kar current user mil jaayega
export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within AuthProvider");
  return context;
}
