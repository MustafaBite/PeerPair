'use client';

import { useAuth } from '@/context/AuthContext';
import Link from 'next/link';

export default function ProfilePage() {
  const { isLoggedIn, username, logout } = useAuth();

  return (
    <div className="min-h-screen bg-[#0f0f0f] p-8">
      <div className="max-w-md mx-auto bg-[#1a1a1a] rounded-lg shadow-lg p-6">
        {isLoggedIn ? (
          <div className="space-y-4">
            <h1 className="text-2xl font-bold text-[#f1f1f1]">Profil</h1>
            <p className="text-[#f1f1f1]">Hoş geldin, {username}!</p>
            <button
              onClick={logout}
              className="w-full p-3 bg-[#2a2a2a] text-[#f1f1f1] rounded-lg hover:bg-[#333333] transition-colors"
            >
              Çıkış Yap
            </button>
          </div>
        ) : (
          <div className="space-y-4">
            <h1 className="text-2xl font-bold text-[#f1f1f1]">Giriş Yap veya Kayıt Ol</h1>
            <div className="space-y-2">
              <Link
                href="/register"
                className="block w-full p-3 bg-[#2a2a2a] text-[#f1f1f1] rounded-lg hover:bg-[#333333] transition-colors text-center"
              >
                Kayıt Ol
              </Link>
              <Link
                href="/login"
                className="block w-full p-3 bg-[#2a2a2a] text-[#f1f1f1] rounded-lg hover:bg-[#333333] transition-colors text-center"
              >
                Giriş Yap
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
} 