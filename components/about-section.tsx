"use client"
import { useEffect, useRef } from "react"
import { motion, useInView } from "framer-motion"
import Image from "next/image"
import { Card, CardContent } from "@/components/ui/card"
import AOS from "aos"
import "aos/dist/aos.css"

const techStack = [
  { name: "Apache Spark", icon: "/placeholder.svg?height=40&width=40" },
  { name: "Snowflake", icon: "/placeholder.svg?height=40&width=40" },
  { name: "Kafka", icon: "/placeholder.svg?height=40&width=40" },
  { name: "Python", icon: "/placeholder.svg?height=40&width=40" },
  { name: "SQL", icon: "/placeholder.svg?height=40&width=40" },
  { name: "Airflow", icon: "/placeholder.svg?height=40&width=40" },
  { name: "AWS", icon: "/placeholder.svg?height=40&width=40" },
  { name: "Azure", icon: "/placeholder.svg?height=40&width=40" },
]

const skills = [
  "ETL/ELT Pipeline Development",
  "Data Modeling",
  "Real-time Processing",
  "Cloud Infrastructure",
  "Database Architecture",
  "Performance Optimization",
  "CI/CD for Data Pipelines",
  "Data Governance",
]

const AboutSection = () => {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true })

  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: true,
    })
  }, [])

  return (
    <section id="about" className="py-20 bg-gray-50 dark:bg-gray-800">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4"
          >
            About <span className="text-orange-500">Me</span>
          </motion.h2>
          <div className="w-20 h-1 bg-orange-500 mx-auto rounded-full"></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
          <div data-aos="fade-right">
            <div className="relative w-full max-w-md mx-auto aspect-square rounded-full overflow-hidden shadow-xl border-4 border-orange-500/20">
              <Image src="/placeholder.svg?height=400&width=400" alt="Profile Photo" fill className="object-cover" />
            </div>
          </div>

          <div data-aos="fade-left" className="space-y-6">
            <h3 className="text-2xl font-bold text-gray-800 dark:text-white">Data Engineer</h3>

            <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
              I'm a passionate Data Engineer with expertise in building robust, scalable data pipelines and
              architectures. With a strong foundation in distributed systems and cloud technologies, I help
              organizations transform raw data into valuable insights.
            </p>

            <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
              My approach combines technical excellence with a deep understanding of business needs, ensuring that data
              solutions drive real value and enable data-driven decision making.
            </p>

            <div className="mt-8">
              <h4 className="text-xl font-semibold text-gray-800 dark:text-white mb-4">Core Skills</h4>
              <div className="grid grid-cols-2 gap-3">
                {skills.map((skill, index) => (
                  <div key={index} className="group perspective">
                    <div className="relative transform-style-3d transition-transform duration-500 group-hover:rotate-y-180">
                      <div className="bg-white dark:bg-gray-700 rounded-lg p-3 shadow-md border border-gray-200 dark:border-gray-600 backface-hidden">
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
          </div>
        </div>

        <div ref={ref} className="mt-20">
          <h3 className="text-2xl font-bold text-gray-800 dark:text-white text-center mb-10">
            Tech Stack I <span className="text-orange-500">Love</span>
          </h3>

          <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-4 lg:grid-cols-8 gap-6">
            {techStack.map((tech, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={isInView ? { opacity: 1, scale: 1 } : {}}
                transition={{ duration: 0.3, delay: index * 0.1 }}
                whileHover={{ y: -10 }}
                className="flex flex-col items-center"
              >
                <Card className="w-full h-24 flex items-center justify-center hover:shadow-lg transition-shadow hover:border-orange-500">
                  <CardContent className="p-4 flex flex-col items-center justify-center h-full">
                    <Image
                      src={tech.icon || "/placeholder.svg"}
                      alt={tech.name}
                      width={40}
                      height={40}
                      className="mb-2"
                    />
                    <p className="text-xs text-center text-gray-600 dark:text-gray-300">{tech.name}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

export default AboutSection

