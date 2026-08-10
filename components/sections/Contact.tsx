"use client"

import type React from "react"
import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { useToast } from "@/hooks/use-toast"
import { FaEnvelope, FaWhatsapp, FaClock, FaCheck } from "react-icons/fa"

const contactMeta = [
  {
    icon: FaEnvelope,
    label: "Email",
    value: "contact@nexcy.lk",
    href: "mailto:contact@nexcy.lk",
    color: "text-orange-500",
    bg: "bg-orange-50",
    border: "border-orange-100",
  },
  {
    icon: FaWhatsapp,
    label: "WhatsApp",
    value: "+94 725 299 199",
    href: "https://wa.me/94725299199",
    color: "text-green-600",
    bg: "bg-green-50",
    border: "border-green-100",
  },
  {
    icon: FaClock,
    label: "Response time",
    value: "Within 24 hours",
    href: null,
    color: "text-blue-500",
    bg: "bg-blue-50",
    border: "border-blue-100",
  },
]

const projectTypes = [
  "Web Development",
  "Mobile App",
  "ERP / POS System",
  "AI / ML Solution",
  "IoT Development",
  "Other",
]

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    project: "",
    message: "",
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  const { toast } = useToast()

  const set = (field: string, value: string) =>
    setFormData((prev) => ({ ...prev, [field]: value }))

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsSubmitting(true)
    try {
      await new Promise((r) => setTimeout(r, 1800))
      setIsSuccess(true)
      toast({ title: "Message sent!", description: "We'll get back to you within 24 hours." })
      setTimeout(() => {
        setIsSuccess(false)
        setFormData({ name: "", email: "", phone: "", project: "", message: "" })
      }, 4000)
    } catch {
      toast({ title: "Something went wrong", description: "Please try again or reach us directly.", variant: "destructive" })
    } finally {
      setIsSubmitting(false)
    }
  }

  const canSubmit = formData.name && formData.email && formData.message && !isSubmitting

  return (
    <section
      id="contact"
      className="py-12 sm:py-16 md:py-20 px-3 sm:px-4 md:px-6 lg:px-8 bg-[#fffaf5] overflow-hidden"
    >
      <div className="max-w-7xl mx-auto">

        {/* ── Header ── */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12 sm:mb-16"
        >
          <h2 className="text-xl sm:text-2xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-3 sm:mb-5 px-2">
            Get In{" "}
            <span className="bg-gradient-to-r from-orange-400 to-orange-600 bg-clip-text text-transparent">
              Touch
            </span>
          </h2>
          <p className="text-xs sm:text-sm md:text-base text-gray-500 max-w-2xl mx-auto leading-relaxed px-4">
            Got an idea or just want to say hello? Drop us a message and we'll get back to you within 24 hours.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-5 gap-8 lg:gap-12 items-start">

          {/* ── Form ── */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-30px" }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="lg:col-span-3"
          >
            <div className="bg-background dark:bg-slate-900 rounded-2xl border border-border shadow-sm p-6 sm:p-8">
              <h3 className="text-xl sm:text-2xl font-bold text-foreground mb-6">
                Send us a message
              </h3>

              <AnimatePresence mode="wait">
                {isSuccess ? (
                  <motion.div
                    key="success"
                    initial={{ opacity: 0, scale: 0.92 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.92 }}
                    transition={{ duration: 0.4 }}
                    className="flex flex-col items-center justify-center py-16 text-center"
                  >
                    <div className="w-14 h-14 rounded-full bg-green-50 border border-green-100 flex items-center justify-center mb-5">
                      <FaCheck className="text-green-500 text-xl" />
                    </div>
                    <h3 className="text-lg font-bold text-foreground mb-2">Message sent!</h3>
                    <p className="text-muted-foreground text-sm">We'll get back to you within 24 hours.</p>
                  </motion.div>
                ) : (
                  <motion.form
                    key="form"
                    onSubmit={handleSubmit}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="space-y-5"
                  >
                    {/* Name + Email */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="space-y-1.5">
                        <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">
                          Full Name <span className="text-orange-400">*</span>
                        </label>
                        <Input
                          name="name"
                          required
                          value={formData.name}
                          onChange={handleChange}
                          placeholder="Your full name"
                          className="h-11 rounded-xl border-border focus:border-orange-400 focus:ring-orange-400 text-sm"
                        />
                      </div>
                      <div className="space-y-1.5">
                        <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">
                          Email <span className="text-orange-400">*</span>
                        </label>
                        <Input
                          name="email"
                          type="email"
                          required
                          value={formData.email}
                          onChange={handleChange}
                          placeholder="you@example.com"
                          className="h-11 rounded-xl border-border focus:border-orange-400 focus:ring-orange-400 text-sm"
                        />
                      </div>
                    </div>

                    {/* Phone + Project type */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="space-y-1.5">
                        <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">
                          Phone
                        </label>
                        <Input
                          name="phone"
                          type="tel"
                          value={formData.phone}
                          onChange={handleChange}
                          placeholder="+94 XXX XXX XXX"
                          className="h-11 rounded-xl border-border focus:border-orange-400 focus:ring-orange-400 text-sm"
                        />
                      </div>
                      <div className="space-y-1.5">
                        <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">
                          Project Type
                        </label>
                        <select
                          name="project"
                          value={formData.project}
                          onChange={handleChange}
                          className="w-full h-11 px-3 rounded-xl border border-border text-sm text-foreground bg-background focus:border-orange-400 focus:outline-none focus:ring-1 focus:ring-orange-400"
                        >
                          <option value="">Select a type</option>
                          {projectTypes.map((t) => (
                            <option key={t} value={t}>{t}</option>
                          ))}
                        </select>
                      </div>
                    </div>

                    {/* Budget */}
                    <div className="space-y-1.5">
                      <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">
                        Budget Range
                      </label>
                      <Input
                        type="text"
                        name="budget"
                        value={formData.budget}
                        onChange={handleChange}
                        placeholder="$5k - $10k"
                        className="w-full h-11 px-3 rounded-xl border border-border text-sm text-foreground bg-background dark:bg-slate-950 focus:border-orange-400 focus:outline-none focus:ring-1 focus:ring-orange-400"
                      />
                    </div>

                    {/* Message */}
                    <div className="space-y-1.5">
                      <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">
                        Message <span className="text-orange-400">*</span>
                      </label>
                      <Textarea
                        name="message"
                        required
                        rows={5}
                        value={formData.message}
                        onChange={handleChange}
                        placeholder="Tell us about your project — goals, timeline, anything that helps us understand what you need."
                        className="rounded-xl border-border focus:border-orange-400 focus:ring-orange-400 text-sm resize-none"
                      />
                    </div>

                    {/* Submit */}
                    <Button
                      type="submit"
                      disabled={!canSubmit}
                      className="w-full h-12 bg-gradient-to-r from-orange-400 to-orange-600 hover:from-orange-500 hover:to-orange-700 text-white font-semibold rounded-xl shadow-md shadow-orange-200 hover:shadow-orange-300 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed text-sm"
                    >
                      {isSubmitting ? (
                        <span className="flex items-center gap-2">
                          <span className="w-4 h-4 rounded-full border-2 border-white border-t-transparent animate-spin" />
                          Sending…
                        </span>
                      ) : (
                        "Send Message"
                      )}
                    </Button>
                  </motion.form>
                )}
              </AnimatePresence>
            </div>
          </motion.div>

          {/* ── Contact info sidebar ── */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-30px" }}
            transition={{ duration: 0.7, delay: 0.25 }}
            className="lg:col-span-2 flex flex-col gap-4"
          >
            {/* Contact cards */}
            {contactMeta.map((item, i) => (
              <motion.div
                key={item.label}
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.3 + i * 0.1 }}
              >
                {item.href ? (
                  <a
                    href={item.href}
                    target={item.href.startsWith("http") ? "_blank" : undefined}
                    rel={item.href.startsWith("http") ? "noopener noreferrer" : undefined}
                    className={`flex items-center gap-4 p-4 sm:p-5 bg-background dark:bg-slate-900 rounded-2xl border ${item.border} hover:shadow-md transition-all duration-300 group`}
                  >
                    <div className={`w-10 h-10 sm:w-11 sm:h-11 rounded-xl ${item.bg} flex items-center justify-center flex-shrink-0`}>
                      <item.icon className={`${item.color} text-base sm:text-lg`} />
                    </div>
                    <div className="min-w-0">
                      <p className="text-[10px] font-semibold text-muted-foreground uppercase tracking-wide mb-0.5">{item.label}</p>
                      <p className={`text-sm font-semibold ${item.color} group-hover:underline underline-offset-2 truncate`}>
                        {item.value}
                      </p>
                    </div>
                  </a>
                ) : (
                  <div className={`flex items-center gap-4 p-4 sm:p-5 bg-background dark:bg-slate-900 rounded-2xl border ${item.border}`}>
                    <div className={`w-10 h-10 sm:w-11 sm:h-11 rounded-xl ${item.bg} flex items-center justify-center flex-shrink-0`}>
                      <item.icon className={`${item.color} text-base sm:text-lg`} />
                    </div>
                    <div>
                      <p className="text-[10px] font-semibold text-muted-foreground uppercase tracking-wide mb-0.5">{item.label}</p>
                      <p className="text-sm font-semibold text-foreground">{item.value}</p>
                    </div>
                  </div>
                )}
              </motion.div>
            ))}

            {/* Office hours */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.6 }}
              className="bg-background dark:bg-slate-900 rounded-2xl border border-border p-5 sm:p-6"
            >
              <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-4">Office Hours</p>
              <div className="space-y-2.5">
                {[
                  { day: "Monday – Friday", time: "9:00 AM – 6:00 PM" },
                  { day: "Saturday", time: "10:00 AM – 4:00 PM" },
                  { day: "Sunday", time: "Closed" },
                ].map((row) => (
                  <div key={row.day} className="flex justify-between items-center">
                    <span className="text-xs sm:text-sm text-gray-500">{row.day}</span>
                    <span className={`text-xs sm:text-sm font-medium ${row.time === "Closed" ? "text-gray-400" : "text-gray-800"}`}>
                      {row.time}
                    </span>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Quick action buttons */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.7 }}
              className="grid grid-cols-2 gap-3"
            >
              <a href="mailto:contact@nexcy.lk" className="block">
                <button className="w-full h-11 flex items-center justify-center gap-2 rounded-xl border border-orange-200 text-orange-500 text-sm font-semibold hover:bg-orange-50 hover:border-orange-400 transition-all duration-200">
                  <FaEnvelope className="text-xs" />
                  Email Us
                </button>
              </a>
              <a href="https://wa.me/94725299199" target="_blank" rel="noopener noreferrer" className="block">
                <button className="w-full h-11 flex items-center justify-center gap-2 rounded-xl bg-green-500 hover:bg-green-600 text-white text-sm font-semibold transition-all duration-200 shadow-sm shadow-green-200">
                  <FaWhatsapp className="text-sm" />
                  WhatsApp
                </button>
              </a>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
