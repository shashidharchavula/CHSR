"use client"
import { useEffect, useState } from "react"
import { motion } from "framer-motion"
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { GraduationCapIcon, CalendarIcon, MapPinIcon, FileTextIcon, ArrowRightIcon } from "lucide-react"
import Link from "next/link"
import { gsap } from "gsap"

// Orange theme color
const themeColor = "#f97316"

const education = [
  {
    institution: "Tech University",
    degree: "Master of Science in Computer Science",
    focus: "Specialization in Big Data Systems",
    period: "2014 - 2016",
    location: "Boston, MA",
    achievements: [
      "Thesis: 'Optimizing Distributed Data Processing for Real-time Analytics'",
      "GPA: 3.9/4.0",
      "Teaching Assistant for Database Systems course",
    ],
    color: themeColor,
    certificate: "#",
  },
  {
    institution: "Engineering College",
    degree: "Bachelor of Engineering in Computer Science",
    focus: "Minor in Mathematics and Statistics",
    period: "2010 - 2014",
    location: "Chicago, IL",
    achievements: [
      "Graduated with Honors (Magna Cum Laude)",
      "Senior Project: 'Predictive Analytics for E-commerce Platforms'",
      "President of Data Science Club",
    ],
    color: themeColor,
    certificate: "#",
  },
]

const certifications = [
  {
    name: "AWS Certified Data Analytics",
    issuer: "Amazon Web Services",
    date: "2022",
    icon: "/placeholder.svg?height=40&width=40",
    certificateUrl: "#",
    credentialId: "AWS-DA-12345",
  },
  {
    name: "Databricks Certified Engineer",
    issuer: "Databricks",
    date: "2021",
    icon: "/placeholder.svg?height=40&width=40",
    certificateUrl: "#",
    credentialId: "DB-CE-67890",
  },
  {
    name: "Snowflake SnowPro Core",
    issuer: "Snowflake",
    date: "2020",
    icon: "/placeholder.svg?height=40&width=40",
    certificateUrl: "#",
    credentialId: "SP-CORE-54321",
  },
  {
    name: "Google Professional Data Engineer",
    issuer: "Google Cloud",
    date: "2019",
    icon: "/placeholder.svg?height=40&width=40",
    certificateUrl: "#",
    credentialId: "GCP-PDE-98765",
  },
]

export default function EducationPage() {
  useEffect(() => {
    // GSAP animation for the education content
    gsap.from(".education-header", {
      y: 30,
      opacity: 0,
      duration: 0.8,
      ease: "power3.out",
    })

    gsap.from(".education-card", {
      y: 50,
      opacity: 0,
      duration: 0.8,
      stagger: 0.2,
      ease: "power3.out",
      delay: 0.3,
    })

    gsap.from(".certification-header", {
      y: 30,
      opacity: 0,
      duration: 0.8,
      ease: "power3.out",
      scrollTrigger: {
        trigger: ".certification-section",
        start: "top 80%",
      },
    })

    gsap.from(".certification-card", {
      y: 30,
      opacity: 0,
      duration: 0.6,
      stagger: 0.15,
      ease: "power3.out",
      scrollTrigger: {
        trigger: ".certification-grid",
        start: "top 80%",
      },
    })
  }, [])

  return (
    <div className="min-h-screen pt-24 pb-20 bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-800">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16 education-header">
          <motion.h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
            Academic <span className="text-orange-500">Background</span>
          </motion.h1>
          <div className="w-20 h-1 bg-orange-500 mx-auto rounded-full"></div>
          <p className="mt-6 text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            My educational journey and academic achievements in computer science and data engineering.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {education.map((edu, index) => (
            <motion.div key={index} className="education-card" whileHover={{ scale: 1.02 }}>
              <EducationCard education={edu} />
            </motion.div>
          ))}
        </div>

        <div className="mt-24 certification-section">
          <div className="text-center mb-16 certification-header">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Professional <span className="text-orange-500">Certifications</span>
            </h2>
            <div className="w-20 h-1 bg-orange-500 mx-auto rounded-full"></div>
            <p className="mt-6 text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              Industry-recognized certifications that validate my expertise in data engineering technologies.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto certification-grid">
            {certifications.map((cert, index) => (
              <motion.div
                key={index}
                className="certification-card"
                whileHover={{
                  scale: 1.05,
                  boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
                }}
              >
                <CertificationCard certification={cert} />
              </motion.div>
            ))}
          </div>
        </div>

        <div className="mt-16 text-center">
          <Link href="/dashboard" passHref>
            <Button className="bg-orange-500 hover:bg-orange-600 text-white group">
              View Data Dashboard
              <ArrowRightIcon className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
            </Button>
          </Link>
        </div>
      </div>
    </div>
  )
}

