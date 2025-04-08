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

  const twitchClientId = process.env.NEXT_PUBLIC_TWITCH_CLIENT_ID
  const twitchAccessToken = process.env.NEXT_PUBLIC_TWITCH_ACCESS_TOKEN
  const steamApiKey = process.env.NEXT_PUBLIC_STEAM_API_KEY
  const youtubeApiKey = process.env.NEXT_PUBLIC_YOUTUBE_API_KEY

  const steamAppIds = ["570", "730", "440"] // Dota 2, CS:GO, TF2

  const fetchTwitchData = async () => {
    const res = await fetch("https://api.twitch.tv/helix/streams?first=100", {
      headers: {
        "Client-ID": twitchClientId,
        Authorization: `Bearer ${twitchAccessToken}`,
      },
    })

    const json = await res.json()
    const gameStats = json.data.reduce((acc, { game_name, viewer_count }) => {
      acc[game_name] = (acc[game_name] || 0) + viewer_count
      return acc
    }, {})

    return Object.entries(gameStats)
      .map(([name, viewers]) => ({ name, viewers }))
      .sort((a, b) => b.viewers - a.viewers)
      .slice(0, 5)
  }

  const fetchSteamData = async () => {
    const responses = await Promise.all(
      steamAppIds.map((appid) =>
        fetch(
          `https://api.steampowered.com/ISteamUserStats/GetNumberOfCurrentPlayers/v1/?key=${steamApiKey}&appid=${appid}`
        ).then((res) => res.json())
      )
    )

    const games = {
      "570": "Dota 2",
      "730": "CS:GO",
      "440": "TF2",
    }

    return steamAppIds.map((appid, index) => ({
      name: games[appid],
      viewers: responses[index]?.response?.player_count || 0,
    }))
  }

  const fetchYouTubeData = async () => {
    const res = await fetch(
      `https://www.googleapis.com/youtube/v3/videos?part=snippet,liveStreamingDetails&chart=mostPopular&videoCategoryId=20&maxResults=10&regionCode=US&key=${youtubeApiKey}`
    )

    const json = await res.json()

    return json.items
      .filter((video) => video.liveStreamingDetails?.concurrentViewers)
      .map((video) => ({
        name: video.snippet.title,
        viewers: Number(video.liveStreamingDetails.concurrentViewers),
      }))
      .sort((a, b) => b.viewers - a.viewers)
      .slice(0, 5)
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
              <Bar dataKey="viewers" fill="#9146FF" />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

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
              <Bar dataKey="viewers" fill="#0f0f0f" />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

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
