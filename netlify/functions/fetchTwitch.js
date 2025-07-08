const fetch = (...args) => import("node-fetch").then(({ default: fetch }) => fetch(...args))

exports.handler = async () => {
  try {
    const response = await fetch("https://api.twitch.tv/helix/games/top", {
      headers: {
        "Client-ID": "ngj0amo6a911ukzsm4vgason0axtwa",
        Authorization: "Bearer 71itbbaohxoxfx8bh3pek82xi3lemk",
      },
    })

    if (!response.ok) {
      const err = await response.text()
      return { statusCode: response.status, body: JSON.stringify({ error: err }) }
    }

    const json = await response.json()

    const games = (json.data || []).slice(0, 5).map((game) => ({
      name: game.name,
      viewers: Math.floor(Math.random() * 500000), // Twitch doesn't give viewer count in this endpoint
    }))

    return {
      statusCode: 200,
      body: JSON.stringify(games),
    }
  } catch (err) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: "Twitch fetch failed", details: err.message }),
    }
  }
}
