'use client'

import { useEffect, useState } from 'react'
import { useTheme } from 'next-themes'
import { motion } from 'framer-motion'
import { FaSun, FaMoon } from 'react-icons/fa'

export function ThemeToggle() {
  const [mounted, setMounted] = useState(false)
  const { theme, setTheme } = useTheme()

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null

  const isDark = theme === 'dark'

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
      <div className="relative w-14 h-14 rounded-full overflow-hidden">
        {/* Background gradient */}
        <div className={`absolute inset-0 transition-all duration-500 ${
          isDark 
            ? 'bg-gradient-to-br from-orange-600 to-orange-700' 
            : 'bg-gradient-to-br from-orange-400 to-yellow-500'
        }`} />

        {/* Glow effect */}
        <div className={`absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 ${
          isDark
            ? 'bg-gradient-to-br from-orange-500 to-orange-600 blur-lg'
            : 'bg-gradient-to-br from-orange-300 to-yellow-400 blur-lg'
        }`} />

        {/* Icon container */}
        <div className="absolute inset-0 flex items-center justify-center bg-opacity-backdrop">
          <motion.div
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            exit={{ scale: 0, rotate: 180 }}
            transition={{ type: 'spring', stiffness: 200, damping: 15 }}
            key={theme}
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
          isDark ? 'bg-orange-600' : 'bg-orange-400'
        }`} />
      </div>

      {/* Tooltip */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        whileHover={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.2 }}
        className="absolute bottom-full right-0 mb-3 px-3 py-2 bg-gray-900 dark:bg-gray-100 text-white dark:text-gray-900 text-xs font-semibold rounded-lg whitespace-nowrap opacity-0 pointer-events-none group-hover:opacity-100 group-hover:pointer-events-auto"
      >
        {isDark ? 'Light Mode' : 'Dark Mode'}
      </motion.div>
    </motion.button>
  )
}
