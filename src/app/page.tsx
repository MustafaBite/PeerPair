'use client';

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/context/AuthContext'
import UserMenu from '@/components/UserMenu'

export default function HomePage() {
  const router = useRouter()
  const { user } = useAuth()

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-100 dark:from-dark-bg dark:to-gray-900">
      <header className="bg-white dark:bg-gray-800 shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex">
              <div className="flex-shrink-0 flex items-center">
                <h1 className="text-2xl font-bold text-gray-900 dark:text-white">PeerPair</h1>
              </div>
            </div>
            <div className="flex items-center">
              <UserMenu />
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          <div className="border-4 border-dashed border-gray-200 dark:border-gray-700 rounded-lg h-96 flex items-center justify-center">
            <div className="text-center">
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
                PeerPair'a Hoş Geldiniz
              </h2>
              <p className="text-gray-600 dark:text-gray-400">
                {user ? (
                  'Çalışma arkadaşlarınızı bulmak için hazır mısınız?'
                ) : (
                  'Çalışma arkadaşlarınızı bulmak için giriş yapın veya kayıt olun.'
                )}
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
} 