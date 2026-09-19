"use client"

import type React from "react"
import { useState } from "react"
import { motion, AnimatePresence, useReducedMotion } from "framer-motion"
import { useToast } from "@/hooks/use-toast"
import { SectionLabel } from "@/components/ui/section-label"

const projectTypes = [
  "WEB DEVELOPMENT",
  "MOBILE APP",
  "ERP / POS SYSTEM",
  "AI / ML SOLUTION",
  "IOT DEVELOPMENT",
  "OTHER",
]

export function Contact() {
  const shouldReduceMotion = useReducedMotion()
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

  const inputClasses = "w-full bg-surface border border-border text-foreground px-4 py-3 text-sm focus:outline-none focus:border-accent rounded-sm transition-colors font-mono focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-background"

  return (
    <section id="contact" className="py-24 sm:py-32 relative z-10 border-t border-border">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <SectionLabel>05 // INITIATE_CONTACT</SectionLabel>

        <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 mt-16">
          {/* Information Side */}
          <div>
            <h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-6">
              START A PROJECT
            </h2>
            <p className="text-muted text-base max-w-md mb-12">
              Have an idea or a technical challenge? Send us a message and we'll get back to you with a tactical response within 24 hours.
            </p>

            <div className="space-y-12">
              <div>
                <h3 className="text-xs font-mono text-muted uppercase tracking-widest mb-4 flex items-center gap-2">
                  <span className="w-2 h-2 bg-accent rounded-sm inline-block"></span>
                  Direct Lines
                </h3>
                <div className="space-y-4">
                  <div>
                    <a href="mailto:contact@nexcy.lk" className="text-foreground hover:text-accent font-mono transition-colors">
                      contact@nexcy.lk
                    </a>
                  </div>
                  <div>
                    <a href="https://wa.me/94769484049" target="_blank" rel="noopener noreferrer" className="text-foreground hover:text-accent font-mono transition-colors">
                      +94 76 948 4049
                    </a>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-xs font-mono text-muted uppercase tracking-widest mb-4 flex items-center gap-2">
                  <span className="w-2 h-2 bg-border rounded-sm inline-block"></span>
                  Operating Hours
                </h3>
                <div className="font-mono text-sm border border-border bg-surface p-4 rounded-sm">
                  <div className="flex justify-between py-2 border-b border-border/50">
                    <span className="text-muted">MON-FRI</span>
                    <span className="text-foreground">09:00 - 18:00</span>
                  </div>
                  <div className="flex justify-between py-2 border-b border-border/50">
                    <span className="text-muted">SAT</span>
                    <span className="text-foreground">10:00 - 16:00</span>
                  </div>
                  <div className="flex justify-between py-2">
                    <span className="text-muted">SUN</span>
                    <span className="text-muted">OFFLINE</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Form Side */}
          <div className="bg-surface/50 border border-border p-6 sm:p-8 rounded-sm">
            <AnimatePresence mode="wait">
              {isSuccess ? (
                <motion.div
                  key="success"
                  initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={shouldReduceMotion ? { duration: 0 } : undefined}
                  className="flex flex-col items-center justify-center py-24 text-center h-full"
                >
                  <div className="w-12 h-12 border border-accent bg-accent/10 text-accent flex items-center justify-center mb-6 font-mono text-xl rounded-sm">
                    ✓
                  </div>
                  <h3 className="text-xl font-bold mb-2">TRANSMISSION SUCCESSFUL</h3>
                  <p className="text-muted font-mono text-sm">We'll get back to you within 24 hours.</p>
                </motion.div>
              ) : (
                <motion.form
                  key="form"
                  onSubmit={handleSubmit}
                  initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={shouldReduceMotion ? { duration: 0 } : undefined}
                  className="space-y-6"
                >
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-xs font-mono text-muted uppercase tracking-wider">
                        Name <span className="text-accent">*</span>
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.name}
                        onChange={(e) => set("name", e.target.value)}
                        className={inputClasses}
                        placeholder="IDENTIFIER"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-xs font-mono text-muted uppercase tracking-wider">
                        Email <span className="text-accent">*</span>
                      </label>
                      <input
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) => set("email", e.target.value)}
                        className={inputClasses}
                        placeholder="COMM_LINK@SYS.COM"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-xs font-mono text-muted uppercase tracking-wider">
                      Phone
                    </label>
                    <input
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => set("phone", e.target.value)}
                      className={inputClasses}
                      placeholder="+94 XX XXX XXXX"
                    />
                  </div>

                  <div className="space-y-3">
                    <label className="text-xs font-mono text-muted uppercase tracking-wider block">
                      Project Classification
                    </label>
                    <div className="flex flex-wrap gap-2">
                      {projectTypes.map((t) => (
                        <button
                          key={t}
                          type="button"
                          onClick={() => set("project", t)}
                          className={`px-3 py-1.5 text-xs font-mono uppercase rounded-sm border transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-background active:scale-[0.98] ${
                            formData.project === t
                              ? "border-accent bg-accent/10 text-accent"
                              : "border-border bg-surface text-muted hover:border-muted"
                          }`}
                        >
                          {t}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-xs font-mono text-muted uppercase tracking-wider">
                      Message <span className="text-accent">*</span>
                    </label>
                    <textarea
                      required
                      rows={5}
                      value={formData.message}
                      onChange={(e) => set("message", e.target.value)}
                      className={`${inputClasses} resize-none`}
                      placeholder="ENTER_TRANSMISSION_DATA..."
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={!canSubmit}
                    className="w-full bg-foreground text-background font-mono font-bold uppercase tracking-widest py-4 rounded-sm hover:bg-accent hover:text-[#0A0A0A] active:bg-accent active:text-[#0A0A0A] transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-background active:scale-[0.99]"
                  >
                    {isSubmitting ? (
                      <>
                        <span className="w-4 h-4 border-2 border-background/20 border-t-background rounded-full animate-spin"></span>
                        TRANSMITTING...
                      </>
                    ) : (
                      "INITIALIZE TRANSMISSION"
                    )}
                  </button>
                </motion.form>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  )
}
