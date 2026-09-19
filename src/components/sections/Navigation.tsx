"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { Menu, X, ExternalLink } from "lucide-react";
import { cn } from "@/lib/utils";

const navLinks = [
  { name: "Services", href: "#services", id: "services" },
  { name: "Work",     href: "#work",     id: "work" },
  { name: "About",    href: "#about",    id: "about" },
  { name: "Contact",  href: "#contact",  id: "contact" },
];

export function Navigation() {
  const shouldReduceMotion = useReducedMotion();
  const [isOpen, setIsOpen]       = useState(false);
  const [activeSection, setActive] = useState("");
  const [scrolled, setScrolled]   = useState(false);

  // Scroll detection → active section + navbar shadow
  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 20);

      const sectionIds = navLinks.map((l) => l.id);
      let current = "";
      for (const id of sectionIds) {
        const el = document.getElementById(id);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= 100) current = id;
        }
      }
      setActive(current);
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close mobile menu on resize
  useEffect(() => {
    const onResize = () => { if (window.innerWidth >= 768) setIsOpen(false); };
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  const handleNavClick = (href: string) => {
    setIsOpen(false);
    const id = href.replace("#", "");
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <>
      <motion.nav
        // Under reduced motion: render in final state immediately, no entrance slide
        initial={shouldReduceMotion ? { y: 0, opacity: 1 } : { y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={
          shouldReduceMotion
            ? { duration: 0 }
            : { duration: 0.5, ease: [0.25, 0.1, 0.25, 1] as [number, number, number, number] }
        }
        className={cn(
          "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
          scrolled
            ? "bg-[var(--background)]/95 backdrop-blur-md border-b border-[var(--border)] shadow-lg shadow-black/20"
            : "bg-transparent border-b border-transparent"
        )}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">

            {/* Logo */}
            <Link
              href="/"
              className="flex items-center gap-2.5 group"
              onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            >
              <motion.div
                whileHover={shouldReduceMotion ? {} : { rotate: 10, scale: 1.1 }}
                transition={{ type: "spring", stiffness: 400, damping: 15 }}
              >
                <Image
                  src="/NexCy_Logo.png"
                  alt="Nexcy"
                  width={32}
                  height={32}
                  className="w-8 h-8 object-contain"
                />
              </motion.div>
              <span className="font-mono text-lg font-bold tracking-[0.2em] uppercase text-foreground group-hover:text-[var(--accent)] transition-colors duration-200">
                NEXCY
              </span>
            </Link>

            {/* Desktop nav */}
            <div className="hidden md:flex items-center gap-1">
              {navLinks.map((link, i) => {
                const isActive = activeSection === link.id;
                return (
                  <motion.div
                    key={link.id}
                    // Reduced motion: skip stagger entrance, render in place
                    initial={shouldReduceMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={
                      shouldReduceMotion
                        ? { duration: 0 }
                        : { delay: 0.1 + i * 0.07, duration: 0.4 }
                    }
                  >
                    <button
                      onClick={() => handleNavClick(link.href)}
                      className={cn(
                        "relative px-4 py-2 font-mono text-sm tracking-widest uppercase transition-colors duration-200 rounded-sm",
                        isActive
                          ? "text-[var(--accent)]"
                          : "text-[var(--muted)] hover:text-[var(--foreground)]"
                      )}
                    >
                      {link.name}
                      {/* Animated underline */}
                      <motion.span
                        layoutId="nav-underline"
                        className="absolute bottom-0 left-2 right-2 h-[2px] bg-[var(--accent)] rounded-full"
                        initial={false}
                        animate={{ opacity: isActive ? 1 : 0 }}
                        transition={shouldReduceMotion ? { duration: 0 } : { duration: 0.2 }}
                      />
                    </button>
                  </motion.div>
                );
              })}

              {/* CTA pill */}
              <motion.a
                href="#contact"
                onClick={(e) => { e.preventDefault(); handleNavClick("#contact"); }}
                initial={shouldReduceMotion ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={
                  shouldReduceMotion
                    ? { duration: 0 }
                    : { delay: 0.45, duration: 0.4 }
                }
                whileHover={shouldReduceMotion ? {} : { scale: 1.05 }}
                whileTap={shouldReduceMotion ? {} : { scale: 0.97 }}
                className="ml-4 px-4 py-1.5 text-xs font-mono tracking-widest uppercase border border-[var(--accent)] text-[var(--accent)] hover:bg-[var(--accent)] hover:text-[#0A0A0A] transition-colors duration-200 rounded-sm"
              >
                Hire Us
              </motion.a>
            </div>

            {/* Mobile hamburger */}
            <motion.button
              className="md:hidden p-2 text-foreground rounded-sm"
              onClick={() => setIsOpen((v) => !v)}
              whileTap={shouldReduceMotion ? {} : { scale: 0.9 }}
              aria-label="Toggle menu"
            >
              <AnimatePresence mode="wait" initial={false}>
                {isOpen ? (
                  <motion.span
                    key="x"
                    initial={shouldReduceMotion ? { rotate: 0, opacity: 1 } : { rotate: -90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={shouldReduceMotion ? { opacity: 0 } : { rotate: 90, opacity: 0 }}
                    transition={{ duration: shouldReduceMotion ? 0 : 0.2 }}
                  >
                    <X size={22} />
                  </motion.span>
                ) : (
                  <motion.span
                    key="menu"
                    initial={shouldReduceMotion ? { rotate: 0, opacity: 1 } : { rotate: 90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={shouldReduceMotion ? { opacity: 0 } : { rotate: -90, opacity: 0 }}
                    transition={{ duration: shouldReduceMotion ? 0 : 0.2 }}
                  >
                    <Menu size={22} />
                  </motion.span>
                )}
              </AnimatePresence>
            </motion.button>
          </div>
        </div>
      </motion.nav>

      {/* Mobile Menu Panel */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            key="mobile-menu"
            initial={shouldReduceMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: -20 }}
            transition={{ duration: shouldReduceMotion ? 0 : 0.25, ease: "easeOut" }}
            className="fixed inset-0 top-16 z-40 bg-[var(--background)]/98 backdrop-blur-xl flex flex-col pt-8 px-6"
          >
            {navLinks.map((link, i) => (
              <motion.button
                key={link.id}
                initial={shouldReduceMotion ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={
                  shouldReduceMotion
                    ? { duration: 0 }
                    : { delay: i * 0.07, duration: 0.3 }
                }
                onClick={() => handleNavClick(link.href)}
                className={cn(
                  "flex items-center justify-between border-b border-[var(--border)] py-5 font-mono text-xl tracking-wider uppercase text-left",
                  activeSection === link.id ? "text-[var(--accent)]" : "text-foreground"
                )}
              >
                <span>{link.name}</span>
                {activeSection === link.id && (
                  <span className="w-2 h-2 rounded-full bg-[var(--accent)]" />
                )}
              </motion.button>
            ))}

            <motion.a
              href="#contact"
              onClick={(e) => { e.preventDefault(); handleNavClick("#contact"); }}
              initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={shouldReduceMotion ? { duration: 0 } : { delay: 0.35 }}
              className="mt-8 self-start px-6 py-3 font-mono text-sm tracking-widest uppercase border border-[var(--accent)] text-[var(--accent)] hover:bg-[var(--accent)] hover:text-[#0A0A0A] transition-colors rounded-sm flex items-center gap-2"
            >
              Hire Us <ExternalLink size={14} />
            </motion.a>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
