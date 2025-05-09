const fetch = (...args) => import('node-fetch').then(({ default: fetch }) => fetch(...args))

exports.handler = async () => {
  try {
    const response = await fetch("https://opensky-network.org/api/states/all")
    const data = await response.json()

    const flights = (data.states || [])
      .filter((state) => state[5] !== null && state[6] !== null && state[9] !== null)
      .slice(0, 50)
      .map((state) => ({
        callsign: state[1]?.trim() || "Unknown",
        originCountry: state[2],
        longitude: state[5],
        latitude: state[6],
        altitude: state[7],
        velocity: state[9],
        heading: state[10] || 0 // 🔥 Add heading for rotation
      }))

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
