"use client"
import { motion } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Lightbulb, Gauge, Clock, Database } from "lucide-react"

const caseStudies = [
  {
    id: "performance",
    title: "Performance Optimization",
    icon: Gauge,
    studies: [
      {
        title: "Reduced Pipeline Downtime by 30%",
        description:
          "By implementing AWS Glue and Lambda for serverless ETL, we decreased pipeline failure rates and improved overall reliability for a financial services client.",
        metrics: [
          "30% reduction in pipeline downtime",
          "47% cost savings on compute resources",
          "99.9% data delivery SLA achieved",
        ],
        technologies: ["AWS Glue", "Lambda", "CloudWatch", "Step Functions"],
      },
      {
        title: "Query Optimization for Big Data",
        description:
          "Optimized Spark queries and data partitioning strategy for an e-commerce platform, resulting in significant performance improvements for analytical workloads.",
        metrics: [
          "10x improvement in query performance",
          "65% reduction in compute costs",
          "Daily reports delivery time reduced from hours to minutes",
        ],
        technologies: ["Apache Spark", "Delta Lake", "Databricks", "Data Partitioning"],
      },
    ],
  },
  {
    id: "migration",
    title: "Data Migration",
    icon: Database,
    studies: [
      {
        title: "Migrated 10TB to Snowflake with Zero Data Loss",
        description:
          "Designed and implemented a zero-downtime migration strategy from on-premise Oracle database to Snowflake for a healthcare analytics platform.",
        metrics: [
          "10TB of sensitive data migrated with 100% integrity",
          "Zero business disruption during migration",
          "75% improvement in query performance post-migration",
        ],
        technologies: ["Snowflake", "Oracle", "AWS S3", "Airflow", "dbt"],
      },
      {
        title: "Legacy Data Warehouse Modernization",
        description:
          "Modernized a legacy data warehouse to a cloud-native architecture for a retail client, enabling real-time analytics and reduced operational costs.",
        metrics: [
          "90% reduction in infrastructure costs",
          "Real-time data availability (reduced from T+1 to minutes)",
          "5x increase in analytical capabilities",
        ],
        technologies: ["Google BigQuery", "Cloud Dataflow", "Pub/Sub", "Looker"],
      },
    ],
  },
  {
    id: "realtime",
    title: "Real-Time Processing",
    icon: Clock,
    studies: [
      {
        title: "Streaming Analytics for IoT Devices",
        description:
          "Built a real-time processing pipeline for IoT sensor data from manufacturing equipment, enabling predictive maintenance and reducing downtime.",
        metrics: [
          "Processing 50,000+ events per second",
          "Reduced equipment downtime by 45%",
          "Early failure detection saving $2M annually",
        ],
        technologies: ["Kafka", "Spark Streaming", "InfluxDB", "Grafana"],
      },
      {
        title: "Real-Time Customer Insights Platform",
        description:
          "Developed a streaming analytics platform that processes customer interaction data in real-time, enabling immediate personalization and fraud detection.",
        metrics: [
          "360° customer view updated in real-time",
          "23% increase in conversion through real-time offers",
          "Fraud detection latency reduced from hours to seconds",
        ],
        technologies: ["Kafka", "Flink", "Redis", "Elasticsearch", "Kibana"],
      },
    ],
  },
  {
    id: "governance",
    title: "Data Governance",
    icon: Lightbulb,
    studies: [
      {
        title: "Implemented Enterprise Data Catalog",
        description:
          "Designed and deployed a comprehensive data catalog and governance framework for a multinational financial institution, ensuring regulatory compliance and data lineage tracking.",
        metrics: [
          "100% compliance with GDPR and CCPA regulations",
          "Reduced data discovery time by 70%",
          "Automated lineage tracking across 200+ data sources",
        ],
        technologies: ["Collibra", "Apache Atlas", "Airflow", "Python", "SQL"],
      },
      {
        title: "Automated Data Quality Framework",
        description:
          "Built an automated data quality testing framework that monitors and validates data across the entire pipeline, ensuring accuracy and reliability.",
        metrics: [
          "93% reduction in data quality incidents",
          "Automated testing across 500+ critical datasets",
          "Self-healing pipelines with smart recovery strategies",
        ],
        technologies: ["Great Expectations", "dbt Tests", "Airflow", "Python", "Slack Alerts"],
      },
    ],
  },
]

const CaseStudies = () => {
  return (
    <section id="case-studies" className="py-20">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4"
          >
            Data Engineering <span className="text-orange-500">Case Studies</span>
          </motion.h2>
          <div className="w-20 h-1 bg-orange-500 mx-auto rounded-full"></div>
          <p className="mt-4 text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Real-world examples of data engineering challenges solved with innovative approaches.
          </p>
        </div>

        <Tabs defaultValue="performance" className="w-full">
          <TabsList className="grid grid-cols-2 md:grid-cols-4 gap-2 mb-8">
            {caseStudies.map((category) => (
              <TabsTrigger
                key={category.id}
                value={category.id}
                className="flex items-center gap-2 data-[state=active]:bg-orange-500 data-[state=active]:text-white"
              >
                <category.icon className="h-4 w-4" />
                <span>{category.title}</span>
              </TabsTrigger>
            ))}
          </TabsList>

          {caseStudies.map((category) => (
            <TabsContent key={category.id} value={category.id}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {category.studies.map((study, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                  >
                    <Card className="h-full hover:shadow-md transition-shadow">
                      <CardHeader>
                        <CardTitle className="text-xl font-bold text-gray-800 dark:text-white flex items-center gap-2">
                          <category.icon className="h-5 w-5 text-orange-500" />
                          {study.title}
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <p className="text-gray-600 dark:text-gray-300">{study.description}</p>

                        <div>
                          <h4 className="text-sm font-bold text-gray-700 dark:text-gray-200 mb-2">Key Metrics:</h4>
                          <ul className="space-y-1">
                            {study.metrics.map((metric, i) => (
                              <li key={i} className="flex items-start text-sm">
                                <span className="text-orange-500 mr-2">•</span>
                                <span className="text-gray-600 dark:text-gray-300">{metric}</span>
                              </li>
                            ))}
                          </ul>
                        </div>

                        <div className="pt-2">
                          <h4 className="text-sm font-bold text-gray-700 dark:text-gray-200 mb-2">
                            Technologies Used:
                          </h4>
                          <div className="flex flex-wrap gap-2">
                            {study.technologies.map((tech, i) => (
                              <span
                                key={i}
                                className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-orange-100 text-orange-800 dark:bg-orange-900/30 dark:text-orange-200"
                              >
                                {tech}
                              </span>
                            ))}
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </div>
            </TabsContent>
          ))}
        </Tabs>
      </div>
    </section>
  )
}

export default CaseStudies

