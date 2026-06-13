"use client";

import React, { useEffect, useState } from "react";
import { ArrowRight } from "lucide-react";
import { motion, AnimatePresence, useScroll, useTransform, useSpring } from "framer-motion";

// Glass Button Component
type GlassButtonProps = {
  children: React.ReactNode;
  variant?: "primary" | "outline";
  className?: string;
} & React.ButtonHTMLAttributes<HTMLButtonElement>;

const GlassButton = ({
  children,
  variant = "primary",
  className = "",
  ...props
}: GlassButtonProps) => {
  const baseClasses =
    "px-4 py-2 sm:px-5 sm:py-2.5 text-sm sm:text-base font-medium transition-all duration-300 backdrop-blur-sm border flex items-center gap-2 justify-center rounded-full";
  const variantClasses = {
    primary:
      "bg-gradient-to-r from-orange-400 to-orange-500 hover:from-orange-500 hover:to-orange-600 text-white border-orange-400/30 shadow-lg shadow-orange-500/25 hover:shadow-xl hover:shadow-orange-500/30",
    outline:
      "border-2 border-gray-300 text-gray-700 hover:bg-orange-400/10 hover:border-orange-400 backdrop-blur-md bg-white/50 hover:bg-white/70",
  };

  return (
    <button
      className={`${baseClasses} ${variantClasses[variant]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};

// ScrambleText Component
interface ScrambleTextProps {
  text: string;
  scrambleSpeed?: number;
  characters?: string;
  className?: string;
  trigger?: boolean;
}

const ScrambleText = ({
  text,
  scrambleSpeed = 50,
  characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_+-=[]{}|;':,.<>/?",
  className = "",
  trigger = false,
}: ScrambleTextProps) => {
  const [display, setDisplay] = useState<string>("");

  useEffect(() => {
    if (!trigger) return;
    let currentIndex = 0;

    const interval = window.setInterval(() => {
      if (currentIndex >= text.length) {
        setDisplay(text);
        window.clearInterval(interval);
        return;
      }

      const scrambled = text
        .split("")
        .map((char, idx) =>
          idx < currentIndex
            ? text[idx]
            : characters[Math.floor(Math.random() * characters.length)]
        )
        .join("");

      setDisplay(scrambled);
      currentIndex += 1;
    }, scrambleSpeed);

    return () => window.clearInterval(interval);
  }, [text, scrambleSpeed, characters, trigger]);

  return <span className={className}>{display}</span>;
};

// Professional Tech Background Component
const TechBackground = () => {
  return (
    <div className="absolute inset-0 overflow-hidden">
      {/* Geometric shapes */}
      {[...Array(6)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full opacity-20"
          style={{
            background: `radial-gradient(circle, ${
              ['#fb923c15', '#f9731615', '#ea580c12'][i % 3]
            }, transparent 70%)`,
            width: `${300 + i * 100}px`,
            height: `${300 + i * 100}px`,
            left: `${20 + i * 25}%`,
            top: `${15 + i * 15}%`,
            willChange: 'transform',
          }}
          animate={{
            x: [0, 15, 0],
            y: [0, -10, 0],
          }}
          transition={{
            duration: 20 + i * 2,
            repeat: Infinity,
            repeatType: "reverse",
            ease: "easeInOut",
            delay: i * 1,
          }}
        />
      ))}

      {/* Grid pattern */}
      <div className="absolute inset-0 opacity-10">
        <div
          className="w-full h-full pointer-events-none"
          style={{
            backgroundImage: `
              linear-gradient(rgba(251, 146, 60, 0.1) 1px, transparent 1px),
              linear-gradient(90deg, rgba(251, 146, 60, 0.1) 1px, transparent 1px)
            `,
            backgroundSize: '40px 40px'
          }}
        />
      </div>

      {/* Tech particles */}
      {[...Array(25)].map((_, i) => (
        <motion.div
          key={`tech-particle-${i}`}
          className="absolute w-1 h-1 bg-orange-400/50 rounded-full"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            willChange: 'transform',
          }}
          animate={{
            y: [0, -60, 0],
            opacity: [0, 0.6, 0],
          }}
          transition={{
            duration: 5 + Math.random() * 3,
            repeat: Infinity,
            delay: Math.random() * 8,
            ease: "easeOut",
          }}
        />
      ))}
    </div>
  );
};

// Professional Data & Code Animation Component
const TechAnimation = ({ scrollY }: { scrollY: any }) => {
  const y = useTransform(scrollY, [0, 1000], [0, -50]);
  const opacity = useTransform(scrollY, [0, 600], [1, 0.3]);

  return (
    <motion.div
      style={{ y, opacity }}
      className="relative w-full h-full flex items-center justify-center"
    >
      {/* Main system architecture container */}
      <motion.div 
        className="relative w-64 h-64 sm:w-80 sm:h-80 lg:w-96 lg:h-96"
        style={{ willChange: 'transform' }}
      >
        
        {/* Microservices architecture visualization */}
        <motion.div className="absolute inset-0">
          {/* Core application container */}
          <motion.div 
            className="absolute inset-8 bg-white/80 backdrop-blur-sm rounded-xl border-2 border-orange-200/50 shadow-lg"
            animate={{
              boxShadow: [
                '0 4px 20px rgba(251, 146, 60, 0.1)',
                '0 8px 30px rgba(251, 146, 60, 0.3)',
                '0 4px 20px rgba(251, 146, 60, 0.1)',
              ],
            }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          >
            {/* Application layers */}
            <div className="absolute inset-3 space-y-1">
              {['Frontend', 'API Layer', 'Business Logic', 'Database'].map((layer, i) => (
                <motion.div
                  key={layer}
                  className="h-6 bg-gradient-to-r from-orange-100 to-amber-100 rounded border border-orange-200/30 flex items-center px-2"
                  animate={{
                    backgroundColor: [
                      'rgba(254, 215, 170, 0.5)',
                      'rgba(251, 146, 60, 0.3)',
                      'rgba(254, 215, 170, 0.5)',
                    ],
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    delay: i * 0.5,
                    ease: "easeInOut",
                  }}
                >
                  <div className="text-xs font-mono text-orange-700/80 truncate">
                    {layer}
                  </div>
                  <motion.div
                    className="ml-auto w-2 h-2 bg-orange-400 rounded-full"
                    animate={{
                      opacity: [0.3, 1, 0.3],
                      scale: [0.8, 1.2, 0.8],
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      delay: i * 0.3,
                      ease: "easeInOut",
                    }}
                  />
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* External services and integrations */}
          {[
            { name: 'Database', pos: { x: -140, y: 0 }, icon: 'DB' },
            { name: 'Auth Service', pos: { x: 140, y: 0 }, icon: 'AUTH' },
            { name: 'File Storage', pos: { x: 0, y: -120 }, icon: 'S3' },
            { name: 'Analytics', pos: { x: 0, y: 120 }, icon: 'DATA' },
            { name: 'Email Service', pos: { x: -100, y: -80 }, icon: 'MAIL' },
            { name: 'Payment API', pos: { x: 100, y: 80 }, icon: 'PAY' },
          ].map((service, i) => (
            <motion.div key={service.name} className="absolute">
              {/* Connection line to main app */}
              <motion.div
                className="absolute bg-gradient-to-r from-orange-300 via-orange-400 to-orange-300 origin-center"
                style={{
                  width: `${Math.sqrt(service.pos.x ** 2 + service.pos.y ** 2)}px`,
                  height: '2px',
                  left: `calc(50% + ${service.pos.x > 0 ? 0 : service.pos.x}px)`,
                  top: `calc(50% + ${service.pos.y > 0 ? 0 : service.pos.y}px)`,
                  transform: `rotate(${Math.atan2(service.pos.y, service.pos.x) * 180 / Math.PI}deg)`,
                  transformOrigin: '0 50%',
                }}
                animate={{
                  opacity: [0.2, 0.8, 0.2],
                  scaleX: [0.8, 1.1, 0.8],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  delay: i * 0.4,
                  ease: "easeInOut",
                }}
              />

              {/* Service node */}
              <motion.div
                className="absolute w-12 h-12 bg-gradient-to-br from-orange-400 to-amber-500 rounded-lg border-2 border-white shadow-lg flex flex-col items-center justify-center"
                style={{
                  left: `calc(50% + ${service.pos.x}px - 24px)`,
                  top: `calc(50% + ${service.pos.y}px - 24px)`,
                }}
                animate={{
                  scale: [1, 1.15, 1],
                  rotate: [0, 5, -5, 0],
                }}
                transition={{
                  duration: 4 + i * 0.3,
                  repeat: Infinity,
                  delay: i * 0.6,
                  ease: "easeInOut",
                }}
                whileHover={{ scale: 1.3 }}
              >
                <div className="text-white text-xs font-mono font-bold leading-3">
                  {service.icon}
                </div>
              </motion.div>

              {/* Data flow indicators */}
              <motion.div
                className="absolute w-1 h-4 bg-gradient-to-t from-orange-400 to-transparent rounded-full"
                style={{
                  left: `calc(50% + ${service.pos.x * 0.7}px)`,
                  top: `calc(50% + ${service.pos.y * 0.7}px)`,
                }}
                animate={{
                  opacity: [0, 1, 0],
                  scale: [0.5, 1.5, 0.5],
                  y: [0, -20, 0],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  delay: i * 0.3,
                  ease: "easeInOut",
                }}
              />
            </motion.div>
          ))}
        </motion.div>

        {/* API request visualization */}
        <motion.div className="absolute inset-0">
          {[...Array(6)].map((_, i) => {
            const angle = (i * 60) * Math.PI / 180;
            const radius = 110;
            return (
              <motion.div
                key={`api-request-${i}`}
                className="absolute w-3 h-3 bg-orange-400 rounded-full"
                style={{
                  left: `calc(50% + ${Math.cos(angle) * radius}px - 6px)`,
                  top: `calc(50% + ${Math.sin(angle) * radius}px - 6px)`,
                }}
                animate={{
                  scale: [0, 1.5, 0],
                  opacity: [0, 1, 0],
                  x: [0, -Math.cos(angle) * 30, -Math.cos(angle) * 60],
                  y: [0, -Math.sin(angle) * 30, -Math.sin(angle) * 60],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  delay: i * 0.5,
                  ease: "easeOut",
                }}
              />
            );
          })}
        </motion.div>

        {/* System status dashboard */}
        <motion.div 
          className="absolute -bottom-16 left-1/2 transform -translate-x-1/2 bg-white/90 backdrop-blur-sm rounded-lg border border-orange-200/50 p-3 shadow-lg"
          animate={{
            y: [0, -5, 0],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          <div className="flex items-center space-x-4">
            <div className="text-center">
              <motion.div 
                className="text-lg font-mono font-bold text-orange-600"
                animate={{ opacity: [0.7, 1, 0.7] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                99.9%
              </motion.div>
              <div className="text-xs text-orange-500/70">Uptime</div>
            </div>
            <div className="w-px h-8 bg-orange-200/50" />
            <div className="text-center">
              <motion.div 
                className="text-lg font-mono font-bold text-orange-600"
                animate={{ opacity: [0.7, 1, 0.7] }}
                transition={{ duration: 2.5, repeat: Infinity }}
              >
                &lt;50ms
              </motion.div>
              <div className="text-xs text-orange-500/70">Response</div>
            </div>
            <div className="w-px h-8 bg-orange-200/50" />
            <div className="text-center">
              <motion.div 
                className="w-3 h-3 bg-green-400 rounded-full mx-auto"
                animate={{
                  backgroundColor: ['#4ade80', '#22c55e', '#4ade80'],
                  scale: [1, 1.2, 1],
                }}
                transition={{ duration: 1.5, repeat: Infinity }}
              />
              <div className="text-xs text-orange-500/70">Status</div>
            </div>
          </div>
        </motion.div>

        {/* Code deployment pipeline */}
        <motion.div 
          className="absolute -top-16 left-1/2 transform -translate-x-1/2 bg-white/90 backdrop-blur-sm rounded-lg border border-orange-200/50 p-2 shadow-lg"
          animate={{
            y: [0, 3, 0],
          }}
          transition={{
            duration: 5,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          <div className="flex space-x-1">
            {['Code', 'Test', 'Build', 'Deploy'].map((stage, i) => (
              <motion.div
                key={stage}
                className="px-3 py-1 text-xs font-mono font-medium rounded-md"
                animate={{
                  backgroundColor: [
                    'rgba(251, 146, 60, 0.1)',
                    'rgba(251, 146, 60, 0.6)',
                    'rgba(34, 197, 94, 0.6)',
                    'rgba(251, 146, 60, 0.1)',
                  ],
                  color: [
                    'rgba(234, 88, 12, 0.7)',
                    'rgba(255, 255, 255, 1)',
                    'rgba(255, 255, 255, 1)',
                    'rgba(234, 88, 12, 0.7)',
                  ],
                }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  delay: i * 0.8,
                  ease: "easeInOut",
                }}
              >
                {stage}
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Real-time performance metrics */}
        <motion.div className="absolute -right-20 top-1/2 transform -translate-y-1/2">
          <div className="bg-white/90 backdrop-blur-sm rounded-lg border border-orange-200/50 p-3 shadow-lg">
            <div className="text-xs font-mono text-orange-600/80 mb-2 text-center">
              Live Metrics
            </div>
            <div className="flex items-end justify-center space-x-1 h-12">
              {[...Array(5)].map((_, i) => (
                <motion.div
                  key={`metric-${i}`}
                  className="bg-gradient-to-t from-orange-500 to-amber-400 rounded-sm w-2"
                  animate={{
                    height: [`${15 + Math.sin(Date.now() * 0.001 + i) * 10}px`],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    delay: i * 0.2,
                    ease: "easeInOut",
                  }}
                />
              ))}
            </div>
          </div>
        </motion.div>

        {/* Security & compliance indicator */}
        <motion.div className="absolute -left-20 top-1/2 transform -translate-y-1/2">
          <motion.div
            className="bg-white/90 backdrop-blur-sm rounded-lg border border-orange-200/50 p-3 shadow-lg text-center"
            animate={{
              scale: [1, 1.05, 1],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          >
            <motion.div
              className="w-6 h-6 bg-gradient-to-br from-orange-400 to-amber-500 rounded-full flex items-center justify-center mx-auto mb-1"
              animate={{
                rotate: [0, 360],
              }}
              transition={{
                duration: 8,
                repeat: Infinity,
                ease: "linear",
              }}
            >
              <div className="text-white text-xs">🔒</div>
            </motion.div>
            <div className="text-xs font-mono text-orange-600/80">
              Secure
            </div>
          </motion.div>
        </motion.div>
      </motion.div>
    </motion.div>
  );
};

// Hero Section
export default function HeroSection() {
  const [loading, setLoading] = React.useState(true);
  const [progress, setProgress] = React.useState(0);
  const [showScramble, setShowScramble] = React.useState(false);

  const { scrollY } = useScroll();
  const smoothScrollY = useSpring(scrollY, { stiffness: 50, damping: 25 });

  const heroHeader = "Your vision, Our mission.";
  const heroSubtext =
    "Empower your business with cutting-edge software, web, and app solutions. Make your mark in the digital landscape with solutions designed with scalability, performance, and impact in mind.";

  // Scroll transforms
  const textY = useTransform(smoothScrollY, [0, 500], [0, -100]);
  const textOpacity = useTransform(smoothScrollY, [0, 300], [1, 0]);
  const backgroundY = useTransform(smoothScrollY, [0, 1000], [0, -200]);

  // Faster Loader
  useEffect(() => {
    let interval: number;
    if (loading) {
      interval = window.setInterval(() => {
        setProgress((prev) => {
          if (prev >= 100) {
            window.clearInterval(interval);
            setTimeout(() => {
              setLoading(false);
              setShowScramble(true);
            }, 100);
            return 100;
          }
          return prev + 3.33;
        });
      }, 10);
    }
    return () => window.clearInterval(interval);
  }, [loading]);

  return (
    <section className="relative min-h-screen overflow-hidden bg-[#fffaf5]">
      {/* Professional Tech Background */}
      <motion.div style={{ y: backgroundY }}>
        <TechBackground />
      </motion.div>

      {/* Loading Screen - Clean and Professional */}
      <AnimatePresence>
        {loading && (
          <motion.div
            initial={{ opacity: 1 }}
            exit={{ 
              opacity: 0,
            }}
            transition={{ 
              duration: 0.5,
              ease: "easeOut"
            }}
            className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-[#fffaf5]"
          >
            <div className="relative mb-8">
              <div className="w-24 h-24 rounded-full border-4 border-gray-200"></div>
              
              <svg 
                className="absolute top-0 left-0 w-24 h-24 transform -rotate-90"
                viewBox="0 0 96 96"
              >
                <circle
                  cx="48"
                  cy="48"
                  r="44"
                  stroke="url(#tech-gradient)"
                  strokeWidth="4"
                  fill="none"
                  strokeDasharray={276.46}
                  strokeDashoffset={276.46 - (276.46 * progress) / 100}
                  className="transition-all duration-100 ease-linear"
                  strokeLinecap="round"
                />
                <defs>
                  <linearGradient id="tech-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#fb923c" />
                    <stop offset="50%" stopColor="#f97316" />
                    <stop offset="100%" stopColor="#ea580c" />
                  </linearGradient>
                </defs>
              </svg>
              
              <motion.div
                animate={{ 
                  scale: [1, 1.1, 1],
                  opacity: [0.8, 1, 0.8]
                }}
                transition={{ 
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
                className="absolute top-1/2 left-1/2 w-2 h-2 bg-orange-500 rounded-full transform -translate-x-1/2 -translate-y-1/2"
              />
            </div>

            <motion.div
              animate={{ opacity: [0.7, 1, 0.7] }}
              transition={{ 
                duration: 1.5,
                repeat: Infinity,
                ease: "easeInOut"
              }}
              className="text-center"
            >
              <div className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-orange-600 font-mono mb-2">
                {progress}%
              </div>
              <div className="text-gray-600 text-sm font-medium">
                Initializing System...
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Hero Content */}
      <AnimatePresence>
        {!loading && (
          <motion.div
            initial={{ opacity: 0, scale: 0.98, filter: "blur(10px)" }}
            animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
            transition={{ duration: 1, ease: [0.25, 0.46, 0.45, 0.94], delay: 0.2 }}
            style={{ opacity: textOpacity }}
            className="relative z-10 min-h-screen flex items-center"
          >
            <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center min-h-screen">
                {/* Left Content */}
                <motion.div 
                  style={{ y: textY }}
                  className="flex flex-col justify-center space-y-4 sm:space-y-6 text-center lg:text-left pt-16 lg:pt-0"
                >
                  <h1 className="text-2xl sm:text-3xl md:text-5xl lg:text-6xl xl:text-7xl font-bold leading-tight font-mono">
                    <ScrambleText
                      text={heroHeader}
                      scrambleSpeed={40}
                      characters="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_+-=[]{}|;':,.<>/?"
                      trigger={showScramble}
                      className="bg-clip-text text-transparent bg-gradient-to-r from-gray-900 via-orange-600 to-orange-500"
                    />
                  </h1>

                  <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 1.5 }}
                    className="text-gray-600 text-base sm:text-lg lg:text-xl leading-relaxed max-w-2xl mx-auto lg:mx-0"
                  >
                    {heroSubtext}
                  </motion.p>

                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 1.8 }}
                    className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center lg:justify-start"
                  >
                    <GlassButton
                      variant="primary"
                      className="group transform hover:scale-105 w-full sm:w-auto"
                    >
                      <span>Get Started</span>
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </GlassButton>

                    <GlassButton
                      variant="outline"
                      className="group transform hover:scale-105 w-full sm:w-auto"
                    >
                      <span>Explore Solutions</span>
                    </GlassButton>
                  </motion.div>
                </motion.div>

                {/* Right Content - Professional Tech Animation */}
                <motion.div
                  initial={{ opacity: 0, x: 50, scale: 0.95 }}
                  animate={{ opacity: 1, x: 0, scale: 1 }}
                  transition={{ duration: 0.8, delay: 1.2 }}
                  className="flex items-center justify-center h-96 sm:h-[500px] lg:h-full lg:min-h-[600px] relative"
                >
                  <TechAnimation scrollY={smoothScrollY} />
                </motion.div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}