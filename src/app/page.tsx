'use client';

import { motion } from 'framer-motion';
import {
  Globe,
  Smartphone,
  Cpu,
  Briefcase,
  SlidersHorizontal,
  Rocket,
  Cloud,
} from 'lucide-react';

const services = [
  {
    icon: <Globe className="h-8 w-8 text-blue-600" />,
    title: 'Web Solutions',
    description: 'Custom websites, SaaS platforms, and powerful web apps.',
  },
  {
    icon: <Smartphone className="h-8 w-8 text-blue-600" />,
    title: 'Mobile Development',
    description: 'Native and cross-platform apps to engage your users.',
  },
  {
    icon: <Cpu className="h-8 w-8 text-blue-600" />,
    title: 'IoT Innovation',
    description: 'Smart systems and devices that connect the physical world.',
  },
  {
    icon: <Cloud className="h-8 w-8 text-blue-600" />,
    title: 'Cloud Solutions',
    description: 'Scalable cloud infrastructure and services tailored for your business.',
  },
];

const extras = [
  {
    icon: <Briefcase className="h-8 w-8 text-blue-600" />,
    title: 'Project Management',
    description: 'Agile methods & intelligent tools to organize and deliver.',
  },
  {
    icon: <SlidersHorizontal className="h-8 w-8 text-blue-600" />,
    title: 'Choose & Customize Plans',
    description: 'Flexible options tailored to your specific project needs.',
  },
];

const testimonials = [
  {
    name: 'Sarah L.',
    feedback: 'NexCy brought our idea to life with incredible polish and speed.',
  },
  {
    name: 'Dev Patel',
    feedback: 'They delivered a clean, high-performance IoT dashboard that scaled beautifully.',
  },
];

export default function HomePage() {
  return (
    <section className="pt-16 bg-gradient-to-br from-[#f8f9fa] to-[#e9ecef] text-[#1c1c1e] relative overflow-hidden">
      {/* Hero */}
      <div className="min-h-screen pt-auto pb-20 container mx-auto px-4 flex flex-col items-center justify-center text-center relative z-10">
        <motion.h1
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-4xl md:text-5xl font-bold text-blue-600 drop-shadow-lg"
        >
          Welcome to NexCy Technologies
        </motion.h1>
        <p className="mt-4 text-lg text-gray-700 max-w-2xl">
          We design smart, scalable Web, Mobile, and IoT solutions with clarity and elegance.
        </p>
        <motion.a
          href="#get-started"
          whileHover={{ scale: 1.05 }}
          className="mt-8 inline-block bg-blue-600/80 hover:bg-blue-700 text-white font-medium py-2 px-6 rounded-xl backdrop-blur-md shadow-lg transition-all"
        >
          Get Started
        </motion.a>
      </div>

      {/* Feature Tiles */}
      <div className="py-16 container mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-8">
        {[...services, ...extras].map((item, i) => (
          <motion.div
            key={i}
            className="bg-white/70 backdrop-blur-lg border border-white/30 rounded-2xl p-6 shadow-xl hover:shadow-2xl transition"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1 }}
          >
            <div className="mb-4">{item.icon}</div>
            <h3 className="text-xl font-semibold text-[#1c1c1e] mb-2">{item.title}</h3>
            <p className="text-gray-600 text-sm">{item.description}</p>
          </motion.div>
        ))}
      </div>

      {/* Testimonials */}
      <div className="py-20 bg-white/60 backdrop-blur-2xl border-t border-gray-200 text-center">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-blue-600 mb-10">What Our Clients Say</h2>
          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {testimonials.map((t, i) => (
              <motion.div
                key={i}
                className="bg-white/80 backdrop-blur-lg p-6 rounded-2xl shadow border border-white/30"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.2 }}
              >
                <p className="italic text-gray-700">“{t.feedback}”</p>
                <p className="mt-4 font-semibold text-[#1c1c1e]">— {t.name}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Try Today CTA */}
      <div className="py-20 bg-gradient-to-t from-[#f1f3f5] to-[#ffffff] text-center">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-blue-600">Ready to build with us?</h2>
          <p className="mt-2 text-gray-600">Launch your next project with NexCy Technologies today.</p>
          <motion.a
            href="/contact"
            whileHover={{ scale: 1.05 }}
            className="mt-6 inline-block bg-blue-600 hover:bg-blue-700 text-white py-2 px-6 rounded-xl font-medium shadow-md transition"
          >
            Contact Us
          </motion.a>
        </div>
      </div>

      {/* Footer Get Started */}
      <div id="get-started" className="bg-white/80 backdrop-blur-md py-12 text-center border-t border-gray-200">
        <div className="container mx-auto px-4">
          <Rocket className="mx-auto mb-4 text-blue-600" size={36} />
          <h2 className="text-2xl font-bold text-[#1c1c1e] mb-2">Let’s Get Started</h2>
          <p className="text-gray-600 mb-6 max-w-md mx-auto">
            From startups to enterprises — we help launch, grow, and transform your vision into reality.
          </p>
          <motion.a
            href="/start"
            whileHover={{ scale: 1.05 }}
            className="inline-block bg-blue-600 hover:bg-blue-700 text-white py-2 px-6 rounded-xl font-semibold transition"
          >
            Start Your Project
          </motion.a>
        </div>
      </div>
    </section>
  );
}