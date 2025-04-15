"use client"

import { useEffect, useState } from "react"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { RefreshCwIcon } from "lucide-react"
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Legend,
} from "recharts"
import dynamic from "next/dynamic"

// Lazy load map only on client
const FlightMap = dynamic(() => import("@/components/FlightMap"), { ssr: false })

const COLORS = ["#f97316", "#10b981", "#3b82f6", "#f43f5e", "#8b5cf6", "#22c55e", "#eab308"]

const FlightDashboard = () => {
  const [flightData, setFlightData] = useState([])
  const [loading, setLoading] = useState(true)
  const [refreshing, setRefreshing] = useState(false)
  const [error, setError] = useState(null)

  const fetchFlightData = async () => {
    try {
      setRefreshing(true)
      const res = await fetch("/.netlify/functions/fetchFlights")
      const json = await res.json()
      if (!Array.isArray(json)) throw new Error("Invalid flight data format")
      setFlightData(json)
    } catch (err) {
      console.error("Flight Fetch Error:", err)
      setError("Could not load flight data.")
    } finally {
      setLoading(false)
      setRefreshing(false)
    }
  }

  useEffect(() => {
    fetchFlightData()
  }, [])

  const topSpeedData = [...flightData]
    .sort((a, b) => b.velocity - a.velocity)
    .slice(0, 5)
    .map((f) => ({
      name: f.callsign || "Unknown",
      speed: +(f.velocity * 3.6).toFixed(0), // m/s to km/h
    }))

  const topAltitudeData = [...flightData]
    .sort((a, b) => b.altitude - a.altitude)
    .slice(0, 5)
    .map((f) => ({
      name: f.callsign || "Unknown",
      altitude: Math.round(f.altitude),
    }))

  const countryMap = {}
  flightData.forEach((f) => {
    const country = f.originCountry || "Unknown"
    countryMap[country] = (countryMap[country] || 0) + 1
  })

  const countryData = Object.entries(countryMap)
    .map(([name, value]) => ({ name, value }))
    .sort((a, b) => b.value - a.value)
    .slice(0, 6)

  if (loading)
    return (
      <div className="flex justify-center items-center h-96">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-orange-500 border-b-2 mb-4"></div>
        <p className="text-sm ml-4">Loading Flight Pipeline...</p>
      </div>
    )

  return (
    <div className="space-y-10">
      {error && (
        <Card className="p-4 border-red-500 bg-red-50 text-red-700">
          <p>{error}</p>
        </Card>
      )}

      {/* Map Section */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg font-bold">🌍 Live Flight Density Map</CardTitle>
        </CardHeader>
        <CardContent>
          <FlightMap flights={flightData} />
        </CardContent>
      </Card>

      {/* Flight Log Panel */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg font-bold">🛫 Live Flight Logs</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2 max-h-80 overflow-y-auto text-sm">
          {flightData.slice(0, 10).map((f, idx) => (
            <div key={idx} className="border-b pb-2 mb-2">
              ✈️ <strong>{f.callsign || "Unknown"}</strong>  
              from <span className="text-orange-600">{f.originCountry}</span><br />
              Speed: {(f.velocity * 3.6).toFixed(0)} km/h | Alt: {Math.round(f.altitude)} m
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Top Speeds */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg font-bold">🚀 Top 5 Fastest Flights (km/h)</CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={topSpeedData}>
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <CartesianGrid strokeDasharray="3 3" />
              <Bar dataKey="speed" fill="#f97316" />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Highest Altitudes */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg font-bold">🛫 Top 5 Highest Altitude Flights (m)</CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={topAltitudeData}>
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <CartesianGrid strokeDasharray="3 3" />
              <Bar dataKey="altitude" fill="#3b82f6" />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Country Distribution */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg font-bold">🌎 Flights by Origin Country</CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={countryData}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                outerRadius={100}
                label
              >
                {countryData.map((_, index) => (
                  <Cell key={index} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Legend />
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Refresh */}
      <div className="flex justify-center">
        <Button
          onClick={fetchFlightData}
          disabled={refreshing}
          className="bg-orange-500 hover:bg-orange-600 text-white px-6 rounded-full"
        >
          <RefreshCwIcon className={`mr-2 h-4 w-4 ${refreshing ? "animate-spin" : ""}`} />
          {refreshing ? "Refreshing..." : "Refresh Data"}
        </Button>
      </div>
    </div>
  )
}

export default FlightDashboard
