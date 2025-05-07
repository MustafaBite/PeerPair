'use client';

import React, { createContext, useContext, useState, ReactNode } from 'react';

interface User {
  firstName: string;
  lastName: string;
  email: string;
}

interface AuthContextType {
  user: User | null;
  isLoggedIn: boolean;
  login: (email: string, password: string, firstName: string, lastName: string) => Promise<void>;
  register: (fullName: string, email: string, password: string) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const login = async (email: string, password: string, firstName: string, lastName: string) => {
    try {
      if (!email || !password || !firstName || !lastName) {
        throw new Error('Tüm alanlar gereklidir');
      }

      if (password.length < 6) {
        throw new Error('Şifre en az 6 karakter olmalıdır');
      }

      // Burada gerçek bir API çağrısı yapılabilir
      setUser({ firstName, lastName, email });
      setIsLoggedIn(true);
    } catch (error) {
      throw error;
    }
  };

  const register = async (fullName: string, email: string, password: string) => {
    try {
      if (!fullName || !email || !password) {
        throw new Error('Tüm alanlar gereklidir');
      }

      if (password.length < 6) {
        throw new Error('Şifre en az 6 karakter olmalıdır');
      }

      if (fullName.length < 3) {
        throw new Error('Ad soyad en az 3 karakter olmalıdır');
      }

      // Burada gerçek bir API çağrısı yapılabilir
      const [firstName, lastName] = fullName.split(' ');
      setUser({ firstName, lastName: lastName || '', email });
      setIsLoggedIn(true);
    } catch (error) {
      throw error;
    }
  };

  const logout = () => {
    setUser(null);
    setIsLoggedIn(false);
  };

  return (
    <AuthContext.Provider value={{ user, isLoggedIn, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
} 