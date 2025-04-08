"use client"
import { useRef, useState } from "react"
import { motion, useInView } from "framer-motion"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { ExternalLinkIcon, GithubIcon, XIcon, ArrowLeftIcon, ArrowRightIcon } from "lucide-react"
import Image from "next/image"

const projects = [
  {
    title: "Real-time IoT Cyberattack Detection",
    description:
      "A streaming data pipeline that processes IoT device data to detect potential cyberattacks in real-time using machine learning.",
    image: "/placeholder.svg?height=300&width=500",
    tags: ["Apache Kafka", "Spark Streaming", "Python", "ML", "AWS"],
    github: "#",
    demo: "#",
    longDescription:
      "This project implements a sophisticated real-time data processing pipeline that ingests data from thousands of IoT devices, processes it through Apache Kafka and Spark Streaming, and applies machine learning models to detect anomalies that could indicate cyberattacks. The system achieves sub-second latency and can scale to handle millions of events per minute.",
    challenges: [
      "Handling high-volume, high-velocity data streams from diverse IoT devices",
      "Implementing ML models that can detect novel attack patterns",
      "Ensuring low latency for real-time threat detection and response",
    ],
    architecture:
      "The architecture follows a lambda pattern with a speed layer for real-time processing and a batch layer for training ML models. Data flows from IoT devices to Kafka topics, then to Spark Streaming for feature extraction and anomaly detection. Alerts are pushed to a notification service while all data is stored in S3 for later batch processing.",
    results:
      "The system successfully reduced false positives by 78% compared to rule-based approaches while maintaining 99.7% detection accuracy. It processes over 50,000 events per second with an average latency of 250ms.",
  },
  {
    title: "Heart Disease Prediction",
    description:
      "A hybrid ML model that combines multiple algorithms to predict heart disease with improved accuracy using patient health data.",
    image: "/placeholder.svg?height=300&width=500",
    tags: ["Python", "Scikit-learn", "Pandas", "TensorFlow", "Docker"],
    github: "#",
    demo: "#",
    longDescription:
      "This project develops an ensemble machine learning model that combines gradient boosting, neural networks, and logistic regression to predict the likelihood of heart disease based on patient health metrics. The hybrid approach achieves higher accuracy than any single model approach.",
    challenges: [
      "Balancing the dataset to address class imbalance issues",
      "Feature engineering to extract meaningful patterns from medical data",
      "Creating an interpretable model that doctors can trust and understand",
    ],
    architecture:
      "The system uses a preprocessing pipeline built with Scikit-learn to handle missing values and normalize features. The ensemble model combines predictions from XGBoost, a custom neural network built with TensorFlow, and a logistic regression model. The entire solution is containerized with Docker for easy deployment.",
    results:
      "The final model achieved 94.2% accuracy, 92.8% sensitivity, and 95.1% specificity on the test dataset, outperforming previous approaches by 7-12%. The model is currently being evaluated for clinical use.",
  },
  {
    title: "MRITS Learning Hub",
    description:
      "A full-stack application for online learning with features like course management, student progress tracking, and content delivery.",
    image: "/placeholder.svg?height=300&width=500",
    tags: ["React", "Node.js", "MongoDB", "Express", "AWS S3"],
    github: "#",
    demo: "#",
    longDescription:
      "MRITS Learning Hub is a comprehensive e-learning platform designed for educational institutions. It features course creation and management tools, interactive learning materials, progress tracking, assessments, and analytics dashboards for instructors and administrators.",
    challenges: [
      "Building a scalable content delivery system for video lectures and materials",
      "Implementing a flexible assessment engine that supports various question types",
      "Creating an intuitive UI that works across devices and connection speeds",
    ],
    architecture:
      "The application uses a MERN stack (MongoDB, Express, React, Node.js) architecture. Content is stored in AWS S3, with CloudFront for distribution. Authentication is handled via JWT, and the system includes real-time features using Socket.io for live sessions and chat.",
    results:
      "The platform currently serves over 5,000 students and 200 instructors, hosting more than 150 courses. Student engagement metrics show a 45% increase in course completion rates compared to the previous system.",
  },
  {
    title: "Sample ETL Pipeline",
    description:
      "A demonstration of a complete ETL pipeline with data extraction from multiple sources, transformation, and loading into a data warehouse.",
    image: "/placeholder.svg?height=300&width=500",
    tags: ["Airflow", "Python", "Snowflake", "dbt", "Docker"],
    github: "#",
    demo: "#",
    longDescription:
      "This project showcases a production-ready ETL pipeline that extracts data from multiple sources (APIs, databases, and file systems), transforms it using a combination of Python and SQL transformations, and loads it into a Snowflake data warehouse with proper dimensional modeling.",
    challenges: [
      "Handling diverse data sources with different schemas and update frequencies",
      "Implementing idempotent transformations for reliable processing",
      "Designing a flexible pipeline that can easily incorporate new data sources",
    ],
    architecture:
      "The pipeline uses Apache Airflow for orchestration, with custom operators for different data sources. Transformations are implemented as a combination of Python processors and dbt models. The entire solution runs in Docker containers and can be deployed to any cloud provider.",
    results:
      "The pipeline processes data from 12 different sources, handling over 50GB of data daily with 99.9% reliability. It reduced data processing time from 8 hours to 45 minutes and improved data quality by implementing comprehensive validation checks.",
  },
]

