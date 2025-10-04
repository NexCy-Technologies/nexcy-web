"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { useToast } from "@/hooks/use-toast"
import { 
  FaEnvelope, 
  FaWhatsapp, 
  FaClock, 
  FaUser, 
  FaPhone, 
  FaComment,
  FaCheck,
  FaPaperPlane,
  FaMapMarkerAlt,
  FaGlobe,
  FaCalendarAlt,
  FaArrowRight
} from "react-icons/fa"

export default function Contact() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [formStep, setFormStep] = useState(1)
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    project: "",
    budget: "",
    message: ""
  })
  const [isSuccess, setIsSuccess] = useState(false)
  const { toast } = useToast()

  // Auto-scroll to form when step changes
  useEffect(() => {
    if (formStep > 1) {
      const formElement = document.getElementById('contact-form')
      formElement?.scrollIntoView({ behavior: 'smooth', block: 'center' })
    }
  }, [formStep])

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }))
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || 'Failed to send message')
      }

      setIsSuccess(true)
      toast({
        title: "Message sent successfully!",
        description: "We'll get back to you within 24 hours.",
      })

      // Reset form after success
      setTimeout(() => {
        setFormStep(1)
        setFormData({
          name: "",
          email: "",
          phone: "",
          project: "",
          budget: "",
          message: ""
        })
        setIsSuccess(false)
      }, 3000)

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

  const nextStep = () => {
    if (formStep < 3) setFormStep(formStep + 1)
  }

  const prevStep = () => {
    if (formStep > 1) setFormStep(formStep - 1)
  }

  return (
    <section id="contact" className="py-12 sm:py-16 md:py-20 px-3 sm:px-4 md:px-6 lg:px-8 bg-[#fffaf5] overflow-hidden">
      <div className="max-w-7xl mx-auto">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="text-center mb-12 sm:mb-16"
        >
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-4 sm:mb-6 px-2">
            Get In{" "}
            <span className="bg-gradient-to-r from-orange-400 to-orange-600 bg-clip-text text-transparent">
              Touch
            </span>
          </h2>
          <p className="text-sm sm:text-base md:text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed px-4">
            Ready to transform your ideas into reality? Let's discuss your project and see how we can help you achieve
            your goals.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-start">
          {/* Enhanced Multi-Step Form */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-30px" }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <div className="p-6 sm:p-8 bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500">
              <div className="flex items-center space-x-3 mb-6">
                <FaComment className="text-orange-500 text-xl sm:text-2xl" />
                <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-gray-900">Send us a message</h3>
              </div>

              {/* Progress Bar */}
              <div className="mb-8">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-xs sm:text-sm text-gray-600 font-medium">Step {formStep} of 3</span>
                  <span className="text-xs sm:text-sm text-gray-600">{Math.round((formStep / 3) * 100)}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <motion.div 
                    className="bg-gradient-to-r from-orange-400 to-orange-600 h-2 rounded-full"
                    initial={{ width: "33%" }}
                    animate={{ width: `${(formStep / 3) * 100}%` }}
                    transition={{ duration: 0.5, ease: "easeInOut" }}
                  />
                </div>
              </div>

              <AnimatePresence mode="wait">
                {!isSuccess ? (
                  <form onSubmit={handleSubmit} className="space-y-6">
                    {/* Step 1: Basic Info */}
                    {formStep === 1 && (
                      <motion.div
                        key="step1"
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                        transition={{ duration: 0.3 }}
                        className="space-y-6"
                      >
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <label className="text-gray-700 text-sm font-medium flex items-center space-x-2">
                              <FaUser className="text-orange-500" />
                              <span>Full Name *</span>
                            </label>
                            <Input
                              type="text"
                              required
                              value={formData.name}
                              onChange={(e) => handleInputChange('name', e.target.value)}
                              className="bg-white/80 border-gray-300 text-gray-900 placeholder:text-gray-500 focus:border-orange-400 focus:ring-orange-400 rounded-xl h-12"
                              placeholder="Your full name"
                            />
                          </div>
                          <div className="space-y-2">
                            <label className="text-gray-700 text-sm font-medium flex items-center space-x-2">
                              <FaEnvelope className="text-orange-500" />
                              <span>Email Address *</span>
                            </label>
                            <Input
                              type="email"
                              required
                              value={formData.email}
                              onChange={(e) => handleInputChange('email', e.target.value)}
                              className="bg-white/80 border-gray-300 text-gray-900 placeholder:text-gray-500 focus:border-orange-400 focus:ring-orange-400 rounded-xl h-12"
                              placeholder="your@email.com"
                            />
                          </div>
                        </div>
                        <div className="space-y-2">
                          <label className="text-gray-700 text-sm font-medium flex items-center space-x-2">
                            <FaPhone className="text-orange-500" />
                            <span>Phone Number</span>
                          </label>
                          <Input
                            type="tel"
                            value={formData.phone}
                            onChange={(e) => handleInputChange('phone', e.target.value)}
                            className="bg-white/80 border-gray-300 text-gray-900 placeholder:text-gray-500 focus:border-orange-400 focus:ring-orange-400 rounded-xl h-12"
                            placeholder="+94 XXX XXX XXX"
                          />
                        </div>
                        <Button
                          type="button"
                          onClick={nextStep}
                          disabled={!formData.name || !formData.email}
                          className="w-full bg-gradient-to-r from-orange-400 to-orange-600 hover:from-orange-500 hover:to-orange-700 text-white font-medium py-3 rounded-xl shadow-lg transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed h-12"
                        >
                          Next Step <FaArrowRight className="ml-2" />
                        </Button>
                      </motion.div>
                    )}

                    {/* Step 2: Project Details */}
                    {formStep === 2 && (
                      <motion.div
                        key="step2"
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                        transition={{ duration: 0.3 }}
                        className="space-y-6"
                      >
                        <div className="space-y-2">
                          <label className="text-gray-700 text-sm font-medium flex items-center space-x-2">
                            <FaGlobe className="text-orange-500" />
                            <span>Project Type *</span>
                          </label>
                          <select
                            required
                            value={formData.project}
                            onChange={(e) => handleInputChange('project', e.target.value)}
                            className="w-full bg-white/80 border border-gray-300 text-gray-900 focus:border-orange-400 focus:ring-orange-400 rounded-xl h-12 px-3"
                          >
                            <option value="">Select a project type</option>
                            <option value="web-development">Web Development</option>
                            <option value="mobile-app">Mobile App</option>
                            <option value="erp-pos">ERP/POS System</option>
                            <option value="ai-ml">AI/ML Solution</option>
                            <option value="iot">IoT Development</option>
                            <option value="other">Other</option>
                          </select>
                        </div>
                        <div className="space-y-2">
                          <label className="text-gray-700 text-sm font-medium flex items-center space-x-2">
                            <FaCalendarAlt className="text-orange-500" />
                            <span>Budget Range</span>
                          </label>
                          <select
                            value={formData.budget}
                            onChange={(e) => handleInputChange('budget', e.target.value)}
                            className="w-full bg-white/80 border border-gray-300 text-gray-900 focus:border-orange-400 focus:ring-orange-400 rounded-xl h-12 px-3"
                          >
                            <option value="">Select budget range</option>
                            <option value="under-100k">Under LKR 100,000</option>
                            <option value="100k-500k">LKR 100,000 - 500,000</option>
                            <option value="500k-1m">LKR 500,000 - 1,000,000</option>
                            <option value="1m-2m">LKR 1,000,000 - 2,000,000</option>
                            <option value="above-2m">Above LKR 2,000,000</option>
                            <option value="lets-discuss">Let's Discuss</option>
                          </select>
                        </div>
                        <div className="flex gap-3">
                          <Button
                            type="button"
                            onClick={prevStep}
                            variant="outline"
                            className="flex-1 border-gray-300 text-gray-700 hover:bg-gray-100 rounded-xl h-12"
                          >
                            Previous
                          </Button>
                          <Button
                            type="button"
                            onClick={nextStep}
                            disabled={!formData.project}
                            className="flex-1 bg-gradient-to-r from-orange-400 to-orange-600 hover:from-orange-500 hover:to-orange-700 text-white font-medium rounded-xl transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed h-12"
                          >
                            Next Step <FaArrowRight className="ml-2" />
                          </Button>
                        </div>
                      </motion.div>
                    )}

                    {/* Step 3: Message */}
                    {formStep === 3 && (
                      <motion.div
                        key="step3"
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                        transition={{ duration: 0.3 }}
                        className="space-y-6"
                      >
                        <div className="space-y-2">
                          <label className="text-gray-700 text-sm font-medium flex items-center space-x-2">
                            <FaComment className="text-orange-500" />
                            <span>Project Description *</span>
                          </label>
                          <Textarea
                            required
                            rows={6}
                            value={formData.message}
                            onChange={(e) => handleInputChange('message', e.target.value)}
                            className="bg-white/80 border-gray-300 text-gray-900 placeholder:text-gray-500 focus:border-orange-400 focus:ring-orange-400 resize-none rounded-xl"
                            placeholder="Tell us about your project in detail. What are your goals, requirements, and timeline?"
                          />
                        </div>
                        <div className="flex gap-3">
                          <Button
                            type="button"
                            onClick={prevStep}
                            variant="outline"
                            className="flex-1 border-gray-300 text-gray-700 hover:bg-gray-100 rounded-xl h-12"
                          >
                            Previous
                          </Button>
                          <Button
                            type="submit"
                            disabled={isSubmitting || !formData.message}
                            className="flex-1 bg-gradient-to-r from-orange-400 to-orange-600 hover:from-orange-500 hover:to-orange-700 text-white font-medium rounded-xl shadow-lg transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed h-12"
                          >
                            {isSubmitting ? (
                              <div className="flex items-center">
                                <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent mr-2"></div>
                                Sending...
                              </div>
                            ) : (
                              <>
                                Send Message <FaPaperPlane className="ml-2" />
                              </>
                            )}
                          </Button>
                        </div>
                      </motion.div>
                    )}
                  </form>
                ) : (
                  /* Success State */
                  <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5 }}
                    className="text-center py-12"
                  >
                    <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <FaCheck className="text-green-600 text-2xl" />
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 mb-2">Message Sent Successfully!</h3>
                    <p className="text-gray-600 mb-4">We'll get back to you within 24 hours.</p>
                    <div className="text-sm text-gray-500">Redirecting...</div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>

          {/* Contact Information */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-30px" }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="space-y-6 sm:space-y-8"
          >
            {/* Contact Details */}
            <div className="p-6 sm:p-8 bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500">
              <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-gray-900 mb-6">Contact Information</h3>
              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-orange-500/20 rounded-xl flex items-center justify-center flex-shrink-0">
                    <FaEnvelope className="text-orange-500 text-lg" />
                  </div>
                  <div>
                    <h4 className="text-gray-900 font-semibold mb-1 text-sm sm:text-base">Email</h4>
                    <a
                      href="mailto:contact@nexcy.lk"
                      className="text-orange-500 hover:text-orange-600 transition-colors text-sm sm:text-base"
                    >
                      contact@nexcy.lk
                    </a>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-green-500/20 rounded-xl flex items-center justify-center flex-shrink-0">
                    <FaWhatsapp className="text-green-500 text-lg" />
                  </div>
                  <div>
                    <h4 className="text-gray-900 font-semibold mb-1 text-sm sm:text-base">WhatsApp</h4>
                    <a
                      href="https://wa.me/94725299199"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-green-500 hover:text-green-600 transition-colors text-sm sm:text-base"
                    >
                      +94 725 299 199
                    </a>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-blue-500/20 rounded-xl flex items-center justify-center flex-shrink-0">
                    <FaClock className="text-blue-500 text-lg" />
                  </div>
                  <div>
                    <h4 className="text-gray-900 font-semibold mb-1 text-sm sm:text-base">Response Time</h4>
                    <p className="text-gray-600 text-sm sm:text-base">Within 24 hours</p>
                  </div>
                </div>

              </div>
            </div>

            {/* Office Hours */}
            <div className="p-6 sm:p-8 bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500">
              <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-4">Office Hours</h3>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-600 text-sm sm:text-base">Monday - Friday</span>
                  <span className="text-gray-900 font-medium text-sm sm:text-base">9:00 AM - 6:00 PM</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600 text-sm sm:text-base">Saturday</span>
                  <span className="text-gray-900 font-medium text-sm sm:text-base">10:00 AM - 4:00 PM</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600 text-sm sm:text-base">Sunday</span>
                  <span className="text-gray-500 text-sm sm:text-base">Closed</span>
                </div>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="grid grid-cols-2 gap-4">
              <a href="mailto:contact@nexcy.lk">
                <Button
                  variant="outline"
                  className="w-full border-orange-300 text-orange-600 hover:bg-orange-50 hover:border-orange-400 transition-all duration-300 bg-transparent rounded-xl h-12"
                >
                  <FaEnvelope className="mr-2" />
                  Email Us
                </Button>
              </a>
              <a href="https://wa.me/94725299199" target="_blank" rel="noopener noreferrer">
                <Button className="w-full bg-green-600 hover:bg-green-700 text-white transition-all duration-300 rounded-xl h-12">
                  <FaWhatsapp className="mr-2" />
                  WhatsApp
                </Button>
              </a>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}