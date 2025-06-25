// netlify/functions/fetchTwitch.js

const fetch = (...args) => import('node-fetch').then(({ default: fetch }) => fetch(...args))

exports.handler = async () => {
  const twitchClientId = "f5rgo07yd6m4kti5y5ue73axfyzmwe"
  const twitchAccessToken = "j13ej9vxuevl9nmn3swvrftsc1n1fc"

  try {
    const res = await fetch("https://api.twitch.tv/helix/streams?first=100", {
      headers: {
        "Client-ID": twitchClientId,
        Authorization: `Bearer ${twitchAccessToken}`,
      },
    })

    const data = await res.json()
    const gameStats = data.data.reduce((acc, stream) => {
      acc[stream.game_name] = (acc[stream.game_name] || 0) + stream.viewer_count
      return acc
    }, {})

    const result = Object.entries(gameStats)
      .map(([name, viewers]) => ({ name, viewers }))
      .sort((a, b) => b.viewers - a.viewers)
      .slice(0, 5)

    return {
  statusCode: 200,
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify(result),
}
  } catch (err) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: "Twitch API call failed" }),
    }
  }
}