'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import Link from 'next/link';
import PasswordInput from '@/components/PasswordInput';

const faculties = [
  'Mühendislik Fakültesi',
  'Fen-Edebiyat Fakültesi',
  'İktisadi ve İdari Bilimler Fakültesi',
  'Tıp Fakültesi',
  'Diş Hekimliği Fakültesi',
  'Eczacılık Fakültesi',
  'Mimarlık Fakültesi',
  'Eğitim Fakültesi',
  'Hukuk Fakültesi',
  'İletişim Fakültesi'
];

const grades = [1, 2, 3, 4, 5, 6];

export default function RegisterPage() {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
    confirmPassword: '',
    faculty: '',
    grade: ''
  });
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const { register } = useAuth();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (formData.password !== formData.confirmPassword) {
      setError('Şifreler eşleşmiyor');
      return;
    }

    setIsLoading(true);

    try {
      await register({
        fullName: formData.fullName,
        email: formData.email,
        password: formData.password,
        faculty: formData.faculty,
        grade: parseInt(formData.grade)
      });
      router.push('/');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Kayıt olurken bir hata oluştu');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-white to-gray-100 dark:from-dark-bg dark:to-gray-900 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900 dark:text-gray-100">
            Yeni Hesap Oluşturun
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600 dark:text-gray-400">
            Veya{' '}
            <Link
              href="/login"
              className="font-medium text-primary-600 hover:text-primary-500 dark:text-primary-400 dark:hover:text-primary-300"
            >
              mevcut hesabınıza giriş yapın
            </Link>
          </p>
        </div>

        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="rounded-md shadow-sm space-y-4">
            <div>
              <label htmlFor="fullName" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                Ad Soyad
              </label>
              <input
                id="fullName"
                name="fullName"
                type="text"
                required
                value={formData.fullName}
                onChange={handleChange}
                className="input mt-1"
                placeholder="Ad Soyad"
              />
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                E-posta Adresi
              </label>
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                required
                value={formData.email}
                onChange={handleChange}
                className="input mt-1"
                placeholder="ornek@email.com"
              />
            </div>

            <div>
              <label htmlFor="faculty" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                Fakülte
              </label>
              <select
                id="faculty"
                name="faculty"
                required
                value={formData.faculty}
                onChange={handleChange}
                className="select mt-1"
              >
                <option value="">Fakülte Seçin</option>
                {faculties.map(faculty => (
                  <option key={faculty} value={faculty}>
                    {faculty}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label htmlFor="grade" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                Sınıf
              </label>
              <select
                id="grade"
                name="grade"
                required
                value={formData.grade}
                onChange={handleChange}
                className="select mt-1"
              >
                <option value="">Sınıf Seçin</option>
                {grades.map(grade => (
                  <option key={grade} value={grade}>
                    {grade}. Sınıf
                  </option>
                ))}
              </select>
            </div>

            <PasswordInput
              id="password"
              name="password"
              label="Şifre"
              required
              value={formData.password}
              onChange={handleChange}
              placeholder="••••••••"
            />

            <PasswordInput
              id="confirmPassword"
              name="confirmPassword"
              label="Şifre Tekrar"
              required
              value={formData.confirmPassword}
              onChange={handleChange}
              placeholder="••••••••"
            />
          </div>

          {error && (
            <div className="rounded-md bg-red-50 dark:bg-red-900/50 p-4">
              <div className="flex">
                <div className="ml-3">
                  <h3 className="text-sm font-medium text-red-800 dark:text-red-200">
                    {error}
                  </h3>
                </div>
              </div>
            </div>
          )}

          <div>
            <button
              type="submit"
              disabled={isLoading}
              className="btn btn-primary w-full flex justify-center"
            >
              {isLoading ? (
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
              ) : (
                'Kayıt Ol'
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
} 