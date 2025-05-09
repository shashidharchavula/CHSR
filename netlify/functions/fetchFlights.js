// netlify/functions/fetchFlights.js
exports.handler = async () => {
  try {
    console.log("✈️  [fetchFlights] invoking…")
    const response = await fetch("https://opensky-network.org/api/states/all")
    console.log("✈️  [fetchFlights] upstream status:", response.status)
    if (!response.ok) {
      throw new Error(`OpenSky returned ${response.status} ${response.statusText}`)
    }

    const data = await response.json()
    console.log("✈️  [fetchFlights] got", Array.isArray(data.states) ? data.states.length : 0, "states")

    const flights = (data.states || [])
      .filter((s) => s[5] != null && s[6] != null && s[9] != null)
      .slice(0, 50)
      .map((s) => ({
        callsign: s[1]?.trim() || "Unknown",
        originCountry: s[2],
        longitude: s[5],
        latitude: s[6],
        altitude: s[7],
        velocity: s[9],
        heading: s[10] || 0,
      }))

    return {
      statusCode: 200,
      body: JSON.stringify(flights),
    }
  } catch (err) {
    console.error("✈️  [fetchFlights] ERROR:", err)
    return {
      statusCode: 500,
      body: JSON.stringify({ error: err.message || "Unknown error" }),
    }
  }
}
