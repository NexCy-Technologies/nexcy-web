'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Hammer, CloudCog, ActivitySquare, AppWindow, X } from 'lucide-react';

const projects = [
  {
    icon: <Hammer className="h-8 w-8 text-blue-600" />,
    title: 'AgroPulse',
    description: 'Smart greenhouse monitoring system using IoT sensors and remote controls.',
    details: (
      <>
        <p>
          AgroPulse is an advanced IoT solution designed to optimize greenhouse environments for
          increased crop yield and energy efficiency. It leverages real-time sensor data to monitor
          temperature, humidity, soil moisture, and light intensity.
        </p>
        <p className="mt-4">
          The system features:
          <ul className="list-disc list-inside mt-2">
            <li>Automated climate control via connected actuators</li>
            <li>Remote management via mobile and web dashboards</li>
            <li>AI-driven predictive analytics for irrigation scheduling</li>
            <li>Energy consumption optimization algorithms</li>
          </ul>
        </p>
        <p className="mt-4">
          Built with a scalable architecture supporting hundreds of sensor nodes communicating via
          MQTT, the platform ensures low latency and high reliability in diverse environmental
          conditions.
        </p>
      </>
    ),
  },
  {
    icon: <AppWindow className="h-8 w-8 text-blue-600" />,
    title: 'Carrom Cash',
    description: 'Multiplayer carrom game with token rewards and real-time gameplay.',
    details: (
      <>
        <p>
          Carrom Cash reimagines the classic carrom board game as a real-time multiplayer mobile
          experience with integrated blockchain-based token rewards.
        </p>
        <p className="mt-4">
          Key features include:
          <ul className="list-disc list-inside mt-2">
            <li>Low-latency peer-to-peer gameplay using WebRTC and WebSocket protocols</li>
            <li>Custom physics engine for realistic disc movement and collisions</li>
            <li>Secure wallet integration enabling token staking and winnings</li>
            <li>Social features including friend lists, tournaments, and chat</li>
          </ul>
        </p>
        <p className="mt-4">
          Developed with cross-platform compatibility in mind, Carrom Cash supports iOS, Android,
          and Web browsers with a unified codebase using React Native and Node.js backend.
        </p>
      </>
    ),
  },
  {
    icon: <CloudCog className="h-8 w-8 text-blue-600" />,
    title: 'InvenLink',
    description: 'Cloud-based inventory and asset tracking for small teams.',
    details: (
      <>
        <p>
          InvenLink is a cloud-native inventory management system designed for small to medium
          businesses requiring flexible and collaborative asset tracking.
        </p>
        <p className="mt-4">
          Features include:
          <ul className="list-disc list-inside mt-2">
            <li>Real-time inventory updates with multi-user concurrency handling</li>
            <li>Barcode scanning and RFID integration for fast check-in/check-out</li>
            <li>Role-based access control with audit logs</li>
            <li>Data analytics dashboards for usage trends and forecasting</li>
          </ul>
        </p>
        <p className="mt-4">
          The system leverages AWS serverless architecture, including Lambda functions, DynamoDB,
          and API Gateway, for a highly available and cost-effective solution.
        </p>
      </>
    ),
  },
  {
    icon: <ActivitySquare className="h-8 w-8 text-blue-600" />,
    title: 'FleetMate',
    description: 'Fleet management and GPS tracking dashboard for logistics.',
    details: (
      <>
        <p>
          FleetMate provides an end-to-end fleet tracking and management solution tailored for
          logistics companies seeking operational efficiency.
        </p>
        <p className="mt-4">
          Core capabilities:
          <ul className="list-disc list-inside mt-2">
            <li>Real-time GPS tracking of vehicles with geofencing alerts</li>
            <li>Driver behavior analytics including speed, braking, and idle times</li>
            <li>Route optimization algorithms reducing fuel consumption and delays</li>
            <li>Comprehensive reporting and compliance documentation</li>
          </ul>
        </p>
        <p className="mt-4">
          Built using React for frontend and Node.js with PostgreSQL backend, FleetMate ensures
          scalability to manage thousands of vehicles across multiple regions.
        </p>
      </>
    ),
  },
];

function Modal({ project, onClose }: { project: typeof projects[0] | null; onClose: () => void }) {
  return (
    <AnimatePresence>
      {project && (
        <>
          <motion.div
            key="backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.6 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black z-40"
          />
          <motion.div
            key="modal"
            initial={{ opacity: 0, scale: 0.8, y: 50 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 50 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-6"
          >
            <div className="bg-white rounded-3xl max-w-3xl max-h-[90vh] overflow-y-auto shadow-2xl p-8 relative">
              <button
                onClick={onClose}
                aria-label="Close modal"
                className="absolute top-4 right-4 text-gray-500 hover:text-gray-800 transition"
              >
                <X className="h-6 w-6" />
              </button>
              <div className="flex items-center space-x-4 mb-6">
                <div>{project.icon}</div>
                <h2 className="text-3xl font-bold text-blue-600">{project.title}</h2>
              </div>
              <div className="text-gray-700 text-base leading-relaxed text-justify">{project.details}</div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

export default function ProjectsPage() {
  const [selectedProject, setSelectedProject] = useState<typeof projects[0] | null>(null);

  return (
    <section className="pt-24 bg-gradient-to-br from-[#f8f9fa] to-[#e9ecef] text-[#1c1c1e] relative overflow-hidden">
      <div className="container mx-auto px-4 text-center">
        <motion.h1
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-4xl md:text-5xl font-bold text-blue-600 mb-6 drop-shadow-lg"
        >
          Projects We’ve Built
        </motion.h1>
        <p className="text-lg text-gray-700 max-w-2xl mx-auto mb-12">
          Here’s a look at some of the intelligent, scalable systems we’ve crafted.
        </p>
      </div>

      <div className="py-10 container mx-auto px-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {projects.map((project, i) => (
          <motion.div
            key={i}
            className="bg-white/70 backdrop-blur-lg border border-white/30 rounded-2xl p-6 shadow-xl hover:shadow-2xl transition cursor-pointer"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1 }}
            onClick={() => setSelectedProject(project)}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') setSelectedProject(project);
            }}
            aria-label={`View details for project ${project.title}`}
          >
            <div className="mb-4">{project.icon}</div>
            <h3 className="text-xl font-semibold text-[#1c1c1e] mb-2">{project.title}</h3>
            <p className="text-gray-600 text-sm">{project.description}</p>
          </motion.div>
        ))}
      </div>

      <Modal project={selectedProject} onClose={() => setSelectedProject(null)} />
    </section>
  );
}