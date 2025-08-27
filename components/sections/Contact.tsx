"use client"

import type React from "react"

import { useState } from "react"
import { GlassCard } from "@/components/ui/glass-card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { useToast } from "@/hooks/use-toast"
import { FaEnvelope, FaWhatsapp, FaClock, FaUser, FaPhone, FaComment } from "react-icons/fa"

export default function Contact() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const { toast } = useToast()

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsSubmitting(true)

    const formData = new FormData(e.currentTarget)
    const data = {
      name: formData.get("name") as string,
      email: formData.get("email") as string,
      phone: formData.get("phone") as string,
      message: formData.get("message") as string,
    }

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      })

      if (response.ok) {
        toast({
          title: "Message sent successfully!",
          description: "We'll get back to you within 24 hours.",
        })
        ;(e.target as HTMLFormElement).reset()
      } else {
        throw new Error("Failed to send message")
      }
    } catch (error) {
      toast({
        title: "Error sending message",
        description: "Please try again or contact us directly.",
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <section id="contact" className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Section header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-6">
            Get In{" "}
            <span className="bg-gradient-to-r from-blue-400 to-blue-600 bg-clip-text text-transparent">Touch</span>
          </h2>
          <p className="text-sm sm:text-base lg:text-lg text-white/80 max-w-3xl mx-auto leading-relaxed">
            Ready to transform your ideas into reality? Let's discuss your project and see how we can help you achieve
            your goals.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-start">
          <GlassCard className="p-8">
            <div className="flex items-center space-x-3 mb-6">
              <FaComment className="text-blue-400 text-2xl" />
              <h3 className="text-xl sm:text-2xl font-bold text-white">Send us a message</h3>
            </div>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label htmlFor="name" className="text-white/80 text-sm font-medium flex items-center space-x-2">
                    <FaUser className="text-blue-400" />
                    <span>Full Name *</span>
                  </label>
                  <Input
                    id="name"
                    name="name"
                    type="text"
                    required
                    className="bg-white/5 border-white/20 text-white placeholder:text-white/50 focus:border-blue-400 focus:ring-blue-400 rounded-xl h-12"
                    placeholder="Your full name"
                  />
                </div>
                <div className="space-y-2">
                  <label htmlFor="email" className="text-white/80 text-sm font-medium flex items-center space-x-2">
                    <FaEnvelope className="text-blue-400" />
                    <span>Email Address *</span>
                  </label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    required
                    className="bg-white/5 border-white/20 text-white placeholder:text-white/50 focus:border-blue-400 focus:ring-blue-400 rounded-xl h-12"
                    placeholder="your@email.com"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <label htmlFor="phone" className="text-white/80 text-sm font-medium flex items-center space-x-2">
                  <FaPhone className="text-blue-400" />
                  <span>Phone Number</span>
                </label>
                <Input
                  id="phone"
                  name="phone"
                  type="tel"
                  className="bg-white/5 border-white/20 text-white placeholder:text-white/50 focus:border-blue-400 focus:ring-blue-400 rounded-xl h-12"
                  placeholder="+94 XXX XXX XXX"
                />
              </div>
              <div className="space-y-2">
                <label htmlFor="message" className="text-white/80 text-sm font-medium flex items-center space-x-2">
                  <FaComment className="text-blue-400" />
                  <span>Message *</span>
                </label>
                <Textarea
                  id="message"
                  name="message"
                  required
                  rows={5}
                  className="bg-white/5 border-white/20 text-white placeholder:text-white/50 focus:border-blue-400 focus:ring-blue-400 resize-none rounded-xl"
                  placeholder="Tell us about your project..."
                />
              </div>
              <Button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white font-medium py-4 rounded-xl shadow-lg shadow-blue-500/25 hover:shadow-blue-500/40 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed h-14"
              >
                {isSubmitting ? "Sending..." : "Send Message"}
              </Button>
            </form>
          </GlassCard>

          {/* Contact Information */}
          <div className="space-y-8">
            {/* Contact Details */}
            <GlassCard className="p-8">
              <h3 className="text-xl sm:text-2xl font-bold text-white mb-6">Contact Information</h3>
              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-blue-500/20 rounded-xl flex items-center justify-center flex-shrink-0">
                    <FaEnvelope className="text-blue-400 text-lg" />
                  </div>
                  <div>
                    <h4 className="text-white font-semibold mb-1 text-sm sm:text-base">Email</h4>
                    <a
                      href="mailto:contact@nexcy.lk"
                      className="text-blue-400 hover:text-blue-300 transition-colors text-sm sm:text-base"
                    >
                      contact@nexcy.lk
                    </a>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-green-500/20 rounded-xl flex items-center justify-center flex-shrink-0">
                    <FaWhatsapp className="text-green-400 text-lg" />
                  </div>
                  <div>
                    <h4 className="text-white font-semibold mb-1 text-sm sm:text-base">WhatsApp</h4>
                    <a
                      href="https://wa.me/94725299199"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-green-400 hover:text-green-300 transition-colors text-sm sm:text-base"
                    >
                      +94 725 299 199
                    </a>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-purple-500/20 rounded-xl flex items-center justify-center flex-shrink-0">
                    <FaClock className="text-purple-400 text-lg" />
                  </div>
                  <div>
                    <h4 className="text-white font-semibold mb-1 text-sm sm:text-base">Response Time</h4>
                    <p className="text-white/70 text-sm sm:text-base">Within 24 hours</p>
                  </div>
                </div>
              </div>
            </GlassCard>

            {/* Office Hours */}
            <GlassCard className="p-8">
              <h3 className="text-lg sm:text-xl font-bold text-white mb-4">Office Hours</h3>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-white/70 text-sm sm:text-base">Monday - Friday</span>
                  <span className="text-white text-sm sm:text-base">9:00 AM - 6:00 PM</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-white/70 text-sm sm:text-base">Saturday</span>
                  <span className="text-white text-sm sm:text-base">10:00 AM - 4:00 PM</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-white/70 text-sm sm:text-base">Sunday</span>
                  <span className="text-white/50 text-sm sm:text-base">Closed</span>
                </div>
              </div>
            </GlassCard>

            {/* Quick Actions */}
            <div className="grid grid-cols-2 gap-4">
              <a href="mailto:contact@nexcy.lk">
                <Button
                  variant="outline"
                  className="w-full border-white/30 text-white hover:bg-white/10 hover:border-white/50 transition-all duration-200 bg-transparent"
                >
                  Email Us
                </Button>
              </a>
              <a href="https://wa.me/94725299199" target="_blank" rel="noopener noreferrer">
                <Button className="w-full bg-green-600 hover:bg-green-700 text-white transition-all duration-200">
                  WhatsApp
                </Button>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