const ProjectsSection = () => {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.1 })
  const [selectedProject, setSelectedProject] = useState(null)
  const [isDialogOpen, setIsDialogOpen] = useState(false)

  const openProjectDetails = (project) => {
    setSelectedProject(project)
    setIsDialogOpen(true)
  }

  const closeProjectDetails = () => {
    setIsDialogOpen(false)
  }

  const navigateProjects = (direction) => {
    const currentIndex = projects.findIndex((p) => p.title === selectedProject.title)
    let newIndex

    if (direction === "next") {
      newIndex = (currentIndex + 1) % projects.length
    } else {
      newIndex = (currentIndex - 1 + projects.length) % projects.length
    }

    setSelectedProject(projects[newIndex])
  }

  return (
    <section id="projects" className="py-20 bg-gray-50 dark:bg-gray-800">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4"
          >
            Featured <span className="text-orange-500">Projects</span>
          </motion.h2>
          <div className="w-20 h-1 bg-orange-500 mx-auto rounded-full"></div>
          <p className="mt-4 text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            A collection of my most significant data engineering projects, showcasing various technologies and
            solutions.
          </p>
        </div>

        <div ref={ref} className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {projects.map((project, index) => (
            <motion.div
              key={project.title}
              initial={{ opacity: 0, y: 50 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{
                y: -10,
                transition: { duration: 0.2 },
              }}
              className="group perspective"
              onClick={() => openProjectDetails(project)}
            >
              <div className="relative transform-style-3d transition-all duration-500 hover:rotate-y-10 hover:rotate-x-10 cursor-pointer">
                <Card className="overflow-hidden h-full border-orange-500/10 hover:shadow-xl transition-shadow bg-white dark:bg-gray-900">
                  <div className="relative h-60 overflow-hidden">
                    <Image
                      src={project.image || "/placeholder.svg"}
                      alt={project.title}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  </div>

                  <CardContent className="p-6">
                    <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-3">{project.title}</h3>

                    <p className="text-gray-600 dark:text-gray-300 mb-4">{project.description}</p>

                    <div className="flex flex-wrap gap-2 mt-4">
                      {project.tags.map((tag) => (
                        <span
                          key={tag}
                          className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-orange-100 text-orange-800 dark:bg-orange-900/30 dark:text-oxt-orange-200"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </CardContent>

                  <CardFooter className="px-6 py-4 border-t border-gray-200 dark:border-gray-700 flex justify-between">
                    <Button
                      variant="outline"
                      size="sm"
                      className="flex items-center gap-1 text-gray-600 dark:text-gray-300 hover:text-orange-500 dark:hover:text-orange-400"
                      asChild
                      onClick={(e) => e.stopPropagation()}
                    >
                      <a href={project.github} target="_blank" rel="noopener noreferrer">
                        <GithubIcon className="h-4 w-4" />
                        <span>Code</span>
                      </a>
                    </Button>

                    <Button
                      size="sm"
                      className="flex items-center gap-1 bg-orange-500 hover:bg-orange-600 text-white"
                      asChild
                      onClick={(e) => e.stopPropagation()}
                    >
                      <a href={project.demo} target="_blank" rel="noopener noreferrer">
                        <ExternalLinkIcon className="h-4 w-4" />
                        <span>Demo</span>
                      </a>
                    </Button>
                  </CardFooter>
                </Card>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Project Details Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="max-w-4xl w-[90vw] max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <div className="flex items-center justify-between">
              <DialogTitle className="text-2xl font-bold text-gray-900 dark:text-white">
                {selectedProject?.title}
              </DialogTitle>
              <Button variant="ghost" size="icon" onClick={closeProjectDetails}>
                <XIcon className="h-4 w-4" />
              </Button>
            </div>
          </DialogHeader>

          {selectedProject && (
            <div className="mt-4">
              <div className="relative h-64 md:h-80 mb-6 rounded-lg overflow-hidden">
                <Image
                  src={selectedProject.image || "/placeholder.svg"}
                  alt={selectedProject.title}
                  fill
                  className="object-cover"
                />
              </div>

              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-2">Overview</h3>
                  <p className="text-gray-600 dark:text-gray-300">{selectedProject.longDescription}</p>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-2">Challenges</h3>
                  <ul className="list-disc pl-5 space-y-1 text-gray-600 dark:text-gray-300">
                    {selectedProject.challenges.map((challenge, index) => (
                      <li key={index}>{challenge}</li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-2">Architecture</h3>
                  <p className="text-gray-600 dark:text-gray-300">{selectedProject.architecture}</p>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-2">Results</h3>
                  <p className="text-gray-600 dark:text-gray-300">{selectedProject.results}</p>
                </div>

                <div className="flex flex-wrap gap-2 pt-2 border-t border-gray-200 dark:border-gray-700">
                  {selectedProject.tags.map((tag) => (
                    <span
                      key={tag}
                      className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-orange-100 text-orange-800 dark:bg-orange-900/30 dark:text-orange-200"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                <div className="flex justify-between pt-4 border-t border-gray-200 dark:border-gray-700">
                  <Button
                    variant="outline"
                    size="sm"
                    className="flex items-center gap-1"
                    onClick={() => navigateProjects("prev")}
                  >
                    <ArrowLeftIcon className="h-4 w-4" />
                    Previous Project
                  </Button>

                  <div className="flex gap-2">
                    <Button variant="outline" size="sm" className="flex items-center gap-1" asChild>
                      <a href={selectedProject.github} target="_blank" rel="noopener noreferrer">
                        <GithubIcon className="h-4 w-4" />
                        View Code
                      </a>
                    </Button>

                    <Button
                      size="sm"
                      className="flex items-center gap-1 bg-orange-500 hover:bg-orange-600 text-white"
                      asChild
                    >
                      <a href={selectedProject.demo} target="_blank" rel="noopener noreferrer">
                        <ExternalLinkIcon className="h-4 w-4" />
                        Live Demo
                      </a>
                    </Button>
                  </div>

                  <Button
                    variant="outline"
                    size="sm"
                    className="flex items-center gap-1"
                    onClick={() => navigateProjects("next")}
                  >
                    Next Project
                    <ArrowRightIcon className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </section>
  )
}

export default ProjectsSection

