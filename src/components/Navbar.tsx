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
    <nav className="fixed top-0 left-0 w-full z-50 bg-white/60 backdrop-blur-lg border-b border-[#e0e0e0] shadow-sm">
      <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
        <Link href="/" className="flex items-center space-x-2">
          <img src="https://flowbite.com/docs/images/logo.svg" alt="Logo" className="h-8" />
          <span className="text-xl font-semibold text-[#111111]">Flowbite</span>
        </Link>

        <div className="hidden md:flex items-center space-x-6">
          <div className="relative">
            <Search className="absolute left-3 top-2.5 h-4 w-4 text-[#666666]" />
            <input
              type="text"
              placeholder="Search..."
              className="pl-9 pr-4 py-2 text-sm rounded-lg border border-[#e0e0e0] bg-white/70 text-[#111111] placeholder-[#666666] focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          {navItems.map((item) => (
            <Link key={item.href} href={item.href} className="text-[#111111] hover:text-blue-600 font-medium">
              {item.label}
            </Link>
          ))}
        </div>

        <button
          className="md:hidden text-[#111111] p-2 rounded-lg focus:outline-none"
          onClick={() => setMobileOpen(!mobileOpen)}
        >
          {mobileOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {mobileOpen && (
        <div className="md:hidden px-4 pb-4 bg-white/70 backdrop-blur-lg border-t border-[#e0e0e0]">
          <div className="relative my-2">
            <Search className="absolute left-3 top-2.5 h-4 w-4 text-[#666666]" />
            <input
              type="text"
              placeholder="Search..."
              className="pl-9 pr-4 py-2 w-full text-sm rounded-lg border border-[#e0e0e0] bg-white/70 text-[#111111] placeholder-[#666666] focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
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