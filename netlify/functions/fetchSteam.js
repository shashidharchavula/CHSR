// netlify/functions/fetchSteam.js

const fetch = (...args) => import("node-fetch").then(({ default: fetch }) => fetch(...args))

exports.handler = async () => {
  const steamApiKey = "1DE690EDB3C0A719B05CCD7761CA5B9C"

  const appIds = [
    "570",     // Dota 2
    "730",     // CS:GO
    "440",     // TF2
    "578080",  // PUBG
    "1172470", // Apex Legends
    "271590",  // GTA V
    "359550",  // Rainbow Six
    "252490",  // Rust
    "1085660", // Destiny 2
    "1097150"  // Sons of the Forest
  ]

  const games = {
    "570": "Dota 2",
    "730": "CS:GO",
    "440": "TF2",
    "578080": "PUBG",
    "1172470": "Apex Legends",
    "271590": "GTA V",
    "359550": "Rainbow Six",
    "252490": "Rust",
    "1085660": "Destiny 2",
    "1097150": "Sons of the Forest"
  }

  try {
    const results = await Promise.all(
      appIds.map(async (appid) => {
        const res = await fetch(
          `https://api.steampowered.com/ISteamUserStats/GetNumberOfCurrentPlayers/v1/?key=${steamApiKey}&appid=${appid}`
        )
        const json = await res.json()
        return {
          name: games[appid],
          viewers: json?.response?.player_count || 0
        }
      })
    )

    const sortedTop5 = results
      .sort((a, b) => b.viewers - a.viewers)
      .slice(0, 5)

    return {
      statusCode: 200,
      body: JSON.stringify(sortedTop5)
    }
  } catch (err) {
    console.error("🔥 Steam fetch failed:", err)
    return {
      statusCode: 500,
      body: JSON.stringify({ error: "Steam API call failed" })
    }
  }
}
