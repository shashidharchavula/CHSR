"use client"

import { useEffect, useState } from "react"
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
import { ArrowUpIcon, ArrowDownIcon, RefreshCwIcon, RocketIcon, CalendarIcon, ClockIcon } from "lucide-react"
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
      .sort((a, b) => Number.parseInt(a.name) - Number.parseInt(b.name))

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

const SpaceXDashboard = () => {
  const [data, setData] = useState(null)
  const [refreshing, setRefreshing] = useState(false)
  const [loading, setLoading] = useState(true)
  const [countdown, setCountdown] = useState("")
  const [error, setError] = useState(null)

  const refreshData = async () => {
    if (refreshing) return // Prevent multiple simultaneous refreshes

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
      // Set initial countdown
      setCountdown(formatTimeRemaining(data.nextLaunch.date))

      // Then update it every second
      const timer = setInterval(() => {
        setCountdown(formatTimeRemaining(data.nextLaunch.date))
      }, 1000)

      return () => clearInterval(timer)
    }
  }, [data])

  if (loading)
    return (
      <div className="flex items-center justify-center h-96">
        <div className="flex flex-col items-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-orange-500 mb-4"></div>
          <p className="text-gray-600 dark:text-gray-300 font-medium">Loading SpaceX launch data...</p>
        </div>
      </div>
    )

  if (error)
    return (
      <div className="text-center p-10 bg-white dark:bg-gray-800 rounded-lg border border-gray-100 dark:border-gray-700 shadow-sm">
        <p className="text-red-500 mb-4">Error: {error}</p>
        <Button onClick={refreshData} className="bg-orange-500 hover:bg-orange-600 text-white rounded-full px-6">
          Try Again
        </Button>
      </div>
    )

  return (
    <div className="space-y-8">
      {data.nextLaunch ? (
        <Card className="overflow-hidden border-orange-200 dark:border-orange-900/30 bg-gradient-to-r from-orange-50 to-white dark:from-orange-950/20 dark:to-gray-800 shadow-sm">
          <CardHeader className="pb-2 border-b border-orange-100 dark:border-orange-900/30">
            <CardTitle className="text-lg font-medium text-gray-800 dark:text-white font-poppins flex items-center">
              <RocketIcon className="h-5 w-5 mr-2 text-orange-500" />
              Next SpaceX Launch: {data.nextLaunch.mission}
            </CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="md:col-span-2">
                <div className="flex items-center mb-2">
                  <CalendarIcon className="h-4 w-4 text-orange-500 mr-2" />
                  <p className="text-sm text-gray-700 dark:text-gray-300 font-medium">
                    Launch Date: <span className="font-normal">{new Date(data.nextLaunch.date).toLocaleString()}</span>
                  </p>
                </div>
                <div className="flex items-start mb-4">
                  <RocketIcon className="h-4 w-4 text-orange-500 mr-2 mt-0.5" />
                  <div>
                    <p className="text-sm text-gray-700 dark:text-gray-300 font-medium">
                      Rocket: <span className="font-normal">{data.nextLaunch.rocket}</span>
                    </p>
                    <p className="text-xs text-gray-600 dark:text-gray-400 mt-1 line-clamp-3">
                      {data.nextLaunch.rocketDesc}
                    </p>
                  </div>
                </div>
              </div>

              <div className="flex flex-col items-center justify-center bg-white/50 dark:bg-gray-800/50 rounded-lg p-4 border border-orange-100 dark:border-orange-900/30">
                <div className="flex items-center mb-2">
                  <ClockIcon className="h-4 w-4 text-orange-500 mr-2" />
                  <p className="text-sm text-gray-700 dark:text-gray-300 font-medium">Countdown</p>
                </div>
                <p className="text-xl font-bold text-orange-500 dark:text-orange-400 text-center">{countdown}</p>
                {data.nextLaunch.webcast && (
                  <a
                    href={data.nextLaunch.webcast}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-4 bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-full text-sm font-medium transition-colors"
                  >
                    Watch Webcast
                  </a>
                )}
              </div>
            </div>
          </CardContent>
        </Card>
      ) : (
        <Card className="border border-gray-100 dark:border-gray-700 bg-white dark:bg-gray-800 shadow-sm">
          <CardContent className="p-6 text-center">
            <p className="text-gray-600 dark:text-gray-300">No upcoming launch data found.</p>
          </CardContent>
        </Card>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="border border-gray-100 dark:border-gray-700 bg-white dark:bg-gray-800 shadow-sm">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-500 dark:text-gray-400 font-poppins">
              Total Launches
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div>
                <div className="text-2xl font-bold text-gray-900 dark:text-white">
                  {data.totalLaunches.toLocaleString()}
                </div>
                <div className="flex items-center mt-1">
                  <span className="text-green-500 flex items-center text-xs font-medium">
                    <ArrowUpIcon className="w-3 h-3 mr-1" />
                    Historical
                  </span>
                </div>
              </div>
              <div className="h-16 w-16">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={data.lineData.slice(-6)}>
                    <Line type="monotone" dataKey="value" stroke="#f97316" strokeWidth={2} dot={false} />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border border-gray-100 dark:border-gray-700 bg-white dark:bg-gray-800 shadow-sm">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-500 dark:text-gray-400 font-poppins">
              Success Rate
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div>
                <div className="text-2xl font-bold text-gray-900 dark:text-white">{data.successRate}%</div>
                <div className="flex items-center mt-1">
                  <span className="text-xs text-gray-500 dark:text-gray-400">of all launches</span>
                </div>
              </div>
              <div className="h-16 w-16">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie data={data.pieData} innerRadius={15} outerRadius={30} paddingAngle={2} dataKey="value">
                      <Cell fill="#16a34a" />
                      <Cell fill="#dc2626" />
                      <Cell fill="#facc15" />
                    </Pie>
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border border-gray-100 dark:border-gray-700 bg-white dark:bg-gray-800 shadow-sm">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-500 dark:text-gray-400 font-poppins">
              Avg. Processing Time
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div>
                <div className="text-2xl font-bold text-gray-900 dark:text-white">{data.avgProcessingTime}s</div>
                <div className="flex items-center mt-1">
                  <span className="text-red-500 flex items-center text-xs font-medium">
                    <ArrowDownIcon className="w-3 h-3 mr-1" />
                    12.5%
                  </span>
                  <span className="text-xs text-gray-500 dark:text-gray-400 ml-2">improvement</span>
                </div>
              </div>
              <div className="h-16 w-16 opacity-50">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={[...Array(6)].map((_, i) => ({ value: Math.random() * 50 + 50 }))}>
                    <Bar dataKey="value" fill="#f97316" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border border-gray-100 dark:border-gray-700 bg-white dark:bg-gray-800 shadow-sm">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-500 dark:text-gray-400 font-poppins">
              Active Data Streams
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div>
                <div className="text-2xl font-bold text-gray-900 dark:text-white">{data.activeStreams}</div>
                <div className="flex items-center mt-1">
                  <span className="text-green-500 flex items-center text-xs font-medium">
                    <ArrowUpIcon className="w-3 h-3 mr-1" />2
                  </span>
                  <span className="text-xs text-gray-500 dark:text-gray-400 ml-2">new today</span>
                </div>
              </div>
              <div className="grid grid-cols-3 gap-1">
                {Array.from({ length: 9 }).map((_, index) => (
                  <div
                    key={index}
                    className={`w-3 h-3 rounded-full ${index < 7 ? "bg-orange-500" : "bg-gray-200 dark:bg-gray-700"}`}
                  ></div>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-2 border border-gray-100 dark:border-gray-700 bg-white dark:bg-gray-800 shadow-sm">
          <CardHeader className="border-b border-gray-100 dark:border-gray-700 bg-gray-50 dark:bg-gray-800/50 pb-3">
            <CardTitle className="text-lg font-medium text-gray-800 dark:text-white font-poppins">
              Launches Over Time
            </CardTitle>
          </CardHeader>
          <CardContent className="p-4">
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={data.lineData}>
                  <XAxis dataKey="name" />
                  <YAxis allowDecimals={false} />
                  <CartesianGrid strokeDasharray="3 3" />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "white",
                      border: "1px solid #e5e7eb",
                      borderRadius: "0.375rem",
                      boxShadow: "0 1px 2px 0 rgba(0, 0, 0, 0.05)",
                    }}
                  />
                  <Line
                    type="monotone"
                    dataKey="value"
                    stroke="#f97316"
                    strokeWidth={2}
                    activeDot={{ r: 8 }}
                    dot={{ r: 4, fill: "#f97316", stroke: "#fff", strokeWidth: 2 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        <Card className="border border-gray-100 dark:border-gray-700 bg-white dark:bg-gray-800 shadow-sm">
          <CardHeader className="border-b border-gray-100 dark:border-gray-700 bg-gray-50 dark:bg-gray-800/50 pb-3">
            <CardTitle className="text-lg font-medium text-gray-800 dark:text-white font-poppins">
              Rocket Usage
            </CardTitle>
          </CardHeader>
          <CardContent className="p-4">
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={data.barData} layout="vertical">
                  <XAxis type="number" />
                  <YAxis dataKey="name" type="category" width={100} />
                  <CartesianGrid strokeDasharray="3 3" />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "white",
                      border: "1px solid #e5e7eb",
                      borderRadius: "0.375rem",
                      boxShadow: "0 1px 2px 0 rgba(0, 0, 0, 0.05)",
                    }}
                  />
                  <Bar dataKey="value" fill="#f97316" radius={[0, 4, 4, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="flex justify-center">
        <Button
          onClick={refreshData}
          disabled={refreshing}
          className="bg-orange-500 hover:bg-orange-600 text-white rounded-full px-6"
        >
          <RefreshCwIcon className={`mr-2 h-4 w-4 ${refreshing ? "animate-spin" : ""}`} />
          {refreshing ? "Refreshing..." : "Refresh Data"}
        </Button>
      </div>
    </div>
  )
}

export default SpaceXDashboard

