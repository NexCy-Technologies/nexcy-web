"use client";

import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const lines = [
  "> initializing nexcy.core v2.0...",
  "> mounting neural link...",
  "> resolving dependencies [||||||||] 100%",
  "> compiling visual assets...",
  "> booting system...",
];

export default function Preloader() {
  const [show, setShow] = useState(false);
  const [currentLineIndex, setCurrentLineIndex] = useState(0);
  const [isTyping, setIsTyping] = useState(true);

  useEffect(() => {
    // Only run on client, and only if not played yet this session
    const hasPlayed = sessionStorage.getItem("nexcy_preloader_played");
    if (!hasPlayed) {
      setShow(true);
      
      // Ensure we don't scroll while loading
      document.body.style.overflow = "hidden";
    }
  }, []);

  useEffect(() => {
    if (!show) return;

    // Simulate boot sequence lines appearing
    if (currentLineIndex < lines.length) {
      const timeout = setTimeout(() => {
        setCurrentLineIndex((prev) => prev + 1);
      }, 350 + Math.random() * 300); // Random delay between 350-650ms for realistic feel
      return () => clearTimeout(timeout);
    } else {
      // Finished typing all lines
      setIsTyping(false);
      
      // Wait for fonts/assets (simulated short delay after text finishes)
      const finishTimeout = setTimeout(() => {
        sessionStorage.setItem("nexcy_preloader_played", "true");
        document.body.style.overflow = "";
        setShow(false);
      }, 600);
      return () => clearTimeout(finishTimeout);
    }
  }, [currentLineIndex, show]);

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          className="fixed inset-0 z-[9999] bg-background text-foreground flex flex-col justify-end p-8 md:p-16 font-mono text-sm md:text-base pointer-events-auto"
          initial={{ opacity: 1 }}
          exit={{ 
            opacity: 0,
            y: "-100%", 
            transition: { 
              duration: 0.8, 
              ease: [0.76, 0, 0.24, 1] // Apple-like smooth egress, glitch-like fast cut can also be used
            } 
          }}
        >
          {/* Subtle grid background to match terminal feel */}
          <div className="absolute inset-0 opacity-[0.03] pointer-events-none" 
               style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)', backgroundSize: '32px 32px' }} 
          />
          
          <div className="relative z-10 max-w-3xl flex flex-col gap-2">
            {lines.slice(0, currentLineIndex).map((line, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.2 }}
                className="text-orange-400"
              >
                {line}
              </motion.div>
            ))}
            
            {isTyping && currentLineIndex < lines.length && (
              <motion.div className="flex items-center text-orange-400">
                <span className="opacity-50">&gt; </span>
                <motion.span
                  animate={{ opacity: [1, 0] }}
                  transition={{ repeat: Infinity, duration: 0.8, ease: "linear" }}
                  className="inline-block w-2 h-4 bg-orange-400 ml-2"
                />
              </motion.div>
            )}
            
            {!isTyping && (
              <motion.div className="text-orange-500 font-bold mt-4">
                [SYSTEM READY]
              </motion.div>
            )}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
