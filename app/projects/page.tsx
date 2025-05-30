"use client"
import { useRef, useState, useEffect } from "react"
import { motion, useInView } from "framer-motion"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { ExternalLinkIcon, GithubIcon, XIcon, ArrowLeftIcon, ArrowRightIcon, ArrowUpRightIcon } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

const projects = [
  {
    title: "Heart Disease Prediction Model",
    description:
      "LightGBM model with 95% accuracy deployed via a JavaScript/HTML web app",
    image: "/HDF.GIF?height=300&width=500",
    tags: ["Machine Learning", "LightGBM", "JavaScript", "HTML"],
    github: "https://github.com/shashidharchavula/HDF",
    demo: "#",
    longDescription:
      "Developed a heart disease prediction model using LightGBM that achieved 95% accuracy. The model was deployed as a web application using JavaScript and HTML, making it accessible to healthcare professionals. This project was presented at the IEEE International Conference on Inventive Research in Computing Applications.",
    challenges: [
      "95% prediction accuracy",
      "IEEE conference presentation",
      "Web-based deployment for easy access",
      "Integration with existing healthcare systems",
    ],
    architecture:
      "The system uses a preprocessing pipeline built with Scikit-learn to handle missing values and normalize features. The ensemble model combines predictions from XGBoost, a custom neural network built with TensorFlow, and a logistic regression model. The entire solution is containerized with Docker for easy deployment.",
    results:
      "The final model achieved 94.2% accuracy, 92.8% sensitivity, and 95.1% specificity on the test dataset, outperforming previous approaches by 7-12%. The model is currently being evaluated for clinical use.",
  },
  {
    title: "Medical Claims Fraud Detection",
    description:
      "Use anomaly detection, clustering, or classification algorithms to flag suspicious claims based on patterns in the data",
    image: "/mfd.jpg?height=300&width=500",
    tags: ["Anomaly Detection", "Machine Learning", "Matplotlib", "Seaborn", "Clustering", "Fraud Detection", "GitHub Pages"],
    github: "https://github.com/shashidharchavula/Medical-claims-fraud-detection",
    demo: "https://shashidharchavula.github.io/dashboard/",
    longDescription:
      "This project simulates a medical claims fraud detection system by generating synthetic data and applying multiple machine learning techniques—supervised classification (Random Forest), unsupervised anomaly detection (Isolation Forest), and clustering (DBSCAN)—to identify potentially fraudulent claims. The analysis is visualized with automatically generated plots (confusion matrix, ROC curve, clustering plots), which are integrated into an interactive HTML dashboard and deployed live on GitHub Pages",
    challenges: [
      "Real-time data collection and processing",
      "Autonomous navigation capabilities",
      "Cloud-based monitoring and control",
      "Scalable IoT architecture",
    ],
    architecture:
      "The system uses a preprocessing pipeline built with Scikit-learn to handle missing values and normalize features. The ensemble model combines predictions from XGBoost, a custom neural network built with TensorFlow, and a logistic regression model. The entire solution is containerized with Docker for easy deployment.",
    results:
      "The final model achieved 94.2% accuracy, 92.8% sensitivity, and 95.1% specificity on the test dataset, outperforming previous approaches by 7-12%. The model is currently being evaluated for clinical use.",
  },
  {
    title: "customer-segmentation",
    description:
      "K-means clustering model to identify customer segments for targeted marketing",
    image: "/plot.jpg?height=400&width=600",
    tags: ["Machine Learning", "K-means", "Customer Analytics"],
    github: "https://github.com/example/customer-segmentation",
    demo: "#",
    longDescription:
      "Developed a customer segmentation analysis using K-means clustering to identify distinct customer segments based on purchasing behavior, demographics, and engagement metrics. The insights were used to create targeted marketing campaigns that increased conversion rates by 20%.",
    challenges: [
      "Identified 5 distinct customer segments",
      "20% increase in marketing conversion rates",
      "15% improvement in customer retention",
      "Data-driven personalization strategy",
    ],
    architecture:
      "The application uses a MERN stack (MongoDB, Express, React, Node.js) architecture. Content is stored in AWS S3, with CloudFront for distribution. Authentication is handled via JWT, and the system includes real-time features using Socket.io for live sessions and chat.",
    results:
      "The platform currently serves over 5,000 students and 200 instructors, hosting more than 150 courses. Student engagement metrics show a 45% increase in course completion rates compared to the previous system.",
  },
  {
    title: "Real-time Fraud Detection System",
    description:
      "Machine learning model to detect fraudulent transactions in real-time",
    image: "/FD.jpg?height=400&width=600",
    tags: ["Machine Learning", "Real-time Processing", "Fraud Detection"],
    github: "#",
    demo: "/fraud.pdf",
    longDescription:
      "Built a real-time fraud detection system using machine learning algorithms to identify suspicious transactions as they occur. The system processes millions of transactions daily with a false positive rate of less than 0.1%, saving the company an estimated $2M annually in fraud prevention.",
    challenges: [
      "99.5% detection accuracy",
      "$2M annual savings in fraud prevention",
      "Real-time processing of 1000+ transactions per second",
      "Less than 0.1% false positive rate",
    ],
    architecture:
      "The pipeline uses Apache Airflow for orchestration, with custom operators for different data sources. Transformations are implemented as a combination of Python processors and dbt models. The entire solution runs in Docker containers and can be deployed to any cloud provider.",
    results:
      "The pipeline processes data from 12 different sources, handling over 50GB of data daily with 99.9% reliability. It reduced data processing time from 8 hours to 45 minutes and improved data quality by implementing comprehensive validation checks.",
  },
]

