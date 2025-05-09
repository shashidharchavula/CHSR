"use client"

import React from "react"
import { useEffect } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { ArrowRightIcon, DatabaseIcon, ActivityIcon, Gamepad2, RocketIcon } from "lucide-react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import PipelineSimulator from "@/components/pipeline-simulator"
import SchemaViewer from "@/components/schema-viewer"
import SpaceXDashboard from "@/components/spacex-dashboard"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function DashboardPage() {
  // Use a ref to track if the component is mounted
  const isMounted = React.useRef(false)

  useEffect(() => {
    // Skip animations on first render to prevent potential issues
    if (!isMounted.current) {
      isMounted.current = true

      // Register ScrollTrigger
      gsap.registerPlugin(ScrollTrigger)

      // GSAP animation for the dashboard
      gsap.from(".dashboard-header", {
        y: 30,
        opacity: 0,
        duration: 0.8,
        ease: "power3.out",
      })

      gsap.from(".dashboard-tabs", {
        y: 30,
        opacity: 0,
        duration: 0.6,
        ease: "power3.out",
        delay: 0.3,
      })

      gsap.from(".dashboard-content", {
        y: 30,
        opacity: 0,
        duration: 0.8,
        ease: "power3.out",
        delay: 0.6,
      })
    }

    // Cleanup function
    return () => {
      // Clear any ScrollTrigger instances
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill())
    }
  }, [])

  return (
    <div className="min-h-screen pt-24 pb-20 bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-800">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12 dashboard-header">
          <motion.h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4 font-poppins">
            Data <span className="text-orange-500">Analytics</span> Dashboard
          </motion.h1>
          <div className="w-20 h-1 bg-orange-500 mx-auto rounded-full"></div>
          <p className="mt-6 text-gray-600 dark:text-gray-300 max-w-2xl mx-auto leading-relaxed">
            Interactive visualizations of real-time data metrics, and database schema explorer.
          </p>
        </div>

        <div className="dashboard-tabs mb-8">
          <Tabs defaultValue="spacex" className="w-full">
            <TabsList className="w-full max-w-md mx-auto grid grid-cols-3 mb-8">
              <TabsTrigger
                value="spacex"
                className="data-[state=active]:bg-orange-500 data-[state=active]:text-white rounded-full"
              >
                <Gamepad2 className="h-4 w-4 mr-2" />
                Esports Live 
              </TabsTrigger>
              <TabsTrigger
                value="pipeline"
                className="data-[state=active]:bg-orange-500 data-[state=active]:text-white rounded-full"
              >
                <ActivityIcon className="h-4 w-4 mr-2" />
                Flight-Stats
              </TabsTrigger>
              <TabsTrigger
                value="schema"
                className="data-[state=active]:bg-orange-500 data-[state=active]:text-white rounded-full"
              >
                <DatabaseIcon className="h-4 w-4 mr-2" />
                Schema
              </TabsTrigger>
            </TabsList>

            <div className="dashboard-content">
              <TabsContent value="spacex" className="mt-0">
                <React.Suspense
                  fallback={<div className="h-96 flex items-center justify-center">Loading SpaceX dashboard...</div>}
                >
                  <SpaceXDashboard />
                </React.Suspense>
              </TabsContent>

              <TabsContent value="pipeline" className="mt-0">
                <div className="mb-6">
                  <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-6 font-poppins">
                    Real Time <span className="text-orange-500">Flight-stats</span>
                  </h2>
                  <p className="text-gray-600 dark:text-gray-300 mb-6 max-w-3xl">
                    This interactive dashboard displays live flight data arriving from airlines,
                    radar, and weather feeds. Each update is parsed and enriched before appearing
                    as up-to-the-second status cards on the dashboard interface.
                  </p>
                  <React.Suspense
                    fallback={
                      <div className="h-96 flex items-center justify-center">Loading pipeline simulator...</div>
                    }
                  >
                    <PipelineSimulator />
                  </React.Suspense>
                </div>
              </TabsContent>

              <TabsContent value="schema" className="mt-0">
                <div className="mb-6">
                  <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-6 font-poppins">
                    Database <span className="text-orange-500">Schema Explorer</span>
                  </h2>
                  <p className="text-gray-600 dark:text-gray-300 mb-6 max-w-3xl">
                    Explore database schemas for different data engineering scenarios. Click on any table in the diagram
                    to view its detailed structure, including columns, data types, and relationships with other tables.
                  </p>
                  <React.Suspense
                    fallback={<div className="h-96 flex items-center justify-center">Loading schema viewer...</div>}
                  >
                    <SchemaViewer />
                  </React.Suspense>
                </div>
              </TabsContent>
            </div>
          </Tabs>
        </div>

        <div className="mt-16 text-center">
          <Link href="/contact" passHref>
            <Button className="bg-orange-500 hover:bg-orange-600 text-white group rounded-full px-6">
              Contact Me
              <ArrowRightIcon className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
            </Button>
          </Link>
        </div>
      </div>
    </div>
  )
}

