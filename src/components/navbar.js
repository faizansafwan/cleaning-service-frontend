'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion } from 'framer-motion';
import { FaList, FaPlus, FaUser } from 'react-icons/fa';

// nav items
const navItems = [
  { name: 'Booking List', href: '/dashboard', icon: <FaList /> },
  { name: 'Add Booking', href: '/booking', icon: <FaPlus /> },
  { name: 'Profile', href: '/profile', icon: <FaUser /> },
];

export default function Navbar() {
  const pathname = usePathname();

  return (
    <nav className="bg-white dark:bg-gray-900 shadow-md fixed top-0 w-full z-50">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex justify-between items-center h-16">

          {/* home link */}
          <Link href="/" className="text-xl font-bold text-indigo-600 dark:text-indigo-400">
            BookingApp
          </Link>

          <div className="flex space-x-4">
            {navItems.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`flex items-center gap-2 px-4 py-2 rounded-md transition-colors duration-200 ${
                    isActive
                      ? 'bg-indigo-100 text-indigo-700 dark:bg-indigo-700 dark:text-white'
                      : 'text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800'
                  }`} >
                  <motion.span
                    initial={{ scale: 0.9 }}
                    animate={{ scale: 1 }}
                    transition={{ duration: 0.2 }} >
                    {item.icon}
                  </motion.span>
                  <span className="hidden sm:inline">{item.name}</span>
                </Link>
              );
            })}
          </div>
        </div>
      </div>
    </nav>
  );
}
