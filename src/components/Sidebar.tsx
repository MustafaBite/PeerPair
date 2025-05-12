'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useTheme } from '@/context/ThemeContext';

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

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      className="fixed top-0 left-0 h-screen w-64 bg-white dark:bg-gray-800 shadow-lg z-50"
    >
      {/* Logo */}
      <div className="p-4 border-b dark:border-gray-700">
        <h1 className="text-2xl font-bold text-primary-600 dark:text-primary-400">PeerPair</h1>
      </div>

      {/* Giriş Yap Butonu */}
      <div className="p-4 border-b dark:border-gray-700">
        <Link
          href="/login"
          className="flex items-center space-x-3 p-2 rounded-lg bg-primary-100 dark:bg-primary-900 text-primary-600 dark:text-primary-400 hover:bg-primary-200 dark:hover:bg-primary-800 transition-colors"
        >
          <span className="text-xl">🔑</span>
          <span className="font-semibold">Giriş Yap</span>
        </Link>
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
                    ? 'bg-primary-100 dark:bg-primary-900 text-primary-600 dark:text-primary-400'
                    : 'text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
                }`}
              >
                <span className="text-xl">{item.icon}</span>
                <span>{item.title}</span>
              </Link>
            </li>
          ))}
        </ul>
      </nav>

      {/* Tema Değiştirme Butonu */}
      <div className="absolute bottom-0 left-0 right-0 p-4 border-t dark:border-gray-700">
        <button
          onClick={toggleTheme}
          className="w-full flex items-center justify-center space-x-2 p-2 rounded-lg bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
        >
          <span>{theme === 'light' ? '🌙' : '☀️'}</span>
          <span>{theme === 'light' ? 'Karanlık Tema' : 'Aydınlık Tema'}</span>
        </button>
      </div>
    </motion.div>
  );
} 