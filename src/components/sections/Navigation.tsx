"use client";

import { useState } from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { Menu, X } from "lucide-react";

export function Navigation() {
  const [isOpen, setIsOpen] = useState(false);
  
  // Hardcoded active link for demonstration based on the prompt's requirements
  const currentSection = "services";

  const navLinks = [
    { name: "SERVICES", href: "#services", id: "services" },
    { name: "WORK", href: "#work", id: "work" },
    { name: "ABOUT", href: "#about", id: "about" },
    { name: "CONTACT", href: "#contact", id: "contact" },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-[var(--background)] border-b border-[var(--border)]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link href="/" className="font-mono text-2xl font-bold tracking-[0.2em] uppercase text-foreground">
            NEXCY
          </Link>
          <div className="hidden md:flex space-x-8">
            {navLinks.map((link) => {
              const isActive = currentSection === link.id;
              return (
                <Link
                  key={link.name}
                  href={link.href}
                  className={cn(
                    "font-mono text-sm tracking-wide text-foreground relative group py-2",
                  )}
                  style={{ fontVariant: "small-caps" }}
                >
                  {link.name}
                  <span
                    className={cn(
                      "absolute bottom-0 left-0 h-[2px] bg-accent transition-all duration-300",
                      isActive ? "w-full" : "w-0 group-hover:w-full"
                    )}
                  />
                </Link>
              );
            })}
          </div>
          <div className="md:hidden flex items-center">
            <button 
              onClick={() => setIsOpen(!isOpen)} 
              className="text-foreground p-2 focus:outline-none"
              aria-label="Toggle menu"
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>
      
      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden fixed inset-0 top-16 bg-[var(--background)] z-40 overflow-y-auto">
          <div className="flex flex-col border-t border-[var(--border)]">
            {navLinks.map((link) => {
              const isActive = currentSection === link.id;
              return (
                <Link
                  key={link.name}
                  href={link.href}
                  onClick={() => setIsOpen(false)}
                  className="font-mono text-lg tracking-wide border-b border-[var(--border)] py-6 px-6 text-foreground flex justify-between items-center bg-[var(--background)]"
                  style={{ fontVariant: "small-caps" }}
                >
                  {link.name}
                  {isActive && <span className="w-2 h-2 rounded-full bg-accent" />}
                </Link>
              );
            })}
          </div>
        </div>
      )}
    </nav>
  );
}
