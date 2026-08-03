"use client";

import React, { useRef, useState } from "react";
import { motion, useScroll, useMotionValueEvent } from "framer-motion";

const manifesto = [
  {
    index: "01",
    text: "Leveraging the latest in Web, Mobile, AI/ML and IoT — we craft tailored solutions that fit your exact needs.",
  },
  {
    index: "02",
    text: "Continuous support that doesn't end at launch, paving the way for long-term collaboration.",
  },
  {
    index: "03",
    text: "Quality, affordability, and timely delivery. Never a compromise — always a standard.",
  },
];

const pillars = [
  {
    label: "Innovation First",
    body: "We stay ahead of the curve so you don't have to. Every solution we build gives you a real competitive edge.",
  },
  {
    label: "Client-Centric",
    body: "Your success is the only metric we measure ourselves by. Exceeding expectations isn't a goal — it's the baseline.",
  },
];

export default function About() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start center", "end center"],
  });

  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    // If we're at the very bottom or top, clamp to valid indices
    const index = Math.min(
      manifesto.length - 1,
      Math.max(0, Math.floor(latest * manifesto.length))
    );
    setActiveIndex(index);
  });

  return (
    <section
      id="about"
      className="relative py-16 sm:py-20 md:py-28 px-4 sm:px-6 lg:px-12 bg-[#fffaf5] overflow-hidden"
    >
      <div className="max-w-6xl mx-auto">

        {/* ── Signature background word ── */}
        <span
          aria-hidden="true"
          className="pointer-events-none select-none absolute left-1/2 top-8 -translate-x-1/2 text-[clamp(5rem,18vw,14rem)] font-black uppercase leading-none tracking-tighter text-orange-500/[0.04] whitespace-nowrap"
        >
          NEXCY
        </span>

        {/* ── Split layout ── */}
        <div className="relative grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-start mb-16 sm:mb-20">

          {/* Left — editorial headline block */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="lg:sticky lg:top-24"
          >
            {/* Eyebrow */}
            <div className="flex items-center gap-3 mb-5 sm:mb-6">
              <div className="h-px w-8 bg-orange-400" />
              <span className="text-xs font-semibold tracking-widest uppercase text-orange-500">
                Who We Are
              </span>
            </div>

            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold text-gray-900 leading-tight mb-6 sm:mb-8">
              Building the{" "}
              <span className="bg-gradient-to-r from-orange-400 to-orange-600 bg-clip-text text-transparent">
                digital future
              </span>
              , one product at a time.
            </h2>

            <p className="text-gray-500 text-sm sm:text-base leading-relaxed max-w-md">
              Nexcy Technologies is the home for a group of aspiring young minds
              that believe in the power of technology to create meaningful
              change — committed to driving innovation and helping businesses
              thrive in the digital age.
            </p>
          </motion.div>

          {/* Right — numbered manifesto */}
          <motion.div
            ref={containerRef}
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.8, delay: 0.15, ease: "easeOut" }}
            className="flex flex-col gap-0 divide-y divide-gray-100"
          >
            {manifesto.map((item, idx) => {
              const isActive = activeIndex === idx;
              return (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.55, delay: 0.2 + idx * 0.12 }}
                  className={`group flex items-start gap-5 py-6 sm:py-7 transition-opacity duration-500 ${
                    isActive ? "opacity-100" : "opacity-30 hover:opacity-70"
                  }`}
                >
                  {/* Number */}
                  <span
                    className={`flex-shrink-0 text-xs font-bold tracking-widest mt-0.5 transition-colors duration-300 ${
                      isActive ? "text-orange-600" : "text-orange-400 group-hover:text-orange-500"
                    }`}
                  >
                    {item.index}
                  </span>

                  {/* Thin vertical rule */}
                  <div
                    className={`flex-shrink-0 w-1 self-stretch transition-colors duration-300 rounded-full ${
                      isActive ? "bg-orange-500" : "bg-orange-100 group-hover:bg-orange-300"
                    }`}
                  />

                  {/* Text */}
                  <p
                    className={`text-sm sm:text-base leading-relaxed transition-colors duration-300 ${
                      isActive ? "text-gray-900 font-medium" : "text-gray-500 group-hover:text-gray-700"
                    }`}
                  >
                    {item.text}
                  </p>
                </motion.div>
              );
            })}
          </motion.div>
        </div>

        {/* ── Pillars bar ── */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-30px" }}
          transition={{ duration: 0.75, delay: 0.1 }}
          className="grid grid-cols-1 sm:grid-cols-2 divide-y sm:divide-y-0 sm:divide-x divide-orange-100 border border-orange-100 rounded-2xl overflow-hidden bg-white"
        >
          {pillars.map((pillar, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.45, delay: 0.2 + idx * 0.1 }}
              className="group px-7 py-7 sm:px-8 sm:py-8 hover:bg-orange-50 transition-colors duration-300"
            >
              {/* Orange top accent on hover */}
              <div className="flex items-center gap-3 mb-3">
                <div className="w-1.5 h-1.5 rounded-full bg-orange-400 group-hover:scale-125 transition-transform duration-300" />
                <h4 className="text-sm sm:text-base font-bold text-gray-900 group-hover:text-orange-600 transition-colors duration-300">
                  {pillar.label}
                </h4>
              </div>
              <p className="text-gray-500 text-xs sm:text-sm leading-relaxed pl-4">
                {pillar.body}
              </p>
            </motion.div>
          ))}
        </motion.div>

      </div>
    </section>
  );
}
