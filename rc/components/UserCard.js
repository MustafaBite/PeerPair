'use client'

import { HeartIcon, XMarkIcon } from '@heroicons/react/24/solid'

export default function UserCard({ user }) {
  return (
    <div className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-200">
      <div className="p-6">
        <h2 className="text-xl font-semibold text-gray-800 mb-2">{user.name}</h2>
        <p className="text-gray-600 mb-4">{user.department}</p>
        
        <div className="flex flex-wrap gap-2 mb-6">
          {user.interests.map((interest, index) => (
            <span
              key={index}
              className="px-3 py-1 bg-primary-light text-primary-dark rounded-full text-sm"
            >
              {interest}
            </span>
          ))}
        </div>
        
        <div className="flex justify-center gap-4">
          <button className="p-3 rounded-full bg-red-100 text-red-500 hover:bg-red-200 transition-colors duration-200">
            <XMarkIcon className="w-6 h-6" />
          </button>
          <button className="p-3 rounded-full bg-green-100 text-green-500 hover:bg-green-200 transition-colors duration-200">
            <HeartIcon className="w-6 h-6" />
          </button>
        </div>
      </div>
    </div>
  )
} 