import Link from 'next/link'

export default function NotFound() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-b from-white to-gray-100 dark:from-dark-bg dark:to-gray-900">
      <div className="text-center p-8">
        <h2 className="text-4xl font-bold text-gray-900 dark:text-gray-100 mb-4">
          404
        </h2>
        <h3 className="text-2xl font-semibold text-gray-800 dark:text-gray-200 mb-4">
          Page Not Found
        </h3>
        <p className="text-gray-600 dark:text-gray-400 mb-6">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <Link
          href="/"
          className="btn btn-primary"
        >
          Return Home
        </Link>
      </div>
    </div>
  )
} 