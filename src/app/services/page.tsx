'use client';

import { motion } from 'framer-motion';
import {
  Globe,
  Smartphone,
  Cpu,
  Server,
  Cloud,
  Database,
  ShieldCheck,
  Palette,
  LayoutGrid,
} from 'lucide-react';

const services = [
  {
    icon: <Globe className="h-8 w-8 text-blue-600" />,
    title: 'Web Development',
    description: 'Modern websites, SaaS platforms, and powerful web apps built to scale.',
  },
  {
    icon: <Smartphone className="h-8 w-8 text-blue-600" />,
    title: 'Mobile Apps',
    description: 'Cross-platform and native apps that deliver seamless user experiences.',
  },
  {
    icon: <Cpu className="h-8 w-8 text-blue-600" />,
    title: 'IoT Solutions',
    description: 'Smart, connected systems that automate and optimize the physical world.',
  },
  {
    icon: <Server className="h-8 w-8 text-blue-600" />,
    title: 'Cloud Infrastructure',
    description: 'Reliable backend and cloud services for performance and scalability.',
  },
  {
    icon: <Database className="h-8 w-8 text-blue-600" />,
    title: 'Data & Analytics',
    description: 'Insights, dashboards, and analytics that power decisions.',
  },
  {
    icon: <ShieldCheck className="h-8 w-8 text-blue-600" />,
    title: 'Cybersecurity',
    description: 'Security-focused development, audits, and threat mitigation.',
  },
  {
    icon: <Palette className="h-8 w-8 text-blue-600" />,
    title: 'UI/UX Design',
    description: 'Intuitive, elegant interfaces that delight and retain users.',
  },
  {
    icon: <LayoutGrid className="h-8 w-8 text-blue-600" />,
    title: 'Product Strategy',
    description: 'Full-cycle planning, MVP design, and iterative scaling solutions.',
  },
];

export default function ServicesPage() {
  return (
    <main className="pt-20 pb-24 bg-gradient-to-br from-[#f8f9fa] to-[#e9ecef] text-[#1c1c1e] relative overflow-hidden">
      <div className="container mx-auto px-4 text-center">
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-4xl md:text-5xl font-bold text-blue-600 drop-shadow mb-4"
        >
          Our Services
        </motion.h1>
        <p className="text-gray-700 text-lg max-w-2xl mx-auto mb-12">
          At NexCy Technologies, we craft full-stack, end-to-end digital solutions for web, mobile, and IoT. Explore the services that power our mission.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, i) => (
            <motion.div
              key={i}
              className="bg-white/70 backdrop-blur-xl border border-white/30 rounded-2xl p-6 shadow-lg hover:shadow-2xl transition"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
            >
              <div className="mb-4">{service.icon}</div>
              <h3 className="text-xl font-semibold text-[#1c1c1e] mb-2">{service.title}</h3>
              <p className="text-gray-600 text-sm">{service.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </main>
  );
}