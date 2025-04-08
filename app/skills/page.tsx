"use client"
import { useEffect, useState } from "react"
import { motion } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ArrowRightIcon } from "lucide-react"
import Link from "next/link"
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer } from "recharts"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

const skillCategories = [
  {
    name: "Languages",
    skills: [
      { name: "SQL", level: 95 },
      { name: "Python", level: 90 },
      { name: "Scala", level: 80 },
      { name: "Bash", level: 75 },
    ],
    radarData: [
      { subject: "SQL", A: 95, fullMark: 100 },
      { subject: "Python", A: 90, fullMark: 100 },
      { subject: "Scala", A: 80, fullMark: 100 },
      { subject: "Bash", A: 75, fullMark: 100 },
    ],
  },
  {
    name: "Frameworks",
    skills: [
      { name: "PySpark", level: 90 },
      { name: "DBT", level: 85 },
      { name: "Pandas", level: 90 },
      { name: "NumPy", level: 85 },
    ],
    radarData: [
      { subject: "PySpark", A: 90, fullMark: 100 },
      { subject: "DBT", A: 85, fullMark: 100 },
      { subject: "Pandas", A: 90, fullMark: 100 },
      { subject: "NumPy", A: 85, fullMark: 100 },
    ],
  },
  {
    name: "Databases",
    skills: [
      { name: "PostgreSQL", level: 90 },
      { name: "Snowflake", level: 85 },
      { name: "MongoDB", level: 80 },
      { name: "BigQuery", level: 75 },
    ],
    radarData: [
      { subject: "PostgreSQL", A: 90, fullMark: 100 },
      { subject: "Snowflake", A: 85, fullMark: 100 },
      { subject: "MongoDB", A: 80, fullMark: 100 },
      { subject: "BigQuery", A: 75, fullMark: 100 },
    ],
  },
  {
    name: "Tools",
    skills: [
      { name: "Airflow", level: 90 },
      { name: "Kafka", level: 85 },
      { name: "Terraform", level: 80 },
      { name: "Git", level: 90 },
    ],
    radarData: [
      { subject: "Airflow", A: 90, fullMark: 100 },
      { subject: "Kafka", A: 85, fullMark: 100 },
      { subject: "Terraform", A: 80, fullMark: 100 },
      { subject: "Git", A: 90, fullMark: 100 },
    ],
  },
  {
    name: "Cloud",
    skills: [
      { name: "AWS", level: 90 },
      { name: "Azure", level: 85 },
      { name: "GCP", level: 75 },
      { name: "Docker", level: 85 },
    ],
    radarData: [
      { subject: "AWS", A: 90, fullMark: 100 },
      { subject: "Azure", A: 85, fullMark: 100 },
      { subject: "GCP", A: 75, fullMark: 100 },
      { subject: "Docker", A: 85, fullMark: 100 },
    ],
  },
]

export default function SkillsPage() {
  useEffect(() => {
    // Register ScrollTrigger
    gsap.registerPlugin(ScrollTrigger)

    // Staggered animation for skill cards
    gsap.from(".skill-card", {
      y: 30,
      opacity: 0,
      duration: 0.6,
      stagger: 0.15,
      ease: "power3.out",
      scrollTrigger: {
        trigger: ".skills-grid",
        start: "top 80%",
      },
    })

    // Animate the header
    gsap.from(".skills-header", {
      y: 30,
      opacity: 0,
      duration: 0.8,
      ease: "power3.out",
    })
  }, [])

  return (
    <div className="min-h-screen pt-24 pb-20 bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-800">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16 skills-header">
          <motion.h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4 font-poppins">
            Skills & <span className="text-orange-500">Expertise</span>
          </motion.h1>
          <div className="w-20 h-1 bg-orange-500 mx-auto rounded-full"></div>
          <p className="mt-6 text-gray-600 dark:text-gray-300 max-w-2xl mx-auto leading-relaxed">
            My technical proficiency spans across various technologies and tools in the data engineering ecosystem.
            Hover over each card to see a different visualization of my skills.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 skills-grid">
          {skillCategories.map((category, categoryIndex) => (
            <SkillCard key={category.name} category={category} index={categoryIndex} />
          ))}
        </div>

        <div className="mt-20 text-center">
          <Link href="/projects" passHref>
            <Button className="bg-orange-500 hover:bg-orange-600 text-white group rounded-full px-6">
              View My Projects
              <ArrowRightIcon className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
            </Button>
          </Link>
        </div>
      </div>
    </div>
  )
}

