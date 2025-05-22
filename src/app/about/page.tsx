'use client';

import { motion } from 'framer-motion';
import {
  Rocket,
  Target,
  Users,
  HeartHandshake,
  Cpu,
  Globe,
} from 'lucide-react';

const coreValues = [
  {
    icon: <HeartHandshake className="h-8 w-8 text-blue-600" />,
    title: 'Integrity & Trust',
    description: 'We believe in long-term relationships and building tech with ethics.',
  },
  {
    icon: <Target className="h-8 w-8 text-blue-600" />,
    title: 'Purpose-Driven',
    description: 'Every product serves a goal. Every goal builds the future.',
  },
  {
    icon: <Users className="h-8 w-8 text-blue-600" />,
    title: 'User-Centered',
    description: 'We focus on delightful experiences for real-world impact.',
  },
];

export default function AboutPage() {
  return (
    <section className="pt-20 bg-gradient-to-br from-[#f8f9fa] to-[#e9ecef] text-[#1c1c1e] relative overflow-hidden min-h-screen">
      <div className="container mx-auto px-4 text-center">
        {/* Hero Section */}
        <motion.h1
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-4xl md:text-5xl font-bold text-blue-600 drop-shadow mb-4"
        >
          About NexCy Technologies
        </motion.h1>
        <p className="max-w-2xl mx-auto text-gray-700 text-lg mb-12">
          We are a Sri Lankan tech startup redefining the future of software through elegant Web, Mobile, and IoT solutions. Our mission is to become the most admired and impactful technology company in the world.
        </p>

        {/* Core Values */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
          {coreValues.map((item, i) => (
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

        {/* Mission Section */}
        <div className="bg-white/80 backdrop-blur-md rounded-2xl p-10 max-w-3xl mx-auto shadow-md border border-white/30 text-left">
          <div className="flex items-center mb-6">
            <Rocket className="text-blue-600 mr-3" size={28} />
            <h2 className="text-2xl font-bold text-[#1c1c1e]">Our Mission</h2>
          </div>
          <p className="text-gray-700 text-base leading-relaxed">
            We’re not just building apps — we’re building tomorrow. NexCy is committed to helping individuals, startups, and enterprises harness the power of digital transformation. Whether it’s launching new ideas, scaling platforms, or connecting real-world devices to the cloud, we approach every challenge with creativity and care.
          </p>
        </div>

        {/* Technology Focus */}
        <div className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {[
            {
              icon: <Globe className="h-8 w-8 text-blue-600" />,
              title: 'Web Platforms',
              desc: 'Custom portals, SaaS tools, and intuitive frontends.',
            },
            {
              icon: <Cpu className="h-8 w-8 text-blue-600" />,
              title: 'IoT & Smart Systems',
              desc: 'Connect sensors and real-time systems to actionable software.',
            },
            {
              icon: <Users className="h-8 w-8 text-blue-600" />,
              title: 'Mobile Experiences',
              desc: 'Cross-platform mobile apps that users love.',
            },
          ].map((t, i) => (
            <motion.div
              key={i}
              className="bg-white/70 backdrop-blur-lg border border-white/30 rounded-2xl p-6 shadow-lg hover:shadow-2xl transition"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.2 }}
            >
              <div className="mb-4">{t.icon}</div>
              <h3 className="text-xl font-semibold text-[#1c1c1e] mb-2">{t.title}</h3>
              <p className="text-gray-600 text-sm">{t.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}