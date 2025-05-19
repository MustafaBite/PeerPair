'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '../../context/AuthContext';
import { useTheme } from '@/context/ThemeContext';

export default function Register() {
  const router = useRouter();
  const { register } = useAuth();
  const { theme } = useTheme();
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
  });
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      await register(formData.fullName, formData.email, formData.password);
      router.push('/');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Kayıt olurken bir hata oluştu');
    } finally {
      setIsLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-white dark:bg-[#0f0f0f]">
      <div className="max-w-md w-full space-y-8 p-8 bg-white dark:bg-[#1e1e1e] rounded-lg shadow">
        <h2 className="text-3xl font-bold text-center text-gray-900 dark:text-[#f1f1f1]">Ücretsiz Kaydolun</h2>
        {error && (
          <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 text-red-600 dark:text-red-400 px-4 py-3 rounded relative" role="alert">
            <span className="block sm:inline">{error}</span>
          </div>
        )}
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="space-y-4">
            <div>
              <label htmlFor="fullName" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                Ad Soyad
              </label>
              <input
                id="fullName"
                name="fullName"
                type="text"
                required
                className="mt-1 block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm bg-white dark:bg-[#2a2a2a] text-gray-900 dark:text-[#f1f1f1] placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                value={formData.fullName}
                onChange={handleChange}
                disabled={isLoading}
                placeholder="Adınız ve soyadınız"
              />
            </div>
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                E-posta
              </label>
              <input
                id="email"
                name="email"
                type="email"
                required
                className="mt-1 block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm bg-white dark:bg-[#2a2a2a] text-gray-900 dark:text-[#f1f1f1] placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                value={formData.email}
                onChange={handleChange}
                disabled={isLoading}
                placeholder="ornek@email.com"
              />
            </div>
            <div className="relative">
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                Şifre
              </label>
              <input
                id="password"
                name="password"
                type={showPassword ? "text" : "password"}
                required
                className="mt-1 block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm bg-white dark:bg-[#2a2a2a] text-gray-900 dark:text-[#f1f1f1] placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                value={formData.password}
                onChange={handleChange}
                disabled={isLoading}
                placeholder="••••••••"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200"
              >
                {showPassword ? '👁️' : '👁️‍🗨️'}
              </button>
            </div>
          </div>
          <button
            type="submit"
            className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 disabled:opacity-50 disabled:cursor-not-allowed dark:bg-green-700 dark:hover:bg-green-800"
            disabled={isLoading}
          >
            {isLoading ? 'Kayıt yapılıyor...' : 'Kaydol'}
          </button>
        </form>
      </div>
    </div>
  );
} 