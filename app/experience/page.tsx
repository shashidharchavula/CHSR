"use client"
import { useEffect, useRef } from "react"
import { useState } from "react"

import { motion, useInView, useAnimation } from "framer-motion"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { BriefcaseIcon, CalendarIcon, BuildingIcon, MapPinIcon, ArrowRightIcon } from "lucide-react"
import Link from "next/link"
import { gsap } from "gsap"

// Orange theme color
const themeColor = "#f97316"

const experiences = [
    {
    company: "Mckinsey & Company",
    position: "Jr. Consultant/Data Analyst",
    period: "April  2025 - present",
    location: "FL, USA",
    description:
      "Built robust, real-time data pipelines and analytics solutions enhancing strategic insights.",
    achievements: [
      "Developed ETL pipelines with AWS Glue and PySpark on Azure Databricks, processing 12TB monthly for real-time supply chain analytics.",
      "Built Power BI dashboards integrated with Kafka, significantly reducing decision-making time for multiple client departments.",
      "Automated data validation processes using PySpark, eliminating hundreds of quarterly data quality issues.",
    ],
    technologies: ["AWS Glue", "PySpark", "Azure Databricks", "Apache Kafka, SQL", "Power BI"],
    color: themeColor,
  },
  {
    company: "Florida UniversityInternational",
    position: "Graduate Teaching Assistant",
    period: "August 2023 - December 202024",
    location: "Miami, FL",
    description:
      "Conducted in-depth data analysis and created dashboards to inform strategic decisions.",
    achievements: [
      "Managed 15+ Power BI dashboards, delivering insights into sales performance and customer behavior.",
      "Performed extensive SQL analysis on datasets exceeding 1 million records, facilitating business strategy decisions.",
      "Applied data mining techniques on financial transaction data to uncover key insights and support product development.",
      
    ],
    technologies: [ "SQL Server", "T-SQL", "Power BI", "Data Mining Techniques", "Python"

],
    color: themeColor,
  },
  {
    company: "infosys",
    position: "Data Analyst",
    period: "September 2021 - January 2023",
    location: "Hyderabad, India",
    description: "Developed advanced analytics and automated ETL solutions enhancing data integrity and operational efficiency.",
    achievements: [
      "Automated ETL workflows using Apache Airflow, significantly improving system reliability.",
      "Built predictive analytics models using R for risk assessment and operational planning.",
      "Scaled data infrastructure with AWS Redshift, optimizing performance for workloads over 15 TB.",
    ],
    technologies: [ "Apache Airflow", "AWS Redshift", "R", "SQL", "Python", "VBA", "ArcGIS", "Alation", "Oracle DB"],
    color: themeColor,
  },
  {
    company: "oh-look",
    position: "Data Analyst",
    period: "july 2020 - August 2021",
    location: "Hyderabad, India",
    description:
      "Optimized SQL database performance through query refinement, indexing, and improved data retrieval.",
    achievements: [
      "Automated ETL workflows using Apache Airflow, significantly improving system reliability.",
      "Strengthened PostgreSQL database security with role-based controls, encryption, and compliance measures.",
      "Automated reporting and analytics workflows using Excel macros and Python (Pandas), streamlining operations",
    ],
    technologies: ["PostgreSQL", "SQL", "Python (Pandas)", "Excel (PivotTables, Macros, VLOOKUP)", "Power Query"],
    color: themeColor,
  },
]

