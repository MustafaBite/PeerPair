'use client'

import { HomeIcon, UserGroupIcon, ChatBubbleLeftRightIcon, UserIcon } from '@heroicons/react/24/outline'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

export default function Sidebar() {
  const pathname = usePathname()
  
  const menuItems = [
    { name: 'Home', icon: HomeIcon, href: '/' },
    { name: 'Match', icon: UserGroupIcon, href: '/match' },
    { name: 'Chat', icon: ChatBubbleLeftRightIcon, href: '/chat' },
    { name: 'Profile', icon: UserIcon, href: '/profile' },
  ]

  return (
    <aside className="w-64 bg-white shadow-lg">
      <div className="p-6">
        <h1 className="text-2xl font-bold text-primary-dark">PeerPair</h1>
      </div>
      
      <nav className="mt-6">
        {menuItems.map((item) => {
          const isActive = pathname === item.href
          return (
            <Link
              key={item.name}
              href={item.href}
              className={`w-full flex items-center px-6 py-3 text-gray-700 hover:bg-primary-light hover:text-primary-dark transition-colors duration-200 ${
                isActive ? 'bg-primary-light text-primary-dark' : ''
              }`}
            >
              <item.icon className="w-6 h-6 mr-3" />
              <span className="font-medium">{item.name}</span>
            </Link>
          )
        })}
      </nav>
    </aside>
  )
} 