"use client"

import { useEffect, useState } from "react"
import { motion } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from "recharts"
import { ArrowUpIcon, ArrowDownIcon, RefreshCcwIcon } from "lucide-react"
import { Button } from "@/components/ui/button"

const fetchSpaceXData = async () => {
  try {
    const [launchRes, rocketRes, upcomingRes] = await Promise.all([
      fetch("https://api.spacexdata.com/v5/launches"),
      fetch("https://api.spacexdata.com/v4/rockets"),
      fetch("https://api.spacexdata.com/v5/launches/upcoming"),
    ])

    if (!launchRes.ok || !rocketRes.ok || !upcomingRes.ok) {
      throw new Error(`API request failed: ${launchRes.status}, ${rocketRes.status}, ${upcomingRes.status}`)
    }

    const allLaunches = await launchRes.json()
    const allRockets = await rocketRes.json()
    const upcomingLaunches = await upcomingRes.json()

    console.log("Launches:", allLaunches.length, "Rockets:", allRockets.length, "Upcoming:", upcomingLaunches.length)

    const rocketMap = allRockets.reduce((acc, rocket) => {
      acc[rocket.id] = rocket
      return acc
    }, {})

    const lineDataMap = {}
    const barDataMap = {}
    let successful = 0
    let failed = 0
    let upcoming = 0

    for (const launch of allLaunches) {
      const year = new Date(launch.date_utc).getFullYear().toString()
      if (year) lineDataMap[year] = (lineDataMap[year] || 0) + 1

      const rocketName = rocketMap[launch.rocket]?.name || "Unknown"
      if (rocketName !== "Unknown") {
        barDataMap[rocketName] = (barDataMap[rocketName] || 0) + 1
      }

      if (launch.success === true) successful++
      else if (launch.success === false) failed++
      if (launch.upcoming === true) upcoming++
    }

    const lineData = Object.entries(lineDataMap)
      .map(([name, value]) => ({ name, value: Number(value) }))
      .sort((a, b) => parseInt(a.name) - parseInt(b.name))

    const barData = Object.entries(barDataMap)
      .map(([name, value]) => ({ name, value: Number(value) }))
      .sort((a, b) => b.value - a.value)
      .slice(0, 5)

    const nextLaunch = upcomingLaunches
      .filter((launch) => new Date(launch.date_utc) > new Date())
      .sort((a, b) => new Date(a.date_utc).getTime() - new Date(b.date_utc).getTime())[0]

    const rocketDetails = nextLaunch ? rocketMap[nextLaunch.rocket] : null

    return {
      lineData,
      barData,
      pieData: [
        { name: "Success", value: successful },
        { name: "Failed", value: failed },
        { name: "Upcoming", value: upcoming },
      ],
      totalLaunches: allLaunches.length,
      successRate: ((successful / allLaunches.length) * 100).toFixed(1),
      avgProcessingTime: (Math.random() * 1 + 0.2).toFixed(2),
      activeStreams: Math.floor(Math.random() * 5) + 8,
      nextLaunch: nextLaunch
        ? {
            mission: nextLaunch.name,
            date: nextLaunch.date_utc,
            webcast: nextLaunch.links?.webcast,
            rocket: rocketDetails?.name,
            rocketDesc: rocketDetails?.description,
          }
        : null,
    }
  } catch (error) {
    console.error("Error fetching SpaceX data:", error)
    throw error
  }
}

const formatTimeRemaining = (targetDate) => {
  const now = new Date()
  const diff = new Date(targetDate) - now
  if (diff <= 0) return "Launch time reached!"

  const days = Math.floor(diff / (1000 * 60 * 60 * 24))
  const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
  const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60))
  const seconds = Math.floor((diff % (1000 * 60)) / 1000)

  return `${days}d ${hours}h ${minutes}m ${seconds}s`
}

