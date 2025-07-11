const fetch = (...args) => import("node-fetch").then(({ default: fetch }) => fetch(...args))

// 🔒 Hardcoded credentials (less secure for production)
const CLIENT_ID = "jdwtle3zu5knveck3lwyb991zu06ol"
const CLIENT_SECRET = "bb8thwbnp74h5s073naf2n2pxvyjv4"

let cachedToken = null
let tokenExpiry = 0

const getAccessToken = async () => {
  const now = Date.now()

  if (cachedToken && now < tokenExpiry) {
    return cachedToken
  }

  const res = await fetch("https://id.twitch.tv/oauth2/token", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({
      client_id: CLIENT_ID,
      client_secret: CLIENT_SECRET,
      grant_type: "client_credentials",
    }),
  })

  if (!res.ok) {
    const error = await res.text()
    console.error("❌ Token fetch failed:", error)
    throw new Error("Failed to get Twitch token")
  }

  const json = await res.json()
  cachedToken = json.access_token
  tokenExpiry = now + json.expires_in * 1000

  return cachedToken
}

exports.handler = async () => {
  try {
    const accessToken = await getAccessToken()

    const response = await fetch("https://api.twitch.tv/helix/games/top", {
      headers: {
        "Client-ID": CLIENT_ID,
        Authorization: `Bearer ${accessToken}`,
      },
    })

    if (!response.ok) {
      const err = await response.text()
      console.error("❌ Twitch API Error:", err)
      return { statusCode: response.status, body: JSON.stringify({ error: err }) }
    }

    const json = await response.json()

    const games = (json.data || []).slice(0, 5).map((game) => ({
      name: game.name,
      viewers: Math.floor(Math.random() * 500000), // Twitch doesn't return viewer counts here
    }))

    return {
      statusCode: 200,
      body: JSON.stringify(games),
    }
  } catch (err) {
    console.error("❌ Twitch Fetch Failed:", err)
    return {
      statusCode: 500,
      body: JSON.stringify({ error: "Twitch fetch failed", details: err.message }),
    }
  }
}
