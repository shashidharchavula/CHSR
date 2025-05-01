"use client"
import { useEffect, useRef } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { TypeAnimation } from "react-type-animation"
import { ArrowDownIcon, DownloadIcon, ArrowRightIcon } from "lucide-react"
import Link from "next/link"
import { gsap } from "gsap"

export default function Home() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const particlesRef = useRef<any[]>([])
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!canvasRef.current) return

    const canvas = canvasRef.current
    const ctx = canvas.getContext("2d")

    if (!ctx) return

    const resizeCanvas = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }

    resizeCanvas()
    window.addEventListener("resize", resizeCanvas)

    const createParticles = () => {
      particlesRef.current = []
      const numParticles = Math.floor((canvas.width * canvas.height) / 18000)

      for (let i = 0; i < numParticles; i++) {
        particlesRef.current.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          size: Math.random() * 1.5 + 0.5,
          speedX: Math.random() * 0.6 - 0.3,
          speedY: Math.random() * 0.6 - 0.3,
          color: Math.random() > 0.8 ? "#f97316" : "#e2e8f0",
        })
      }
    }

    createParticles()

    const render = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      particlesRef.current.forEach((particle) => {
        ctx.fillStyle = particle.color
        ctx.beginPath()
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2)
        ctx.fill()

        particle.x += particle.speedX
        particle.y += particle.speedY

        if (particle.x > canvas.width) particle.x = 0
        else if (particle.x < 0) particle.x = canvas.width

        if (particle.y > canvas.height) particle.y = 0
        else if (particle.y < 0) particle.y = canvas.height
      })

      requestAnimationFrame(render)
    }

    render()

    // GSAP animation for the hero content
    if (containerRef.current) {
      const tl = gsap.timeline()
      tl.from(".hero-title", { opacity: 0, y: 30, duration: 0.8, ease: "power3.out" })
        .from(".hero-subtitle", { opacity: 0, y: 20, duration: 0.6, ease: "power3.out" }, "-=0.4")
        .from(".hero-buttons", { opacity: 0, y: 20, duration: 0.6, ease: "power3.out" }, "-=0.3")
        .from(".scroll-indicator", { opacity: 0, y: -10, duration: 0.6, ease: "power3.out" }, "-=0.2")
    }

    return () => window.removeEventListener("resize", resizeCanvas)
  }, [])

  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden" ref={containerRef}>
      <canvas ref={canvasRef} className="absolute inset-0 z-0" aria-hidden="true" />

      <div className="container mx-auto px-4 z-10 mt-16 text-center">
        <div className="max-w-3xl mx-auto">
          <h1 className="hero-title text-5xl md:text-6xl lg:text-7xl font-bold leading-tight text-gray-900 dark:text-white mb-6 font-poppins">
            <span className="text-orange-500">shashidhar chavula</span>
            <br />
            <TypeAnimation
              sequence={["Data Engineer", 2000, "Data Analyst", 2000, "Pipeline Engineer", 2000]}
              wrapper="span"
              speed={40}
              repeat={Number.POSITIVE_INFINITY}
              className="text-4xl md:text-5xl lg:text-6xl"
            />
          </h1>

          <p className="hero-subtitle text-lg md:text-xl text-gray-600 dark:text-gray-300 mb-10 max-w-2xl mx-auto leading-relaxed">
            Transforming complex data challenges into scalable, efficient solutions. Building the infrastructure that
            powers data-driven decisions.
          </p>

          <div className="hero-buttons flex flex-col sm:flex-row gap-6 justify-center">
            <Button
              size="lg"
              className="bg-orange-500 hover:bg-orange-600 text-white shadow-md hover:shadow-lg transition-all group rounded-full px-6"
            >
              <DownloadIcon className="mr-2 h-5 w-5 group-hover:animate-bounce" />
              <a href="/Shashidhar Chavula Resume.pdf" download>
               Show Resume
              </a>
            </Button>

            <Link href="/about" passHref>
              <Button
                size="lg"
                variant="outline"
                className="border-orange-500 text-orange-500 hover:bg-orange-500 hover:text-white transition-all group rounded-full px-6"
              >
                Explore Portfolio
                <ArrowRightIcon className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1 }}
          className="scroll-indicator absolute bottom-10 left-1/2 -translate-x-1/2"
        >
          <Link
            href="/about"
            className="flex flex-col items-center text-gray-500 dark:text-gray-400 hover:text-orange-500 dark:hover:text-orange-400 transition-colors"
          >
            <span className="mb-2 text-sm font-medium">Discover More</span>
            <ArrowDownIcon className="h-6 w-6 animate-bounce" />
          </Link>
        </motion.div>
      </div>
    </div>
  )
}

