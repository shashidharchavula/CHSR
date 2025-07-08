const fetch = (...args) => import("node-fetch").then(({ default: fetch }) => fetch(...args))

const steamAppIds = [
  { id: 730, name: "CS:GO" },
  { id: 570, name: "Dota 2" },
  { id: 440, name: "Team Fortress 2" },
  { id: 578080, name: "PUBG" },
  { id: 1172470, name: "Apex Legends" },
  { id: 359550, name: "Rainbow Six Siege" },
  { id: 271590, name: "GTA V" },
  { id: 252490, name: "Rust" },
  { id: 105600, name: "Terraria" },
  { id: 230410, name: "Warframe" },
]

exports.handler = async () => {
  try {
    const key = "1DE690EDB3C0A719B05CCD7761CA5B9C"
    const results = await Promise.all(
      steamAppIds.map(async ({ id, name }) => {
        const res = await fetch(`https://api.steampowered.com/ISteamUserStats/GetNumberOfCurrentPlayers/v1/?key=${key}&appid=${id}`)
        const json = await res.json()
        return {
          name,
          viewers: json.response.player_count || 0,
        }
      })
    )

    // sort by player count descending
    results.sort((a, b) => b.viewers - a.viewers)

    return {
      statusCode: 200,
      body: JSON.stringify(results.slice(0, 5)),
    }
  } catch (err) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: "Steam fetch failed", details: err.message }),
    }
  }
}
