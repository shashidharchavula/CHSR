"use client"
import { useEffect } from "react"
import { motion } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { AwardIcon, ExternalLinkIcon } from "lucide-react"
import AOS from "aos"
import "aos/dist/aos.css"

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

const CertificationsSection = () => {
  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: true,
    })
  }, [])

  return (
    <section id="certifications" className="py-20 bg-gray-50 dark:bg-gray-800">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4"
          >
            Professional <span className="text-orange-500">Certifications</span>
          </motion.h2>
          <div className="w-20 h-1 bg-orange-500 mx-auto rounded-full"></div>
          <p className="mt-4 text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Industry-recognized certifications that validate my expertise in data engineering technologies.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
          {certifications.map((cert, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              viewport={{ once: true }}
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
    </section>
  )
}

const CertificationCard = ({ certification }) => {
  return (
    <Card className="overflow-hidden border-orange-500/10 hover:border-orange-500/30 transition-colors h-full">
      <CardContent className="p-4 flex flex-col h-full">
        <div className="flex items-center gap-4">
          <div className="h-12 w-12 rounded-full bg-orange-100 dark:bg-orange-900/30 flex items-center justify-center flex-shrink-0">
            <AwardIcon className="h-6 w-6 text-orange-500" />
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
              <ExternalLinkIcon className="h-4 w-4" />
              View Certificate
            </a>
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}

export default CertificationsSection

