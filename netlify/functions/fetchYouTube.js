// netlify/functions/fetchYouTube.js

const fetch = (...args) => import('node-fetch').then(({ default: fetch }) => fetch(...args))

exports.handler = async () => {
  const youtubeApiKey = "AIzaSyDO2WJJI8Ex7mjTylA2QmP51pKOdUHQ25M"

  try {
    const res = await fetch(
      `https://www.googleapis.com/youtube/v3/search?part=snippet&type=video&eventType=live&videoCategoryId=20&maxResults=10&regionCode=US&key=${youtubeApiKey}`
    )
    const data = await res.json()

    const videoIds = data.items.map((item) => item.id.videoId).join(",")

    const detailsRes = await fetch(
      `https://www.googleapis.com/youtube/v3/videos?part=snippet,liveStreamingDetails&id=${videoIds}&key=${youtubeApiKey}`
    )
    const details = await detailsRes.json()

    const liveStreams = (details.items || [])
      .filter((video) => video.liveStreamingDetails?.concurrentViewers)
      .map((video) => ({
        name: video.snippet.title,
        viewers: Number(video.liveStreamingDetails.concurrentViewers),
      }))
      .sort((a, b) => b.viewers - a.viewers)
      .slice(0, 5)

    return {
      statusCode: 200,
      body: JSON.stringify(liveStreams),
    }
  } catch (err) {
    console.error("🔥 YouTube live fetch failed:", err)
    return {
      statusCode: 500,
      body: JSON.stringify({ error: "YouTube API call failed" }),
    }
  }
}
