"use client"
import { useState, useEffect } from "react"
import type React from "react"
import { send } from "@emailjs/browser"            // ← EmailJS import

import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { GithubIcon, LinkedinIcon,DownloadIcon, MailIcon, SendIcon } from "lucide-react"
import { gsap } from "gsap"

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  })

  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<null | "success" | "error">(null)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      await send(
        process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID!,
        process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID!,
        formData,
        process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY!
      )
      setSubmitStatus("success")
      setFormData({ name: "", email: "", subject: "", message: "" })
    } catch (error) {
      console.error("EmailJS error:", error)
      setSubmitStatus("error")
    } finally {
      setIsSubmitting(false)
      setTimeout(() => setSubmitStatus(null), 5000)
    }
  }

  useEffect(() => {
    // GSAP animation for the contact content
    gsap.from(".contact-header", {
      y: 30,
      opacity: 0,
      duration: 0.8,
      ease: "power3.out",
    })

    gsap.from(".contact-left", {
      x: -30,
      opacity: 0,
      duration: 0.8,
      ease: "power3.out",
      delay: 0.3,
    })

    gsap.from(".contact-right", {
      x: 30,
      opacity: 0,
      duration: 0.8,
      ease: "power3.out",
      delay: 0.3,
    })

    gsap.from(".social-icon", {
      y: 20,
      opacity: 0,
      duration: 0.5,
      stagger: 0.1,
      ease: "power3.out",
      delay: 0.6,
    })
  }, [])

  return (
    <div className="min-h-screen pt-24 pb-20 bg-gradient-to-b from-orange-50/30 to-white dark:from-gray-900 dark:to-gray-800">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16 contact-header">
          <motion.h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
            Get In <span className="text-orange-500">Touch</span>
          </motion.h1>
          <div className="w-20 h-1 bg-orange-500 mx-auto rounded-full"></div>
          <p className="mt-6 text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Have a project in mind or just want to chat about data engineering? Feel free to reach out!
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 max-w-4xl mx-auto">
          <div className="contact-left space-y-8">
            <div>
              <h3 className="text-2xl font-bold text-gray-800 dark:text-white mb-6">Contact Information</h3>
              <p className="text-gray-600 dark:text-gray-300 mb-8">
                Feel free to reach out through the form or via my social profiles. I'm always open to discussing new
                projects, opportunities, or data engineering concepts.
              </p>

              <div className="space-y-4">
                <div className="flex items-center text-gray-600 dark:text-gray-300 social-icon">
                  <MailIcon className="h-5 w-5 mr-3 text-orange-500" />
                  <a href="mailto:shashidhar17567@gmail.com" className="hover:text-orange-500 transition-colors">
                    shashidhar17567@gmail.com
                  </a>
                </div>

                <div className="flex items-center text-gray-600 dark:text-gray-300 social-icon">
                  <LinkedinIcon className="h-5 w-5 mr-3 text-orange-500" />
                  <a href="https://www.linkedin.com/in/shashidhar-reddy-chavula-23b567172/" className="hover:text-orange-500 transition-colors">
                    linkedin.com/in/shashidhar chavula
                  </a>
                </div>

                <div className="flex items-center text-gray-600 dark:text-gray-300 social-icon">
                  <GithubIcon className="h-5 w-5 mr-3 text-orange-500" />
                  <a href="https://github.com/shashidharchavula" className="hover:text-orange-500 transition-colors">
                    github.com/shashidharchavula
                  </a>
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-4">Resume & CV</h3>
              <p className="text-gray-600 dark:text-gray-300 mb-4">
                Download my complete resume to learn more about my experience and skills.
              </p>
              
              <a href="/shashidhar chavula Resume.pdf" download
              className="inline-flex items-center group">
              <DownloadIcon className="mr-2 h-5 w-5 group-hover:animate-bounce text-orange-500" />  
              <Button className="bg-orange-500 hover:bg-orange-600 text-white">Download Resume</Button>
              </a>
            </div>
          </div>  

          <div className="contact-right">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label htmlFor="name" className="text-gray-700 dark:text-gray-300 font-medium">
                    Your Name
                  </label>
                  <Input
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Your name..."
                    required
                    className="border-gray-300 dark:border-gray-600 focus:border-orange-500 dark:focus:border-orange-500"
                  />
                </div>

                <div className="space-y-2">
                  <label htmlFor="email" className="text-gray-700 dark:text-gray-300 font-medium">
                    Your Email
                  </label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="john@example.com"
                    required
                    className="border-gray-300 dark:border-gray-600 focus:border-orange-500 dark:focus:border-orange-500"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label htmlFor="subject" className="text-gray-700 dark:text-gray-300 font-medium">
                  Subject
                </label>
                <Input
                  id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    placeholder="Project Discussion, Opportunity, etc."
                    required
                    className="border-gray-300 dark:border-gray-600 focus:border-orange-500 dark:focus:border-orange-500"
                  />
              </div>

              <div className="space-y-2">
                <label htmlFor="message" className="text-gray-700 dark:text-gray-300 font-medium">
                  Message
                </label>
                <Textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Your message here..."
                  required
                  className="min-h-32 border-gray-300 dark:border-gray-600 focus:border-orange-500 dark:focus:border-orange-500"
                />
              </div>

              <div>
                {submitStatus === "success" && (
                  <p className="text-green-500 mb-4">Thank you for your message! I'll get back to you soon.</p>
                )}

                {submitStatus === "error" && (
                  <p className="text-red-500 mb-4">There was an error sending your message. Please try again later.</p>
                )}

                <Button
                  type="submit"
                  className="w-full bg-orange-500 hover:bg-orange-600 text-white"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <span className="flex items-center">
                      <svg
                        className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                        ></circle>
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2-647z"
                        ></path>
                      </svg>
                      Sending...
                    </span>
                  ) : (
                    <span className="flex items-center justify-center">
                      <SendIcon className="mr-2 h-4 w-4" />
                      Send Message
                    </span>
                  )}
                </Button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}
