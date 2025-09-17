"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";

export default function HeroSection() {
  return (
    <section className="relative overflow-hidden bg-black text-white">
      {/* Decorative background elements */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-20 w-72 h-72 bg-blue-600/20 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-20 right-20 w-96 h-96 bg-gray-500/20 rounded-full blur-3xl animate-pulse delay-1000" />
      </div>

      {/* Main Content */}
      <div className="relative z-10 container mx-auto px-6 lg:px-12 py-20 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        {/* Left Side Content */}
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="space-y-8"
        >
          <h1 className="text-4xl md:text-6xl font-bold leading-tight">
            Build the Future with{" "}
            <span className="bg-gradient-to-r from-blue-500 via-blue-400 to-gray-300 bg-clip-text text-transparent">
              NexCy
            </span>
          </h1>

          <p className="text-lg text-gray-300 max-w-lg">
            Empowering businesses with modern software, web, and app solutions. 
            Designed for scalability, performance, and impact.
          </p>

          <div className="flex space-x-4">
            <Button className="bg-blue-600 hover:bg-blue-700 text-white rounded-xl px-6 py-3 text-lg">
              Get Started
            </Button>
            <Button
              variant="outline"
              className="border-gray-600 text-gray-200 hover:bg-gray-800 rounded-xl px-6 py-3 text-lg"
            >
              Learn More
            </Button>
          </div>
        </motion.div>

        {/* Right Side Image */}
        <motion.div
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="relative"
        >
          <Image
            src="/little-pills.gif" // keep your existing hero image path
            alt="NexCy Innovation"
            width={600}
            height={600}
            className="rounded-2xl shadow-2xl"
          />
          <div className="absolute inset-0 bg-gradient-to-tr from-black/30 to-transparent rounded-2xl" />
        </motion.div>
      </div>

    </section>
  );
}