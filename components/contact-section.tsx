"use client"
import { useState } from "react"
import type React from "react"

import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { GithubIcon, LinkedinIcon, MailIcon, SendIcon } from "lucide-react"

const ContactSection = () => {
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

    // In a real application, you would integrate EmailJS or similar here
    setIsSubmitting(true)

    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false)
      setSubmitStatus("success")
      setFormData({ name: "", email: "", subject: "", message: "" })

      // Reset status after 5 seconds
      setTimeout(() => setSubmitStatus(null), 5000)
    }, 1500)
  }

  return (
    <section id="contact" className="py-20 bg-gray-50 dark:bg-gray-800">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4"
          >
            Get In <span className="text-orange-500">Touch</span>
          </motion.h2>
          <div className="w-20 h-1 bg-orange-500 mx-auto rounded-full"></div>
          <p className="mt-4 text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Have a project in mind or just want to chat about data engineering? Feel free to reach out!
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="space-y-8"
          >
            <div>
              <h3 className="text-2xl font-bold text-gray-800 dark:text-white mb-6">Contact Information</h3>
              <p className="text-gray-600 dark:text-gray-300 mb-8">
                Feel free to reach out through the form or via my social profiles. I'm always open to discussing new
                projects, opportunities, or data engineering concepts.
              </p>

              <div className="space-y-4">
                <div className="flex items-center text-gray-600 dark:text-gray-300">
                  <MailIcon className="h-5 w-5 mr-3 text-orange-500" />
                  <a href="mailto:contact@dataengineer.com" className="hover:text-orange-500 transition-colors">
                    contact@dataengineer.com
                  </a>
                </div>

                <div className="flex items-center text-gray-600 dark:text-gray-300">
                  <LinkedinIcon className="h-5 w-5 mr-3 text-orange-500" />
                  <a href="#" className="hover:text-orange-500 transition-colors">
                    linkedin.com/in/dataengineer
                  </a>
                </div>

                <div className="flex items-center text-gray-600 dark:text-gray-300">
                  <GithubIcon className="h-5 w-5 mr-3 text-orange-500" />
                  <a href="#" className="hover:text-orange-500 transition-colors">
                    github.com/dataengineer
                  </a>
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-4">Resume & CV</h3>
              <p className="text-gray-600 dark:text-gray-300 mb-4">
                Download my complete resume to learn more about my experience and skills.
              </p>
              <Button className="bg-orange-500 hover:bg-orange-600 text-white">Download Resume</Button>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
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
                    placeholder="John Doe"
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
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
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
          </motion.div>
        </div>
      </div>
    </section>
  )
}

export default ContactSection

