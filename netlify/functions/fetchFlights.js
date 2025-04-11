const fetch = (...args) => import("node-fetch").then(({ default: fetch }) => fetch(...args))
const { createClient } = require("@supabase/supabase-js")

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_ANON_KEY
)

exports.handler = async () => {
  try {
    const response = await fetch("https://opensky-network.org/api/states/all")
    const data = await response.json()

    const flights = (data.states || [])
      .filter((state) => state[5] !== null && state[6] !== null && state[9] !== null)
      .slice(0, 20) // log only 20 to avoid spam
      .map((state) => ({
        callsign: state[1]?.trim() || "Unknown",
        origin_country: state[2],
        longitude: state[5],
        latitude: state[6],
        altitude: state[7],
        velocity: state[9],
        heading: state[10] || 0,
      }))

    // Push to Supabase
    const { error } = await supabase.from("flights").insert(flights)
    if (error) {
      console.error("❌ Supabase Insert Error:", error)
    }

    return {
      statusCode: 200,
      body: JSON.stringify(flights),
    }
  } catch (err) {
    console.error("✈️ Fetch Flights Error:", err)
    return {
      statusCode: 500,
      body: JSON.stringify({ error: "Failed to fetch flight data" }),
    }
  }
}