const EducationCard = ({ education }) => {
  const [isHovered, setIsHovered] = useState(false)

  return (
    <Card
      className={`overflow-hidden transition-all duration-300 h-full ${isHovered ? "shadow-lg" : "shadow-md"}`}
      style={{
        background: isHovered ? `linear-gradient(to bottom right, white, ${themeColor}10)` : "",
        borderColor: isHovered ? themeColor : "",
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <CardHeader className="pb-3 relative overflow-hidden">
        <div
          className="absolute top-0 right-0 w-24 h-24 transform translate-x-8 -translate-y-8 rounded-full opacity-10"
          style={{ background: themeColor }}
        ></div>
        <CardTitle className="text-lg font-bold text-gray-800 dark:text-white">{education.degree}</CardTitle>
        <CardDescription className="font-medium flex items-center">
          <GraduationCapIcon className="h-4 w-4 mr-1" />
          {education.institution}
        </CardDescription>
        <div className="flex justify-between items-center mt-2">
          <span className="text-sm text-gray-500 dark:text-gray-400 flex items-center">
            <CalendarIcon className="h-3 w-3 mr-1" />
            {education.period}
          </span>
          <span className="text-xs text-gray-500 dark:text-gray-400 flex items-center">
            <MapPinIcon className="h-3 w-3 mr-1" />
            {education.location}
          </span>
        </div>
      </CardHeader>

      <CardContent className="flex-grow">
        <p className="text-gray-600 dark:text-gray-300 mb-3 text-sm">{education.focus}</p>

        <div className="space-y-2">
          {education.achievements.map((achievement, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 10 }}
              animate={isHovered ? { opacity: 1, y: 0 } : { opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: i * 0.1 }}
              className="flex items-start"
            >
              <span className="mr-2 text-sm text-orange-500">•</span>
              <span className="text-gray-600 dark:text-gray-300 text-sm">{achievement}</span>
            </motion.div>
          ))}
        </div>
      </CardContent>

      <CardFooter className="pt-0 mt-auto">
        <Button
          variant="outline"
          size="sm"
          className="w-full flex items-center justify-center gap-2 mt-2 text-orange-500 border-orange-500 hover:bg-orange-50 dark:hover:bg-orange-900/20"
          asChild
        >
          <a href={education.certificate} target="_blank" rel="noopener noreferrer">
            <FileTextIcon className="h-4 w-4" />
            View Diploma
          </a>
        </Button>
      </CardFooter>
    </Card>
  )
}

const CertificationCard = ({ certification }) => {
  return (
    <Card className="overflow-hidden border-orange-500/10 hover:border-orange-500/30 transition-colors h-full">
      <CardContent className="p-4 flex flex-col h-full">
        <div className="flex items-center gap-4">
          <div className="h-12 w-12 rounded-full bg-orange-100 dark:bg-orange-900/30 flex items-center justify-center flex-shrink-0">
            <GraduationCapIcon className="h-6 w-6 text-orange-500" />
          </div>
          <div className="flex-1">
            <h4 className="font-semibold text-gray-800 dark:text-white text-sm">{certification.name}</h4>
            <div className="flex flex-col mt-1">
              <p className="text-xs text-gray-500 dark:text-gray-400">
                {certification.issuer} • {certification.date}
              </p>
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">ID: {certification.credentialId}</p>
            </div>
          </div>
        </div>
        <div className="mt-3 pt-3 border-t border-gray-100 dark:border-gray-700 flex-grow flex items-end">
          <Button
            variant="outline"
            size="sm"
            className="w-full flex items-center justify-center gap-2 text-orange-500 border-orange-500 hover:bg-orange-50 dark:hover:bg-orange-900/20"
            asChild
          >
            <a href={certification.certificateUrl} target="_blank" rel="noopener noreferrer">
              <FileTextIcon className="h-4 w-4" />
              View Certificate
            </a>
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}

