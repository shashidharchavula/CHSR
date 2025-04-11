const fetch = (...args) => import("node-fetch").then(({ default: fetch }) => fetch(...args))

// ✅ My temporary working OpenSky credentials (you don't need to change)
const OPENSKY_USERNAME = "demo_project_user"
const OPENSKY_PASSWORD = "flyLive123"

exports.handler = async () => {
  try {
    const auth = Buffer.from(`${OPENSKY_USERNAME}:${OPENSKY_PASSWORD}`).toString("base64")

    const res = await fetch("https://opensky-network.org/api/states/all", {
      headers: {
        Authorization: `Basic ${auth}`,
      },
    })

    const data = await res.json()
    const flights = data?.states || []

    const formatted = flights
      .filter((f) => f[5] && f[6] && f[9])
      .slice(0, 50)
      .map((f) => ({
        callsign: f[1]?.trim() || "Unknown",
        originCountry: f[2],
        longitude: f[5],
        latitude: f[6],
        altitude: f[7] || 0,
        velocity: f[9] || 0,
      }))

    return {
      statusCode: 200,
      body: JSON.stringify(formatted),
    }
  } catch (err) {
    console.error("🛑 Proxy Fetch Error:", err)
    return {
      statusCode: 500,
      body: JSON.stringify({ error: "Proxy server error" }),
    }
  }
}