const DataDashboard = () => {
  const [data, setData] = useState(null)
  const [refreshing, setRefreshing] = useState(false)
  const [loading, setLoading] = useState(true)
  const [countdown, setCountdown] = useState("")
  const [error, setError] = useState(null)

  const refreshData = async () => {
    setRefreshing(true)
    setError(null)
    try {
      const spaceXData = await fetchSpaceXData()
      setData(spaceXData)
    } catch (err) {
      setError(err.message || "Failed to load SpaceX data")
    } finally {
      setRefreshing(false)
      setLoading(false)
    }
  }

  useEffect(() => {
    refreshData()
  }, [])

  useEffect(() => {
    if (data?.nextLaunch) {
      const timer = setInterval(() => {
        setCountdown(formatTimeRemaining(data.nextLaunch.date))
      }, 1000)
      return () => clearInterval(timer)
    }
  }, [data])

  useEffect(() => {
    if (data) {
      console.log("✅ LineChart Data:", data.lineData)
      console.log("✅ BarChart Data:", data.barData)
    }
  }, [data])

  if (loading) return <p className="text-center text-xl mt-20">Loading SpaceX launch data...</p>
  if (error) return (
    <div className="text-center text-xl mt-20">
      <p className="text-red-500">Error: {error}</p>
      <Button
        onClick={refreshData}
        className="mt-4 bg-orange-500 hover:bg-orange-600 text-white"
      >
        Try Again
      </Button>
    </div>
  )

  return (
    <section id="dashboard" className="py-20">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4"
          >
            SpaceX <span className="text-orange-500">Live Launch Dashboard</span>
          </motion.h2>
          <div className="w-20 h-1 bg-orange-500 mx-auto rounded-full"></div>
          <p className="mt-4 text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Real-time launch stats from the SpaceX API with mission, rocket, and countdown insights.
          </p>
          <div className="mt-6">
            <Button
              onClick={refreshData}
              disabled={refreshing}
              className="bg-orange-500 hover:bg-orange-600 text-white"
            >
              <RefreshCcwIcon className={`mr-2 h-4 w-4 ${refreshing ? "animate-spin" : ""}`} />
              {refreshing ? "Refreshing..." : "Refresh Data"}
            </Button>
          </div>
        </div>

        {data.nextLaunch ? (
          <div className="bg-orange-100 dark:bg-orange-900/20 border border-orange-500 rounded-xl p-6 mb-10 text-center">
            <h3 className="text-xl font-semibold text-orange-600 dark:text-orange-400">
              Next Launch: {data.nextLaunch.mission}
            </h3>
            <p className="text-sm text-gray-700 dark:text-gray-300 mt-1">
              Rocket: <strong>{data.nextLaunch.rocket}</strong>
            </p>
            <p className="text-sm text-gray-700 dark:text-gray-400 mt-1">{data.nextLaunch.rocketDesc}</p>
            <p className="text-md mt-2 text-gray-800 dark:text-gray-200">
              Launching at: <strong>{new Date(data.nextLaunch.date).toLocaleString()}</strong>
            </p>
            <p className="text-lg font-bold mt-2 text-orange-600 dark:text-orange-400">
              Countdown: {countdown}
            </p>
            {data.nextLaunch.webcast && (
              <a
                href={data.nextLaunch.webcast}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block mt-4 bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-md text-sm"
              >
                Watch Webcast 🔗
              </a>
            )}
          </div>
        ) : (
          <p className="text-center text-red-500 mb-10">No upcoming launch data found.</p>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-gray-500 dark:text-gray-400">Total Launches</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-gray-900 dark:text-white">
                {data.totalLaunches.toLocaleString()}
              </div>
              <p className="text-sm text-muted-foreground">All Time</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-gray-500 dark:text-gray-400">Success Rate</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-gray-900 dark:text-white">{data.successRate}%</div>
              <p className="text-sm text-muted-foreground">of all launches</p>
              <ResponsiveContainer width="100%" height={80}>
                <PieChart>
                  <Pie
                    data={data.pieData}
                    innerRadius={20}
                    outerRadius={35}
                    paddingAngle={5}
                    dataKey="value"
                  >
                    <Cell fill="#16a34a" />
                    <Cell fill="#dc2626" />
                    <Cell fill="#facc15" />
                  </Pie>
                </PieChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-gray-500 dark:text-gray-400">Avg. Processing Time</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-gray-900 dark:text-white">{data.avgProcessingTime}s</div>
              <p className="text-sm text-muted-foreground">Simulated metric</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-gray-500 dark:text-gray-400">Active Streams</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-gray-900 dark:text-white">{data.activeStreams}</div>
              <p className="text-sm text-muted-foreground">simulated</p>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <Card className="lg:col-span-2">
            <CardHeader>
              <CardTitle>Launches Over Time</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={data.lineData}>
                    <XAxis dataKey="name" />
                    <YAxis allowDecimals={false} />
                    <CartesianGrid strokeDasharray="3 3" />
                    <Tooltip />
                    <Line type="monotone" dataKey="value" stroke="#f97316" strokeWidth={2} activeDot={{ r: 8 }} />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Rocket Usage</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={data.barData}>
                    <XAxis dataKey="name" />
                    <YAxis allowDecimals={false} />
                    <CartesianGrid strokeDasharray="3 3" />
                    <Tooltip />
                    <Bar dataKey="value" fill="#f97316" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  )
}

export default DataDashboard

