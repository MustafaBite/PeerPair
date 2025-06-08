'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { useRouter } from 'next/navigation';

interface User {
  id: number;
  fullName: string;
  email: string;
  faculty: string;
  grade: number;
}

interface AuthContextType {
  user: User | null;
  isLoggedIn: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (userData: {
    fullName: string;
    email: string;
    password: string;
    faculty: string;
    grade: number;
  }) => Promise<void>;
  logout: () => void;
  updateProfile: (userData: Partial<User>) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';

async function fetchWithRetry(url: string, options: RequestInit, retries = 3): Promise<Response> {
  try {
    const response = await fetch(url, options);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return response;
  } catch (error) {
    if (retries > 0) {
      console.log(`Retrying... ${retries} attempts left`);
      await new Promise(resolve => setTimeout(resolve, 1000)); // 1 saniye bekle
      return fetchWithRetry(url, options, retries - 1);
    }
    throw error;
  }
}

async function handleResponse<T>(response: Response): Promise<T> {
  const contentType = response.headers.get('content-type');
  if (!contentType || !contentType.includes('application/json')) {
    throw new Error('API yanıtı JSON formatında değil');
  }

  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.message || 'Bir hata oluştu');
  }
  return data;
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      fetchWithRetry(`${API_BASE_URL}/auth/profile`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
        .then(handleResponse)
        .then(data => {
          setUser(data.user);
          setIsLoggedIn(true);
        })
        .catch(error => {
          console.error('Profile fetch error:', error);
          localStorage.removeItem('token');
          setUser(null);
          setIsLoggedIn(false);
        });
    }
  }, []);

  const login = async (email: string, password: string) => {
    try {
      const data = await handleResponse<{ token: string; user: User }>(
        await fetchWithRetry(`${API_BASE_URL}/auth/login`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ email, password })
        })
      );

      localStorage.setItem('token', data.token);
      setUser(data.user);
      setIsLoggedIn(true);
    } catch (error) {
      console.error('Login error:', error);
      throw error;
    }
  };

  const register = async (userData: {
    fullName: string;
    email: string;
    password: string;
    faculty: string;
    grade: number;
  }) => {
    try {
      const data = await handleResponse<{ token: string; user: User }>(
        await fetchWithRetry(`${API_BASE_URL}/auth/register`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(userData)
        })
      );

      localStorage.setItem('token', data.token);
      setUser(data.user);
      setIsLoggedIn(true);
    } catch (error) {
      console.error('Register error:', error);
      throw error;
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    setUser(null);
    setIsLoggedIn(false);
    router.push('/');
  };

  const updateProfile = async (userData: Partial<User>) => {
    const token = localStorage.getItem('token');
    if (!token) {
      throw new Error('Oturum açmanız gerekiyor');
    }

    try {
      const data = await handleResponse<{ user: User }>(
        await fetchWithRetry(`${API_BASE_URL}/auth/profile`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`
          },
          body: JSON.stringify(userData)
        })
      );

      setUser(data.user);
    } catch (error) {
      console.error('Profile update error:', error);
      throw error;
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoggedIn,
        login,
        register,
        logout,
        updateProfile
      }}
    >
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