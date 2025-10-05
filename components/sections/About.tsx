"use client";
import { motion } from "framer-motion";
import { FaRocket, FaBullseye } from "react-icons/fa";

const aboutSummary = [
  "Leveraging the latest technologies in web and mobile development we craft tailored solutions that meet your unique needs.",
  "Continuous client support paving the way for future collaborations.",
  "Quality, affordability, and timely delivery in one package.",
];

const features = [
  {
    title: "Innovation First",
    description: "Leverage cutting-edge tech to deliver solutions that give you a competitive advantage.",
    icon: FaRocket,
  },
  {
    title: "Client-Centric",
    description: "Your success is our priority. Exceeding your expectations is what we thrive for.",
    icon: FaBullseye,
  },
];

export default function About() {
  return (
    <section
      id="about"
      className="relative pt-32 pb-24 px-4 sm:px-6 lg:px-12 bg-[#fffaf5] overflow-hidden"
    >
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
          className="text-center mb-16 px-4 sm:px-6 lg:px-0"
        >
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-gray-900 mb-6 leading-tight">
            About{" "}
            <span className="bg-gradient-to-r from-orange-400 to-orange-500 bg-clip-text text-transparent">
              NexCy Technologies
            </span>
          </h2>
          <p className="text-gray-700 text-base sm:text-lg lg:text-xl max-w-3xl mx-auto leading-relaxed">
            Nexcy technologies is the home for a set of aspiring young minds that believe in the power of technology to create meaningful change. We are committed to driving innovation and is passionate about helping businesses thrive in the digital age.
          </p>
        </motion.div>

        {/* About Summary Card */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="relative flex flex-col gap-4 p-8 rounded-2xl bg-white/20 backdrop-blur-3xl border border-white/30 shadow-[0_4px_30px_rgba(0,0,0,0.05)] hover:shadow-2xl transition-all duration-500"
        >
          {aboutSummary.map((point, idx) => (
            <div key={idx} className="flex items-start gap-3">
              <div className="text-orange-500 text-2xl mt-1">•</div>
              <p className="text-gray-700 text-base sm:text-lg leading-relaxed">{point}</p>
            </div>
          ))}
        </motion.div>

        {/* Features */}
        <div className="mt-16 grid md:grid-cols-2 gap-8">
          {features.map((feature, idx) => {
            const Icon = feature.icon;
            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: idx * 0.2 }}
                className="relative flex items-start gap-4 p-6 bg-white/20 rounded-2xl border border-white/30 backdrop-blur-3xl shadow-md hover:shadow-xl cursor-pointer transition-all duration-500"
              >
                <div className="text-4xl text-orange-500 flex-shrink-0">
                  <Icon />
                </div>
                <div className="relative z-10">
                  <h4 className="text-xl sm:text-2xl font-semibold text-gray-900 mb-1">{feature.title}</h4>
                  <p className="text-gray-700 text-sm sm:text-base leading-relaxed">{feature.description}</p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}