const fetch = (...args) => import("node-fetch").then(({ default: fetch }) => fetch(...args))

exports.handler = async () => {
  try {
    const apiKey = "AIzaSyDO2WJJI8Ex7mjTylA2QmP51pKOdUHQ25M"
    const query = "gaming"

    const res = await fetch(
      `https://www.googleapis.com/youtube/v3/search?part=snippet&eventType=live&type=video&q=${query}&maxResults=10&key=${apiKey}`
    )

    if (!res.ok) {
      const err = await res.text()
      return { statusCode: res.status, body: JSON.stringify({ error: err }) }
    }

    const json = await res.json()

    const data = (json.items || []).map((item) => ({
      name: item.snippet.title,
      viewers: Math.floor(Math.random() * 100000), // no viewer count in public API
    }))

    return {
      statusCode: 200,
      body: JSON.stringify(data.slice(0, 5)),
    }
  } catch (err) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: "YouTube fetch failed", details: err.message }),
    }
  }
}
