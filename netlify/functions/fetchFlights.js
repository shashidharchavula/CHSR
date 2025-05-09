// netlify/functions/fetchFlights.js

exports.handler = async () => {
  try {
    console.log("✈️  [fetchFlights] starting…")

    // Use the built-in fetch (Node 18+ on Netlify)
    const res = await fetch("https://opensky-network.org/api/states/all", {
      // optional: set a short timeout if you like
    })
    console.log("✈️  [fetchFlights] upstream status:", res.status)

    if (!res.ok) {
      throw new Error(`OpenSky responded ${res.status} ${res.statusText}`)
    }

    const data = await res.json()
    console.log("✈️  [fetchFlights] got states:", Array.isArray(data.states) ? data.states.length : "(none)")

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

    console.log("✈️  [fetchFlights] returning", flights.length, "items")
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
