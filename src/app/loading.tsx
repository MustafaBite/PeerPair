export default function Loading() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-b from-white to-gray-100 dark:from-dark-bg dark:to-gray-900">
      <div className="text-center">
        <div className="w-16 h-16 border-4 border-primary-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
        <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100">Loading...</h2>
        <p className="text-gray-600 dark:text-gray-400 mt-2">Please wait while we prepare your experience</p>
      </div>
    </div>
  )
} 