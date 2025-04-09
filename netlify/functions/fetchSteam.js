// netlify/functions/fetchSteam.js

const fetch = (...args) => import('node-fetch').then(({ default: fetch }) => fetch(...args))

exports.handler = async () => {
  const steamApiKey = "1DE690EDB3C0A719B05CCD7761CA5B9C"
  const appIds = ["570", "730", "440", "578080", "271590", "1172470"]
  const games = {
    "570": "Dota 2",
    "730": "CS:GO",
    "440": "TF2",
    "578080": "PUBG",
    "271590": "GTA V",
    "1172470": "Apex Legends"
  }

  try {
    const playerCounts = await Promise.all(
      appIds.map(async (appid) => {
        const res = await fetch(
          `https://api.steampowered.com/ISteamUserStats/GetNumberOfCurrentPlayers/v1/?key=${steamApiKey}&appid=${appid}`
        )
        const data = await res.json()
        return {
          name: games[appid],
          viewers: data?.response?.player_count || 0,
        }
      })
    )

    return {
      statusCode: 200,
      body: JSON.stringify(playerCounts),
    }
  } catch (err) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: "Steam API call failed" }),
    }
  }
}
