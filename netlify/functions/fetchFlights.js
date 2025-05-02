// netlify/functions/fetchFlights.js

exports.handler = async () => {
  console.log("🚀 fetchFlights starting…");

  try {
    // If you only care about, e.g., U.S. airspace, uncomment the bbox line to shave off payload size:
    // const url = "https://opensky-network.org/api/states/all?lamin=24.3963&lamax=49.3843&lomin=-125&lomax=-66.9346";
    const url = "https://opensky-network.org/api/states/all";

    // Kick off the fetch (Node 18+ has native fetch)
    const res = await fetch(url, { timeout: 8000 });
    console.log("→ OpenSky responded with status", res.status);

    if (!res.ok) {
      throw new Error(`OpenSky HTTP ${res.status}`);
    }

    const { states = [] } = await res.json();
    console.log("→ parsed JSON, got", states.length, "states");

    const flights = states
      .filter(s => s[5] != null && s[6] != null && s[9] != null)
      .slice(0, 50)           // keeps your top 50
      .map(s => ({
        callsign:      (s[1]?.trim() || "Unknown"),
        originCountry: s[2],
        longitude:     s[5],
        latitude:      s[6],
        altitude:      s[7] || 0,
        velocity:      s[9],
        heading:       s[10] || 0,
      }));

    console.log("→ returning", flights.length, "flights");
    return {
      statusCode: 200,
      body: JSON.stringify(flights),
    };

  } catch (err) {
    console.error("✈️ fetchFlights error:", err);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: err.message }),
    };
  }
};
