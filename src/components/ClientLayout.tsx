'use client';

import { Inter } from 'next/font/google';
import Sidebar from '@/components/Sidebar';
import Providers from '@/components/Providers';
import { AuthProvider } from '../context/AuthContext';

const inter = Inter({ subsets: ['latin'] });

export default function ClientLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="tr" className="light">
      <body className={`${inter.className} min-h-screen bg-gray-50 dark:bg-gray-900`}>
        <AuthProvider>
          <Providers>
            <div className="flex min-h-screen">
              <Sidebar />
              <main className="flex-1 ml-64 p-8">
                {children}
              </main>
            </div>
          </Providers>
        </AuthProvider>
      </body>
    </html>
  );
} 