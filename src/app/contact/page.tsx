'use client';

import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, Send } from 'lucide-react';

export default function ContactPage() {
  return (
    <section className="pt-20 pb-24 bg-gradient-to-br from-[#f8f9fa] to-[#e9ecef] text-[#1c1c1e] relative overflow-hidden">
      <div className="container mx-auto px-4">
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-4xl font-bold text-blue-600 mb-4 text-center"
        >
          Get in Touch
        </motion.h1>
        <p className="text-center text-gray-700 max-w-xl mx-auto mb-12">
          We'd love to hear from you. Whether it's a project inquiry, partnership, or just a hello — reach out today.
        </p>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          {/* Contact Details */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="bg-white/70 backdrop-blur-lg border border-white/30 p-6 rounded-2xl shadow-lg space-y-4"
          >
            <div className="flex items-center gap-4">
              <Mail className="text-blue-600" />
              <span className="text-gray-800">contact@nexcy.me</span>
            </div>
            <div className="flex items-center gap-4">
              <Phone className="text-blue-600" />
              <span className="text-gray-800">+94 XXX XXX XXX</span>
            </div>
            <div className="flex items-center gap-4">
              <MapPin className="text-blue-600" />
              <span className="text-gray-800">Sri Lanka</span>
            </div>
          </motion.div>

          {/* Contact Form */}
          <motion.form
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="bg-white/80 backdrop-blur-lg border border-white/30 p-6 rounded-2xl shadow-lg space-y-4"
            onSubmit={(e) => {
              e.preventDefault();
              alert('Form submission logic to be implemented');
            }}
          >
            <input
              type="text"
              placeholder="Your Name"
              className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500"
              required
            />
            <input
              type="email"
              placeholder="Your Email"
              className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500"
              required
            />
            <textarea
              placeholder="Your Message"
              rows={5}
              className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500"
              required
            />
            <button
              type="submit"
              className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-xl font-semibold transition"
            >
              <Send size={18} />
              Send Message
            </button>
          </motion.form>
        </div>
      </div>
    </section>
  );
}