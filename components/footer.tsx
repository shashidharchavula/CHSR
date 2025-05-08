"use client"
import { motion } from "framer-motion"
import { ArrowUpIcon, GithubIcon, LinkedinIcon, MailIcon, TwitterIcon, InstagramIcon } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"

const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  return (
    <footer className="bg-gray-900 text-white pt-16 pb-8 relative">
      <div className="container mx-auto px-4">
        <div className="absolute -top-6 left-1/2 -translate-x-1/2">
          <motion.div whileHover={{ y: -5 }} transition={{ type: "spring", stiffness: 400, damping: 10 }}>
            <Button
              onClick={scrollToTop}
              size="icon"
              className="bg-orange-500 hover:bg-orange-600 text-white rounded-full shadow-lg h-12 w-12"
              aria-label="Scroll to top"
            >
              <ArrowUpIcon className="h-6 w-6" />
            </Button>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 mb-10">
          <div className="md:col-span-2">
            <h2 className="text-2xl font-bold mb-4 font-poppins">
              <span className="text-orange-500">Shashidahr</span>Chavula
            </h2>
            <p className="text-gray-400 mb-6 max-w-md leading-relaxed">
              Building robust data pipelines and architectures that turn raw data into valuable insights. Specialized in
              big data technologies and cloud-native solutions.
            </p>
            <div className="flex space-x-4">
              <a href="https://www.linkedin.com/in/shashidhar-reddy-chavula-23b567172/" className="text-gray-400 hover:text-orange-500 transition-colors" aria-label="LinkedIn">
                <LinkedinIcon className="h-6 w-6" />
              </a>
              <a href="https://github.com/shashidharchavula" className="text-gray-400 hover:text-orange-500 transition-colors" aria-label="GitHub">
                <GithubIcon className="h-6 w-6" />
              </a>
              <a href="#" className="text-gray-400 hover:text-orange-500 transition-colors" aria-label="Twitter">
                <TwitterIcon className="h-6 w-6" />
              </a>
              <a
                href="mailto:shashidhar17567@gmail.com"
                className="text-gray-400 hover:text-orange-500 transition-colors"
                aria-label="Email"
              >
                <MailIcon className="h-6 w-6" />
              </a>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4 text-white font-poppins">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/" className="text-gray-400 hover:text-orange-500 transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-gray-400 hover:text-orange-500 transition-colors">
                  About
                </Link>
              </li>
              <li>
                <Link href="/skills" className="text-gray-400 hover:text-orange-500 transition-colors">
                  Skills
                </Link>
              </li>
              <li>
                <Link href="/projects" className="text-gray-400 hover:text-orange-500 transition-colors">
                  Projects
                </Link>
              </li>
              <li>
                <Link href="/experience" className="text-gray-400 hover:text-orange-500 transition-colors">
                  Experience
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-gray-400 hover:text-orange-500 transition-colors">
                  Contact
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 pt-8 mt-8 text-center text-gray-500 text-sm">
          <p>&copy; {new Date().getFullYear()} Data Engineer Portfolio. All rights reserved.</p>
          <p className="mt-2">Built with Next.js, TailwindCSS, and Framer Motion</p>
        </div>
      </div>
    </footer>
  )
}

export default Footer

