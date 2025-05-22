'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, X, Search, ArrowLeft } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const navItems = [
  { label: 'Home', href: '/' },
  { label: 'About', href: '/about' },
  { label: 'Projects', href: '/projects' },
  { label: 'Services', href: '/services' },
  { label: 'Contact', href: '/contact' },
];

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [showMobileSearch, setShowMobileSearch] = useState(false);
  const pathname = usePathname();

  return (
    <>
      <nav className="fixed top-0 left-0 w-full z-50 bg-white/60 backdrop-blur-md border-b border-gray-200 shadow-sm h-16">
        <div className="max-w-7xl mx-auto px-4 h-full flex items-center justify-between gap-4">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2 shrink-0">
            <img src="https://flowbite.com/docs/images/logo.svg" alt="Logo" className="h-8" />
            <span className="text-xl font-semibold text-[#111111]">NexCy</span>
          </Link>

          {/* Search bar */}
          <div className="flex-1 px-2">
            {/* Desktop search input */}
            <div className="hidden md:flex justify-center">
              <input
                type="text"
                placeholder="Search..."
                className="w-[300px] bg-transparent border-b border-gray-400 text-[#111] placeholder-gray-500 text-sm py-1 focus:outline-none focus:border-blue-600 transition"
              />
            </div>

            {/* Mobile search input */}
            {showMobileSearch && (
              <div className="relative md:hidden">
                <ArrowLeft
                  className="absolute left-0 top-1.5 h-5 w-5 text-[#666] cursor-pointer"
                  onClick={() => setShowMobileSearch(false)}
                />
                <input
                  type="text"
                  autoFocus
                  placeholder="Search..."
                  className="w-full pl-8 bg-transparent border-b border-gray-400 text-[#111] placeholder-gray-500 text-sm py-1 focus:outline-none focus:border-blue-600 transition"
                />
              </div>
            )}
          </div>

          {/* Actions */}
          {!showMobileSearch && (
            <div className="flex items-center gap-2 md:gap-6">
              {/* Desktop nav */}
              <div className="hidden md:flex space-x-6">
                {navItems.map((item) => {
                  const isActive = pathname === item.href;
                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      className={`font-medium transition-colors ${
                        isActive ? 'text-blue-600 font-semibold' : 'text-[#111] hover:text-blue-600'
                      }`}
                    >
                      {item.label}
                    </Link>
                  );
                })}
              </div>

              {/* Mobile actions */}
              <div className="flex items-center gap-2 md:hidden">
                <button
                  onClick={() => setShowMobileSearch(true)}
                  className="text-[#111] p-2"
                >
                  <Search size={22} />
                </button>
                <button
                  onClick={() => setMobileOpen((prev) => !prev)}
                  className="text-[#111] p-2"
                >
                  {mobileOpen ? <X size={24} /> : <Menu size={24} />}
                </button>
              </div>
            </div>
          )}
        </div>
      </nav>

      {/* Mobile dropdown menu (glass & aligned right) */}
      <AnimatePresence>
        {mobileOpen && !showMobileSearch && (
          <motion.div
            initial={{ opacity: 0, y: -10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="fixed top-16 right-4 w-60 md:hidden bg-white/80 backdrop-blur-md rounded-xl shadow-lg border border-white/30 z-40 p-4"
          >
            <ul className="flex flex-col space-y-3">
              {navItems.map((item) => {
                const isActive = pathname === item.href;
                return (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      onClick={() => setMobileOpen(false)}
                      className={`block font-medium transition-colors ${
                        isActive ? 'text-blue-600 font-semibold' : 'text-[#111] hover:text-blue-600'
                      }`}
                    >
                      {item.label}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}