export default function ExperiencePage() {
  const controls = useAnimation()
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.2 })
  const headerRef = useRef(null)

  useEffect(() => {
    if (isInView) {
      controls.start("visible")
    }
  }, [controls, isInView])

  useEffect(() => {
    // GSAP animation for the header
    if (headerRef.current) {
      gsap.from(".experience-header", {
        y: 30,
        opacity: 0,
        duration: 0.8,
        ease: "power3.out",
      })
    }
  }, [])

  return (
    <div className="min-h-screen pt-24 pb-20 bg-gradient-to-b from-orange-50/50 to-white dark:from-gray-900 dark:to-gray-800">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16 experience-header" ref={headerRef}>
          <motion.h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
            Work <span className="text-orange-500">Experience</span>
          </motion.h1>
          <div className="w-20 h-1 bg-orange-500 mx-auto rounded-full"></div>
          <p className="mt-6 text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            My professional journey in data engineering and analytics, showcasing my growth and achievements.
          </p>
        </div>

        <div ref={ref} className="relative max-w-4xl mx-auto">
          {/* Timeline line - solid orange */}
          <div className="absolute left-0 top-0 bottom-0 w-1 bg-orange-500 rounded-full ml-6 lg:ml-8"></div>

          {/* Experience items */}
          <div className="space-y-12">
            {experiences.map((exp, index) => (
              <motion.div
                key={index}
                variants={{
                  hidden: { opacity: 0, x: -50 },
                  visible: {
                    opacity: 1,
                    x: 0,
                    transition: {
                      duration: 0.6,
                      delay: index * 0.3,
                      ease: "easeOut",
                    },
                  },
                }}
                initial="hidden"
                animate={controls}
                className="relative pl-16 lg:pl-24"
              >
                {/* Timeline dot */}
                <div
                  className="absolute left-0 w-12 h-12 rounded-full flex items-center justify-center ml-0.5 lg:ml-2.5"
                  style={{ backgroundColor: `${themeColor}20`, border: `2px solid ${themeColor}` }}
                >
                  <BriefcaseIcon className="h-6 w-6 text-orange-500" />
                </div>

                <ExperienceCard experience={exp} index={index} />
              </motion.div>
            ))}
          </div>
        </div>

        <div className="mt-16 text-center">
          <Link href="/education" passHref>
            <Button className="bg-orange-500 hover:bg-orange-600 text-white group">
              View My Education
              <ArrowRightIcon className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
            </Button>
          </Link>
        </div>
      </div>
    </div>
  )
}

const ExperienceCard = ({ experience, index }) => {
  const [isHovered, setIsHovered] = useState(false)

  return (
    <Card
      className={`border-l-4 hover:shadow-xl transition-all duration-300 ${isHovered ? "translate-y-[-5px]" : ""}`}
      style={{ borderLeftColor: themeColor }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <CardHeader className="pb-2">
        <div className="flex justify-between items-start flex-wrap">
          <div>
            <CardTitle className="text-xl font-bold text-gray-800 dark:text-white flex items-center">
              {experience.position}
            </CardTitle>
            <CardDescription className="font-medium mt-1 flex items-center">
              <BuildingIcon className="h-4 w-4 mr-1" />
              {experience.company}
            </CardDescription>
          </div>
          <div className="flex flex-col items-end">
            <span className="text-sm font-medium text-gray-500 dark:text-gray-400 bg-gray-100 dark:bg-gray-700 px-3 py-1 rounded-full flex items-center">
              <CalendarIcon className="h-3 w-3 mr-1" />
              {experience.period}
            </span>
            <span className="text-xs text-gray-500 dark:text-gray-400 mt-1 flex items-center">
              <MapPinIcon className="h-3 w-3 mr-1" />
              {experience.location}
            </span>
          </div>
        </div>
      </CardHeader>

      <CardContent>
        <p className="text-gray-600 dark:text-gray-300 mb-4">{experience.description}</p>

        <div className="space-y-2 mb-4">
          {experience.achievements.map((achievement, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -20 }}
              animate={isHovered ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.3, delay: i * 0.1 }}
              className="flex items-start"
            >
              <span className="text-orange-500 mr-2 mt-1">•</span>
              <span className="text-gray-600 dark:text-gray-300">{achievement}</span>
            </motion.div>
          ))}
        </div>

        <div className="flex flex-wrap gap-2 mt-4">
          {experience.technologies.map((tech, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0 }}
              animate={isHovered ? { opacity: 1, scale: 1 } : { opacity: 1, scale: 1 }}
              transition={{ duration: 0.3, delay: i * 0.05 + 0.2 }}
            >
              <Badge
                variant="outline"
                className="bg-orange-50 text-orange-700 border-orange-200 dark:bg-orange-900/20 dark:text-orange-300 dark:border-orange-800/30"
              >
                {tech}
              </Badge>
            </motion.div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}

