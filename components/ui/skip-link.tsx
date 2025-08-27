"use client"

import { useEffect, useState } from "react"

export function SkipLink() {
  const [isKeyboardUser, setIsKeyboardUser] = useState(false)

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Tab") {
        setIsKeyboardUser(true)
      }
    }

    const handleMouseDown = () => {
      setIsKeyboardUser(false)
    }

    document.addEventListener("keydown", handleKeyDown)
    document.addEventListener("mousedown", handleMouseDown)

    return () => {
      document.removeEventListener("keydown", handleKeyDown)
      document.removeEventListener("mousedown", handleMouseDown)
    }
  }, [])

  return (
    <a
      href="#main-content"
      className={`skip-link focus:outline-none focus:ring-2 focus:ring-blue-400 ${isKeyboardUser ? "" : "sr-only"}`}
      onFocus={(e) => {
        if (!isKeyboardUser) {
          e.target.blur()
        }
      }}
    >
      Skip to main content
    </a>
  )
}
