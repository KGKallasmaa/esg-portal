import { useState } from 'react'
import Sidebar from './Sidebar'
import Header from './Header'
import { isDesktop } from 'react-device-detect'

export default function Layout({ children }) {
  const [sidebarOpen, setSidebarOpen] = useState(false)

  if (isDesktop) {
    return (
      <div className="flex h-screen bg-white dark:bg-gray-900">
        <Sidebar />
        <div className="flex flex-1 flex-col transition-all duration-300 ease-in-out lg:pl-64">
          <Header />
          <main className="flex-1 overflow-y-auto p-4">{children}</main>
        </div>
      </div>
    )
  }

  return (
    <div className="flex h-screen bg-white dark:bg-gray-900">
      <Sidebar isOpenOnMobile={sidebarOpen} />
      <div className="flex flex-1 flex-col transition-all duration-300 ease-in-out lg:pl-64">
        <div className="flex h-16 flex-shrink-0 border-b border-gray-200 bg-white dark:bg-gray-900 md:hidden lg:border-none">
          <button
            type="button"
            className="p-4 text-gray-400 focus:outline-none lg:hidden"
            onClick={() => setSidebarOpen(!sidebarOpen)}
          >
            <span className="sr-only">Open sidebar</span>
            {/* Assuming you are using a heroicons, adjust if using different icons */}
            <svg
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </button>
        </div>
        <Header />
        <main className="flex-1 overflow-y-auto">{children}</main>
      </div>
    </div>
  )
}
