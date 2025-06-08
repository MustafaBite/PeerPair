'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useTheme } from '@/context/ThemeContext';
import { useAuth } from '@/context/AuthContext';
import { useState, useEffect } from 'react';

interface MenuItem {
  title: string;
  href: string;
  icon: string;
}

const menuItems: MenuItem[] = [
  { title: 'Ana Sayfa', href: '/', icon: '🏠' },
  { title: 'Fakülteler', href: '/faculties', icon: '🎓' },
  { title: 'Random Sohbet', href: '/random-chat', icon: '🎲' },
  { title: 'Sohbetlerim', href: '/chats', icon: '💬' },
  { title: 'Gruplarım', href: '/groups', icon: '👥' },
];

export default function Sidebar() {
  const pathname = usePathname();
  const { theme, toggleTheme } = useTheme();
  const { isLoggedIn, username, login, logout, user } = useAuth();
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [fullName, setFullName] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
      if (window.innerWidth >= 768) {
        setIsOpen(true);
      }
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const handleLogin = async () => {
    try {
      await login(fullName, password);
      setShowLoginModal(false);
      setShowProfileMenu(false);
      setFullName('');
      setPassword('');
    } catch (error) {
      // Hata mesajını göster
      console.error('Giriş hatası:', error);
      // Burada bir hata mesajı gösterme UI'ı eklenebilir
    }
  };

  const SidebarContent = () => (
    <>
      {/* Logo */}
      <div className="p-4 border-b border-gray-200 dark:border-gray-700">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-[#f1f1f1]">PeerPair</h1>
      </div>

      {/* Kullanıcı Bilgileri */}
      {isLoggedIn && user && (
        <div className="p-4 border-b border-gray-200 dark:border-gray-700">
          <div className="space-y-2">
            <div className="flex items-center space-x-2">
              <span className="text-xl">👤</span>
              <span className="font-semibold text-gray-900 dark:text-[#f1f1f1]">{user.fullName}</span>
            </div>
            <div className="flex items-center space-x-2">
              <span className="text-xl">🏫</span>
              <span className="text-gray-700 dark:text-gray-300">{user.faculty}</span>
            </div>
            <div className="flex items-center space-x-2">
              <span className="text-xl">🎓</span>
              <span className="text-gray-700 dark:text-gray-300">{user.grade}. Sınıf</span>
            </div>
          </div>
        </div>
      )}

      {/* Profil Butonu */}
      <div className="p-4 border-b border-gray-200 dark:border-gray-700 relative">
        <button
          onClick={() => setShowProfileMenu(!showProfileMenu)}
          className="w-full flex items-center space-x-3 p-2 rounded-lg bg-gray-100 dark:bg-[#2a2a2a] text-gray-900 dark:text-[#f1f1f1] hover:bg-gray-200 dark:hover:bg-[#333333] transition-colors"
        >
          <span className="text-xl">👤</span>
          <span className="font-semibold">Profilim</span>
        </button>

        {/* Profil Menüsü */}
        {showProfileMenu && (
          <div className="absolute top-full left-0 right-0 mt-2 bg-white dark:bg-[#2a2a2a] rounded-lg shadow-lg overflow-hidden z-50">
            {isLoggedIn ? (
              <>
                <Link
                  href="/profile"
                  className="block p-3 text-gray-900 dark:text-[#f1f1f1] hover:bg-gray-100 dark:hover:bg-[#333333] transition-colors"
                  onClick={() => setShowProfileMenu(false)}
                >
                  Profil Bilgileri
                </Link>
                <Link
                  href="/profile/edit"
                  className="block p-3 text-gray-900 dark:text-[#f1f1f1] hover:bg-gray-100 dark:hover:bg-[#333333] transition-colors"
                  onClick={() => setShowProfileMenu(false)}
                >
                  Profil Düzenle
                </Link>
                <button
                  onClick={() => {
                    logout();
                    setShowProfileMenu(false);
                  }}
                  className="w-full p-3 text-left text-gray-900 dark:text-[#f1f1f1] hover:bg-gray-100 dark:hover:bg-[#333333] transition-colors"
                >
                  Çıkış Yap
                </button>
              </>
            ) : (
              <>
                <button
                  onClick={() => {
                    setShowLoginModal(true);
                    setShowProfileMenu(false);
                  }}
                  className="w-full p-3 text-left text-gray-900 dark:text-[#f1f1f1] hover:bg-gray-100 dark:hover:bg-[#333333] transition-colors"
                >
                  Giriş Yap
                </button>
                <Link
                  href="/register"
                  className="block p-3 text-gray-900 dark:text-[#f1f1f1] hover:bg-gray-100 dark:hover:bg-[#333333] transition-colors"
                  onClick={() => setShowProfileMenu(false)}
                >
                  Kayıt Ol
                </Link>
              </>
            )}
          </div>
        )}
      </div>

      {/* Menü */}
      <nav className="h-[calc(100vh-16rem)] overflow-y-auto">
        <ul className="p-4 space-y-2">
          {menuItems.map((item) => (
            <li key={item.href}>
              <Link
                href={item.href}
                className={`flex items-center space-x-3 p-2 rounded-lg transition-colors ${
                  pathname === item.href
                    ? 'bg-gray-100 dark:bg-[#2a2a2a] text-gray-900 dark:text-[#f1f1f1]'
                    : 'text-gray-600 dark:text-[#f1f1f1] hover:bg-gray-100 dark:hover:bg-[#2a2a2a]'
                }`}
                onClick={() => isMobile && setIsOpen(false)}
              >
                <span className="text-xl">{item.icon}</span>
                <span>{item.title}</span>
              </Link>
            </li>
          ))}
        </ul>
      </nav>

      {/* Tema Değiştirme Butonu */}
      <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-gray-200 dark:border-gray-700">
        <button
          onClick={toggleTheme}
          className="w-full flex items-center justify-center space-x-2 p-2 rounded-lg bg-gray-100 dark:bg-[#2a2a2a] text-gray-900 dark:text-[#f1f1f1] hover:bg-gray-200 dark:hover:bg-[#333333] transition-colors"
        >
          <span>{theme === 'light' ? '🌙' : '☀️'}</span>
          <span>{theme === 'light' ? 'Karanlık Tema' : 'Aydınlık Tema'}</span>
        </button>
      </div>
    </>
  );

  return (
    <>
      {/* Hamburger Menu Button */}
      {isMobile && (
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="fixed top-4 left-4 z-50 p-2 rounded-lg bg-white dark:bg-[#1e1e1e] shadow-lg"
        >
          <span className="text-2xl">{isOpen ? '✕' : '☰'}</span>
        </button>
      )}

      {/* Sidebar */}
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ 
          opacity: 1, 
          x: isMobile ? (isOpen ? 0 : -300) : 0,
          width: isMobile ? 300 : 256
        }}
        transition={{ duration: 0.3 }}
        className={`fixed top-0 left-0 h-screen bg-white dark:bg-[#1e1e1e] shadow-lg z-40 ${
          isMobile ? 'w-[300px]' : 'w-64'
        }`}
      >
        <SidebarContent />
      </motion.div>

      {/* Login Modal */}
      {showLoginModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white dark:bg-[#1e1e1e] rounded-lg p-6 w-full max-w-md">
            <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-[#f1f1f1]">Giriş Yap</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Ad Soyad
                </label>
                <input
                  type="text"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-[#2a2a2a] text-gray-900 dark:text-[#f1f1f1] placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Adınız ve soyadınız"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Şifre
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-[#2a2a2a] text-gray-900 dark:text-[#f1f1f1] placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="••••••••"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200"
                  >
                    {showPassword ? '👁️' : '👁️‍🗨️'}
                  </button>
                </div>
              </div>
              <div className="flex space-x-2">
                <button
                  onClick={handleLogin}
                  className="flex-1 p-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                >
                  Giriş Yap
                </button>
                <Link
                  href="/register"
                  className="flex-1 p-2 bg-gray-200 dark:bg-[#2a2a2a] text-gray-900 dark:text-[#f1f1f1] rounded-lg hover:bg-gray-300 dark:hover:bg-[#333333] transition-colors text-center focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
                  onClick={() => setShowLoginModal(false)}
                >
                  Kayıt Ol
                </Link>
              </div>
            </div>
            <button
              onClick={() => setShowLoginModal(false)}
              className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
            >
              ✕
            </button>
          </div>
        </div>
      )}
    </>
  );
} 