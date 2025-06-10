"use client"
import { useEffect, useRef } from "react"
import { motion, useInView } from "framer-motion"
import Image from "next/image"
import Link from "next/link"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ArrowRightIcon } from "lucide-react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

const techStack = [
  { name: "Apache Spark", icon: "/apache spark.png" },
  { name: "Snowflake", icon: "/snowflake.png" },
  { name: "Kafka", icon: "/kafka.png" },
  { name: "Tableau", icon: "/tableau.png" },
  { name: "databricks", icon: "/databricks.png" },
  { name: "Airflow", icon: "airflow.png" },
  { name: "scala", icon: "scala.png" },
  { name: "Power BI", icon: "powerbi.png"},
  { name: "redshift", icon: "/redshift.png?height=40&width=40" },
]

const skills = [
  "ETL Pipeline Development",
  "Real-time Data Processing ",
  "Data Validation & Quality Assurance",
  "Data Visualization",
  "Cloud Analytics Infrastructure",
  "SQL Query Optimization",
  "Predictive Modeling",
  "Data Governance"
]

export default function AboutPage() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true })
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    // Register ScrollTrigger
    gsap.registerPlugin(ScrollTrigger)

    // GSAP animation for the about content
    if (containerRef.current) {
      const tl = gsap.timeline()
      tl.from(".about-title", { opacity: 0, y: 30, duration: 0.8, ease: "power3.out" })
        .from(".about-line", { scaleX: 0, duration: 0.8, ease: "power3.out" }, "-=0.6")
        .from(".about-description", { opacity: 0, y: 20, duration: 0.8, ease: "power3.out" }, "-=0.6")
    }

    // Animate profile image
    gsap.from(".profile-image", {
      scale: 0.9,
      opacity: 0,
      duration: 1,
      ease: "power3.out",
      delay: 0.3,
    })

    // Animate bio section
    gsap.from(".bio-section", {
      x: 50,
      opacity: 0,
      duration: 0.8,
      ease: "power3.out",
      delay: 0.5,
    })

    // Animate tech stack
    gsap.from(".tech-stack-item", {
      y: 30,
      opacity: 0,
      duration: 0.6,
      stagger: 0.1,
      ease: "power3.out",
      scrollTrigger: {
        trigger: ".tech-stack",
        start: "top 80%",
      },
    })
  }, [])

  return (
    <div className="min-h-screen pt-24 pb-20" ref={containerRef}>
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h1 className="about-title text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4 font-poppins">
            About <span className="text-orange-500">Me</span>
          </h1>
          <div className="about-line w-20 h-1 bg-orange-500 mx-auto rounded-full transform origin-center"></div>
          <p className="about-description mt-6 text-gray-600 dark:text-gray-300 max-w-2xl mx-auto leading-relaxed">
            A seasoned data Analyst with expertise in building scalable data infrastructure and pipelines that
            transform raw data into actionable insights.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
          <div className="profile-image">
            <div className="relative w-full max-w-md mx-auto aspect-square rounded-2xl overflow-hidden shadow-xl">
              <Image
                src="/shashidhar.jpg?height=400&width=400"
                alt="Profile Photo"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 400px"
              />

              {/* Decorative elements */}
              <div className="absolute -top-6 -right-6 w-24 h-24 bg-orange-500/10 rounded-full"></div>
              <div className="absolute -bottom-6 -left-6 w-16 h-16 bg-orange-500/10 rounded-full"></div>

              {/* Experience badge */}
              <div className="absolute top-4 right-4 bg-orange-500 text-white px-3 py-1 rounded-full text-sm font-medium shadow-md">
                4+ Years Experience
              </div>
            </div>
          </div>

          <div className="bio-section space-y-8">
            <h2 className="text-3xl font-bold text-gray-800 dark:text-white font-poppins">
              Data Analyst
            </h2>

            <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
              I'm a passionate Data Analyst with expertise in building robust, scalable data dashboards, pipelines and
              architectures. With a strong foundation in distributed systems and cloud technologies, I help
              organizations transform raw data into valuable insights.
            </p>

            <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
              My approach combines technical excellence with a deep understanding of business needs, ensuring that data
              solutions drive real value and enable data-driven decision making across the organization.
            </p>

            <div className="mt-8">
              <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-4 font-poppins">Core Skills</h3>
              <div className="grid grid-cols-2 gap-3">
                {skills.map((skill, index) => (
                  <div key={index} className="group perspective">
                    <div className="relative transform-style-3d transition-transform duration-500 group-hover:rotate-y-180">
                      <div className="bg-white dark:bg-gray-800 rounded-lg p-3 shadow-sm border border-gray-100 dark:border-gray-700 backface-hidden">
                        <span className="text-gray-700 dark:text-gray-200 text-sm">{skill}</span>
                      </div>
                      <div className="absolute inset-0 bg-orange-500 rounded-lg p-3 shadow-md text-white rotate-y-180 backface-hidden flex items-center justify-center">
                        <span className="text-sm font-medium">Expert</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="pt-4">
              <Link href="/skills" passHref>
                <Button className="bg-orange-500 hover:bg-orange-600 text-white group rounded-full px-6">
                  View My Skills
                  <ArrowRightIcon className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
            </div>
          </div>
        </div>

        <div ref={ref} className="mt-24 tech-stack">
          <h2 className="text-3xl font-bold text-gray-800 dark:text-white text-center mb-12 font-poppins">
            Tech Stack I <span className="text-orange-500">Specialize In</span>
          </h2>

          <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-4 lg:grid-cols-8 gap-6">
            {techStack.map((tech, index) => (
              <motion.div
                key={index}
                className="tech-stack-item flex flex-col items-center"
                whileHover={{ y: -10, transition: { duration: 0.2 } }}
              >
                <Card className="w-full h-24 flex items-center justify-center hover:shadow-md transition-shadow hover:border-orange-500/50 bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700">
                  <CardContent className="p-4 flex flex-col items-center justify-center h-full">
                    <Image
                      src={tech.icon || "/placeholder.svg"}
                      alt={tech.name}
                      width={40}
                      height={40}
                      className="mb-2"
                    />
                    <p className="text-xs text-center text-gray-600 dark:text-gray-300 font-medium">{tech.name}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>

        <div className="mt-20 text-center">
          <Link href="/skills" passHref>
            <Button
              variant="outline"
              className="border-orange-500 text-orange-500 hover:bg-orange-500 hover:text-white transition-all group rounded-full px-6"
            >
              Explore My Skills
              <ArrowRightIcon className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
            </Button>
          </Link>
        </div>
      </div>
    </div>
  )
}