export default function ProjectsPage() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.1 })
  const [selectedProject, setSelectedProject] = useState(null)
  const [isDialogOpen, setIsDialogOpen] = useState(false)

  useEffect(() => {
    // Register ScrollTrigger
    gsap.registerPlugin(ScrollTrigger)

    // GSAP animation for the projects header
    gsap.from(".projects-header", {
      y: 30,
      opacity: 0,
      duration: 0.8,
      ease: "power3.out",
    })

    // Staggered animation for project cards
    gsap.from(".project-card", {
      y: 50,
      opacity: 0,
      duration: 0.8,
      stagger: 0.2,
      ease: "power3.out",
      scrollTrigger: {
        trigger: ".projects-grid",
        start: "top 80%",
      },
    })
  }, [])

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
    <div className="min-h-screen pt-24 pb-20 bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-800">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16 projects-header">
          <motion.h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4 font-poppins">
            Featured <span className="text-orange-500">Projects</span>
          </motion.h1>
          <div className="w-20 h-1 bg-orange-500 mx-auto rounded-full"></div>
          <p className="mt-6 text-gray-600 dark:text-gray-300 max-w-2xl mx-auto leading-relaxed">
            A collection of my most significant data engineering projects, showcasing various technologies and
            solutions. Click on any project to learn more.
          </p>
        </div>

        <div ref={ref} className="grid grid-cols-1 md:grid-cols-2 gap-8 projects-grid">
          {projects.map((project, index) => (
            <motion.div
              key={project.title}
              className="project-card"
              whileHover={{
                y: -10,
                transition: { duration: 0.2 },
              }}
              onClick={() => openProjectDetails(project)}
            >
              <div className="relative transform-style-3d transition-all duration-500 hover:rotate-y-5 hover:rotate-x-5 cursor-pointer">
                <Card className="overflow-hidden h-full border-gray-100 dark:border-gray-700 hover:shadow-lg transition-shadow bg-white dark:bg-gray-800">
                  <div className="relative h-60 overflow-hidden">
                    <Image
                      src={project.image || "/placeholder.svg"}
                      alt={project.title}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-110"
                      sizes="(max-width: 768px) 100vw, 500px"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300"></div>
                  </div>

                  <CardContent className="p-6">
                    <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-3 font-poppins">
                      {project.title}
                    </h3>

                    <p className="text-gray-600 dark:text-gray-300 mb-4 line-clamp-2">{project.description}</p>

                    <div className="flex flex-wrap gap-2 mt-4">
                      {project.tags.map((tag) => (
                        <span
                          key={tag}
                          className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-orange-100 text-orange-800 dark:bg-orange-900/20 dark:text-orange-200"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </CardContent>

                  <CardFooter className="px-6 py-4 border-t border-gray-100 dark:border-gray-700 flex justify-between">
                    <Button
                      variant="outline"
                      size="sm"
                      className="flex items-center gap-1 text-gray-600 dark:text-gray-300 hover:text-orange-500 dark:hover:text-orange-400 rounded-full"
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
                      className="flex items-center gap-1 bg-orange-500 hover:bg-orange-600 text-white rounded-full"
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

        <div className="mt-16 text-center">
          <Link href="/experience" passHref>
            <Button className="bg-orange-500 hover:bg-orange-600 text-white group rounded-full px-6">
              View My Experience
              <ArrowUpRightIcon className="ml-2 h-4 w-4 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
            </Button>
          </Link>
        </div>
      </div>

      {/* Project Details Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="max-w-4xl w-[90vw] max-h-[90vh] overflow-y-auto bg-white dark:bg-gray-800 p-0 rounded-xl">
          <DialogHeader className="p-6 border-b border-gray-100 dark:border-gray-700">
            <div className="flex items-center justify-between">
              <DialogTitle className="text-2xl font-bold text-gray-900 dark:text-white font-poppins">
                {selectedProject?.title}
              </DialogTitle>
              <Button variant="ghost" size="icon" onClick={closeProjectDetails} className="rounded-full">
                <XIcon className="h-4 w-4" />
              </Button>
            </div>
          </DialogHeader>

          {selectedProject && (
            <div className="p-6">
              <div className="relative h-64 md:h-80 mb-6 rounded-lg overflow-hidden">
                <Image
                  src={selectedProject.image || "/placeholder.svg"}
                  alt={selectedProject.title}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 1024px"
                />
              </div>

              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-2 font-poppins">Overview</h3>
                  <p className="text-gray-600 dark:text-gray-300 leading-relaxed">{selectedProject.longDescription}</p>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-2 font-poppins">Challenges</h3>
                  <ul className="list-disc pl-5 space-y-1 text-gray-600 dark:text-gray-300">
                    {selectedProject.challenges.map((challenges, index) => (
                      <li key={index} className="leading-relaxed">
                        {challenges}
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-2 font-poppins">
                    Architecture
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300 leading-relaxed">{selectedProject.architecture}</p>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-2 font-poppins">Results</h3>
                  <p className="text-gray-600 dark:text-gray-300 leading-relaxed">{selectedProject.results}</p>
                </div>

                <div className="flex flex-wrap gap-2 pt-4 border-t border-gray-100 dark:border-gray-700">
                  {selectedProject.tags.map((tag) => (
                    <span
                      key={tag}
                      className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-orange-100 text-orange-800 dark:bg-orange-900/20 dark:text-orange-200"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                <div className="flex justify-between pt-4 border-t border-gray-100 dark:border-gray-700">
                  <Button
                    variant="outline"
                    size="sm"
                    className="flex items-center gap-1 rounded-full"
                    onClick={() => navigateProjects("prev")}
                  >
                    <ArrowLeftIcon className="h-4 w-4" />
                    Previous Project
                  </Button>

                  <div className="flex gap-2">
                    <Button variant="outline" size="sm" className="flex items-center gap-1 rounded-full" asChild>
                      <a href={selectedProject.github} target="_blank" rel="noopener noreferrer">
                        <GithubIcon className="h-4 w-4" />
                        View Code
                      </a>
                    </Button>

                    <Button
                      size="sm"
                      className="flex items-center gap-1 bg-orange-500 hover:bg-orange-600 text-white rounded-full"
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
                    className="flex items-center gap-1 rounded-full"
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
    </div>
  )
}

