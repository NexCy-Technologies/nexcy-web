
'use client'

import { useEffect, useState } from 'react'
import { useTheme } from 'next-themes'
import { motion } from 'framer-motion'
import { FaSun, FaMoon } from 'react-icons/fa'

export function ThemeToggle() {
  const [mounted, setMounted] = useState(false)
  const { resolvedTheme, setTheme } = useTheme()

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null

  const isDark = resolvedTheme === 'dark'

  return (
    <motion.button
      onClick={() => setTheme(isDark ? 'light' : 'dark')}
      className="fixed bottom-6 right-6 z-40 group"
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.95 }}
      initial={{ opacity: 0, scale: 0 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ type: 'spring', stiffness: 260, damping: 20 }}
      aria-label={`Switch to ${isDark ? 'light' : 'dark'} mode`}
    >
      <div className="relative w-14 h-14 rounded-full overflow-hidden shadow-lg shadow-orange-500/20 ring-1 ring-orange-200/40">
        {/* Background gradient */}
        <div className={`absolute inset-0 transition-all duration-500 ${
          isDark 
            ? 'bg-gradient-to-br from-orange-500 via-orange-600 to-orange-700' 
            : 'bg-gradient-to-br from-orange-300 via-orange-400 to-orange-500'
        }`} />

        {/* Glow effect */}
        <div className={`absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 ${
          isDark
            ? 'bg-gradient-to-br from-orange-400 to-orange-500 blur-lg'
            : 'bg-gradient-to-br from-orange-200 to-orange-300 blur-lg'
        }`} />

        {/* Icon container */}
        <div className="absolute inset-0 flex items-center justify-center bg-opacity-backdrop">
          <motion.div
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            exit={{ scale: 0, rotate: 180 }}
            transition={{ type: 'spring', stiffness: 200, damping: 15 }}
            key={resolvedTheme}
          >
            {isDark ? (
              <FaMoon className="w-6 h-6 text-white drop-shadow-lg" />
            ) : (
              <FaSun className="w-6 h-6 text-white drop-shadow-lg" />
            )}
          </motion.div>
        </div>

        {/* Shine effect */}
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0"
          animate={{ x: ['100%', '-100%'] }}
          transition={{ repeat: Infinity, duration: 3, ease: 'linear' }}
          style={{ opacity: isDark ? 0.3 : 0.4 }}
        />

        {/* Shadow */}
        <div className={`absolute -bottom-2 left-0 right-0 h-2 blur-lg opacity-50 ${
          isDark ? 'bg-orange-500' : 'bg-orange-400'
        }`} />
      </div>

      {/* Tooltip */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        whileHover={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.2 }}
        className="absolute bottom-full right-0 mb-3 px-3 py-2 bg-gray-950 text-white text-xs font-semibold rounded-lg whitespace-nowrap opacity-0 pointer-events-none group-hover:opacity-100 group-hover:pointer-events-auto border border-orange-400/20 shadow-xl shadow-black/30"
      >
        {isDark ? 'Light Mode' : 'Dark Mode'}
      </motion.div>
    </motion.button>
  )
}
