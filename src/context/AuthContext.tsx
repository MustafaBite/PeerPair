'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

interface AuthContextType {
  isLoggedIn: boolean;
  username: string | null;
  login: (name: string, password: string) => Promise<void>;
  logout: () => void;
  register: (name: string, password: string) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem('token');
    const storedUsername = localStorage.getItem('username');
    if (token && storedUsername) {
      setIsLoggedIn(true);
      setUsername(storedUsername);
    }
  }, []);

  const login = async (name: string, password: string) => {
    try {
      const response = await fetch('http://localhost:3001/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Giriş yapılırken bir hata oluştu');
      }

      localStorage.setItem('token', 'dummy-token'); // Gerçek bir token sistemi eklenebilir
      localStorage.setItem('username', data.user.name);
      setIsLoggedIn(true);
      setUsername(data.user.name);
    } catch (error) {
      throw error;
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('username');
    setIsLoggedIn(false);
    setUsername(null);
    router.push('/');
  };

  const register = async (name: string, password: string) => {
    try {
      const response = await fetch('http://localhost:3001/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Kayıt olurken bir hata oluştu');
      }

      // Kayıt başarılı olduğunda otomatik giriş yap
      await login(name, password);
    } catch (error) {
      throw error;
    }
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, username, login, logout, register }}>
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