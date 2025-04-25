'use client';

import { motion } from 'framer-motion';
import { useQuery } from '@tanstack/react-query';
import Sidebar from '@/components/Sidebar';

export default function Home() {
  const { data: stats, isLoading } = useQuery({
    queryKey: ['stats'],
    queryFn: () => fetch('/api/stats').then(res => res.json()),
  });

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Sol Menü */}
      <Sidebar />

      {/* Ana İçerik */}
      <main className="flex-1 ml-64 p-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="max-w-4xl mx-auto"
        >
          <h1 className="text-3xl font-bold text-gray-800 dark:text-gray-200 mb-6">
            Hoş Geldin!
          </h1>

          <p className="mt-2 text-gray-600 dark:text-gray-400">PeerPair'a hoş geldin. Hemen sohbete başla!</p>

          {/* İstatistik Kartları */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md"
            >
              <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-300 mb-2">
                Toplam Sohbet
              </h3>
              <p className="mt-2 text-3xl font-bold text-primary-600 dark:text-primary-400">
                {isLoading ? '...' : stats?.totalChats || 0}
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md"
            >
              <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-300 mb-2">
                Arkadaşlar
              </h3>
              <p className="mt-2 text-3xl font-bold text-primary-600 dark:text-primary-400">
                {isLoading ? '...' : stats?.friends || 0}
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md"
            >
              <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-300 mb-2">
                Aktif Gruplar
              </h3>
              <p className="mt-2 text-3xl font-bold text-primary-600 dark:text-primary-400">
                {isLoading ? '...' : stats?.activeGroups || 0}
              </p>
            </motion.div>
          </div>

          {/* Hızlı Erişim */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="grid grid-cols-1 md:grid-cols-2 gap-6"
          >
            <button className="bg-primary-600 dark:bg-primary-700 text-white p-4 rounded-lg hover:bg-primary-700 dark:hover:bg-primary-600 transition-colors">
              Random Sohbet
            </button>
            <button className="bg-primary-600 dark:bg-primary-700 text-white p-4 rounded-lg hover:bg-primary-700 dark:hover:bg-primary-600 transition-colors">
              Grup Oluştur
            </button>
          </motion.div>
        </motion.div>
      </main>
    </div>
  );
} 