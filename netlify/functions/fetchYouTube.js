// netlify/functions/fetchYouTube.js

const fetch = (...args) => import('node-fetch').then(({ default: fetch }) => fetch(...args))

exports.handler = async () => {
  const youtubeApiKey = "AIzaSyDO2WJJI8Ex7mjTylA2QmP51pKOdUHQ25M"
  const apiUrl = `https://www.googleapis.com/youtube/v3/videos?part=snippet,liveStreamingDetails&chart=mostPopular&videoCategoryId=20&maxResults=10&regionCode=US&key=${youtubeApiKey}`

  try {
    const res = await fetch(apiUrl)
    const data = await res.json()

    const streams = (data.items || [])
      .filter((video) => video.liveStreamingDetails?.concurrentViewers)
      .map((video) => ({
        name: video.snippet.title,
        viewers: Number(video.liveStreamingDetails.concurrentViewers),
      }))
      .sort((a, b) => b.viewers - a.viewers)
      .slice(0, 5)

    return {
      statusCode: 200,
      body: JSON.stringify(streams),
    }
  } catch (err) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: "YouTube API call failed" }),
    }
  }
}
