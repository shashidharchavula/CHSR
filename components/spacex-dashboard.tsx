"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import {
  BarChart,
  Bar,
  ResponsiveContainer,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from "recharts"
import { RefreshCwIcon } from "lucide-react"
import { Button } from "@/components/ui/button"

const SpaceXDashboard = () => {
  const [twitchData, setTwitchData] = useState([])
  const [steamData, setSteamData] = useState([])
  const [youtubeData, setYoutubeData] = useState([])
  const [loading, setLoading] = useState(true)
  const [refreshing, setRefreshing] = useState(false)
  const [error, setError] = useState(null)

  const fetchTwitchData = async () => {
    const res = await fetch("/.netlify/functions/fetchTwitch")
    const json = await res.json()
    if (!Array.isArray(json)) throw new Error("Invalid Twitch response")
    return json
  }

  const fetchSteamData = async () => {
    const res = await fetch("/.netlify/functions/fetchSteam")
    const json = await res.json()
    if (!Array.isArray(json)) throw new Error("Invalid Steam response")
    return json
  }

  const fetchYouTubeData = async () => {
    const res = await fetch("/.netlify/functions/fetchYouTube")
    const json = await res.json()
    if (!Array.isArray(json)) throw new Error("Invalid YouTube response")
    return json
  }

  const refreshData = async () => {
    setRefreshing(true)
    setError(null)
    try {
      const [twitch, steam, youtube] = await Promise.all([
        fetchTwitchData(),
        fetchSteamData(),
        fetchYouTubeData(),
      ])
      setTwitchData(twitch)
      setSteamData(steam)
      setYoutubeData(youtube)
    } catch (err) {
      console.error("Fetch Error:", err)
      setError(err.message || "Something went wrong.")
    } finally {
      setLoading(false)
      setRefreshing(false)
    }
  }

  useEffect(() => {
    refreshData()
  }, [])

  if (loading)
    return (
      <div className="flex justify-center items-center h-96">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-orange-500 border-b-2 mb-4"></div>
        <p className="text-sm ml-4">Loading Esports data...</p>
      </div>
    )

  return (
    <div className="space-y-8">
      {error && (
        <Card className="p-4 border-red-500 bg-red-50 text-red-700">
          <p>Error: {error}</p>
        </Card>
      )}

      {/* Twitch Chart */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg font-semibold">Twitch Top Games</CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={twitchData}>
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <CartesianGrid strokeDasharray="3 3" />
              <Bar dataKey="viewers" fill="#A970FF" />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Steam Chart */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg font-semibold">Steam Player Counts</CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={steamData}>
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <CartesianGrid strokeDasharray="3 3" />
              <Bar dataKey="viewers" fill="#0F0F0F" />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* YouTube Chart */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg font-semibold">YouTube Gaming Live Streams</CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={youtubeData}>
              <XAxis dataKey="name" tick={{ fontSize: 10 }} />
              <YAxis />
              <Tooltip />
              <CartesianGrid strokeDasharray="3 3" />
              <Bar dataKey="viewers" fill="#FF0000" />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Refresh Button */}
      <div className="flex justify-center">
        <Button
          onClick={refreshData}
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

export default SpaceXDashboard
