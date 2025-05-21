'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Menu, X, Search } from 'lucide-react';

const navItems = [
  { label: 'Home', href: '/' },
  { label: 'About', href: '/about' },
  { label: 'Projects', href: '/projects' },
  { label: 'Services', href: '/services' },
  { label: 'Contact', href: '/contact' },
];

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 w-full z-50 bg-white/60 backdrop-blur-lg border-b border-gray-200 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between gap-4 flex-wrap md:flex-nowrap">
        
        {/* Logo and Name */}
        <Link href="/" className="flex items-center space-x-2 shrink-0">
          <img src="https://flowbite.com/docs/images/logo.svg" alt="Logo" className="h-8" />
          <span className="text-xl font-semibold text-[#111111]">NexCy</span>
        </Link>

        {/* Search Bar */}
        <div className="relative w-full md:w-1/3 order-3 md:order-none">
          <Search className="absolute left-3 top-2.5 h-4 w-4 text-[#666666]" />
          <input
            type="text"
            placeholder="Search..."
            className="w-full pl-9 pr-4 py-2 text-sm rounded-lg border border-gray-200 bg-white/70 text-[#111111] placeholder-[#666666] focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>

        {/* Desktop Links + Hamburger */}
        <div className="flex items-center gap-4">
          {/* Desktop Nav */}
          <div className="hidden md:flex space-x-6">
            {navItems.map((item) => (
              <Link key={item.href} href={item.href} className="text-[#111111] hover:text-blue-600 font-medium">
                {item.label}
              </Link>
            ))}
          </div>

          {/* Mobile Toggle */}
          <button
            className="md:hidden text-[#111111] p-2 rounded-lg focus:outline-none"
            onClick={() => setMobileOpen(!mobileOpen)}
          >
            {mobileOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div className="md:hidden px-4 pb-4 bg-white/80 backdrop-blur-md border-t border-gray-200">
          <ul className="flex flex-col space-y-2 mt-2">
            {navItems.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="block py-2 text-[#111111] hover:text-blue-600 font-medium"
                  onClick={() => setMobileOpen(false)}
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}
    </nav>
  );
}