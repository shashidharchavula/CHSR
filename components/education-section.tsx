"use client"
import { useEffect, useState } from "react"
import { motion } from "framer-motion"
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { GraduationCapIcon, CalendarIcon, MapPinIcon, FileTextIcon } from "lucide-react"
import AOS from "aos"
import "aos/dist/aos.css"

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

const EducationSection = () => {
  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: true,
    })
  }, [])

  return (
    <section id="education" className="py-20">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4"
          >
            Academic <span className="text-orange-500">Background</span>
          </motion.h2>
          <div className="w-20 h-1 bg-orange-500 mx-auto rounded-full"></div>
          <p className="mt-4 text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            My educational journey and academic achievements in computer science and data engineering.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {education.map((edu, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.2 }}
              viewport={{ once: true }}
              whileHover={{ scale: 1.02 }}
            >
              <EducationCard education={edu} />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
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

export default EducationSection

