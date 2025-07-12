const fetch = (...args) => import("node-fetch").then(({ default: fetch }) => fetch(...args))

exports.handler = async () => {
  try {
    const apiKey = "AIzaSyDO2WJJI8Ex7mjTylA2QmP51pKOdUHQ25M"
    const query = "gaming"

    // First: Search for live videos
    const searchRes = await fetch(
      `https://www.googleapis.com/youtube/v3/search?part=snippet&eventType=live&type=video&q=${query}&maxResults=10&key=${apiKey}`
    )

    const searchData = await searchRes.json()
    const videoIds = (searchData.items || []).map((item) => item.id.videoId).filter(Boolean)

    if (videoIds.length === 0) {
      return { statusCode: 200, body: JSON.stringify([]) }
    }

    // Second: Fetch live viewer counts
    const videosRes = await fetch(
      `https://www.googleapis.com/youtube/v3/videos?part=liveStreamingDetails,snippet&id=${videoIds.join(",")}&key=${apiKey}`
    )

    const videosData = await videosRes.json()

    const enrichedData = videosData.items.map((item) => ({
      name: item.snippet.title,
      viewers: parseInt(item.liveStreamingDetails?.concurrentViewers || "0"),
    })).sort((a, b) => b.viewers - a.viewers)

    return {
      statusCode: 200,
      body: JSON.stringify(enrichedData.slice(0, 5)),
    }

  } catch (err) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: "YouTube fetch failed", details: err.message }),
    }
  }
}
