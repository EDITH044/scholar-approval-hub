
import React, { createContext, useState, useContext, ReactNode } from "react";
import { User, UserRole } from "@/types";

interface AuthContextType {
  user: User | null;
  login: (role: UserRole) => void;
  logout: () => void;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Example users
const FACULTY_USER: User = {
  id: "faculty-1",
  name: "Dr. Johnson",
  email: "johnson@university.edu",
  role: UserRole.FACULTY,
  avatar: "https://i.pravatar.cc/150?u=faculty"
};

const STUDENT_USER: User = {
  id: "student-1",
  name: "Alex Smith",
  email: "alex@university.edu",
  role: UserRole.STUDENT,
  avatar: "https://i.pravatar.cc/150?u=student"
};

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);

  const login = (role: UserRole) => {
    if (role === UserRole.FACULTY) {
      setUser(FACULTY_USER);
    } else {
      setUser(STUDENT_USER);
    }
  };

  const logout = () => {
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, isAuthenticated: !!user }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
