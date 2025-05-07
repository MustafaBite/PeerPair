'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '../context/AuthContext';

export default function Profile() {
  const router = useRouter();
  const { isLoggedIn, user } = useAuth();

  if (!isLoggedIn) {
    return (
      <div className="flex gap-4">
        <button
          onClick={() => router.push('/login')}
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
        >
          Giriş Yap
        </button>
        <button
          onClick={() => router.push('/register')}
          className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 transition-colors"
        >
          Ücretsiz Kaydolun
        </button>
      </div>
    );
  }

  return (
    <div className="flex items-center gap-4">
      <span className="text-gray-700">Hoş geldin, {user?.firstName} {user?.lastName}</span>
    </div>
  );
} 