const SkillCard = ({ category, index }) => {
  const [isFlipped, setIsFlipped] = useState(false)

  return (
    <motion.div
      className="skill-card perspective h-[400px] w-full"
      whileHover={{ scale: 1.02 }}
      transition={{ type: "spring", stiffness: 300 }}
    >
      <div
        className={`relative w-full h-full transform-style-3d transition-all duration-700 ease-in-out ${isFlipped ? "rotate-y-180" : ""}`}
        onMouseEnter={() => setIsFlipped(true)}
        onMouseLeave={() => setIsFlipped(false)}
      >
        {/* Front of card (Bar chart) */}
        <Card className="absolute inset-0 backface-hidden overflow-hidden transition-all duration-300 hover:shadow-md border border-gray-100 dark:border-gray-700 bg-white dark:bg-gray-800">
          <CardContent className="p-6 h-full">
            <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-6 flex items-center justify-between font-poppins">
              {category.name}
              <span className="text-xs text-gray-500 dark:text-gray-400">Hover to flip</span>
            </h3>

            <div className="space-y-5">
              {category.skills.map((skill, skillIndex) => (
                <div key={skill.name}>
                  <div className="flex justify-between mb-1">
                    <span className="text-sm font-medium text-gray-700 dark:text-gray-300">{skill.name}</span>
                    <span className="text-sm font-medium text-gray-500 dark:text-gray-400">{skill.level}%</span>
                  </div>
                  <div className="h-2 bg-gray-100 dark:bg-gray-700 rounded-full overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      whileInView={{ width: `${skill.level}%` }}
                      transition={{ duration: 0.8, delay: 0.1 * skillIndex }}
                      viewport={{ once: true }}
                      className="h-full bg-orange-500 rounded-full"
                    />
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-6 flex flex-wrap gap-2">
              {category.skills.map((skill) => (
                <span
                  key={skill.name}
                  className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-orange-100 text-orange-800 dark:bg-orange-900/20 dark:text-orange-200"
                >
                  {skill.name}
                </span>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Back of card (Radar chart) */}
        <Card className="absolute inset-0 backface-hidden rotate-y-180 overflow-hidden transition-all duration-300 hover:shadow-md border border-gray-100 dark:border-gray-700 bg-white dark:bg-gray-800">
          <CardContent className="p-6 h-full flex flex-col">
            <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-2 flex items-center justify-between font-poppins">
              {category.name} Proficiency
              <span className="text-xs text-gray-500 dark:text-gray-400">Hover to flip back</span>
            </h3>

            <div className="flex-1 flex items-center justify-center">
              <ResponsiveContainer width="100%" height={250}>
                <RadarChart cx="50%" cy="50%" outerRadius="80%" data={category.radarData}>
                  <PolarGrid stroke="#d1d5db" />
                  <PolarAngleAxis dataKey="subject" tick={{ fill: "#6b7280", fontSize: 12 }} />
                  <PolarRadiusAxis angle={30} domain={[0, 100]} tick={{ fill: "#6b7280" }} />
                  <Radar
                    name={category.name}
                    dataKey="A"
                    stroke="#f97316"
                    fill="#f97316"
                    fillOpacity={0.6}
                    animationBegin={0}
                    animationDuration={1500}
                    animationEasing="ease-out"
                  />
                </RadarChart>
              </ResponsiveContainer>
            </div>

            <p className="text-sm text-gray-600 dark:text-gray-300 text-center mt-4">
              Visualizing skill proficiency across {category.name.toLowerCase()} technologies
            </p>
          </CardContent>
        </Card>
      </div>
    </motion.div>
  )
}

