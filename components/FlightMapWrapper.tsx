"use client"

import { useEffect, useState } from "react"
import dynamic from "next/dynamic"
import "leaflet/dist/leaflet.css"

// Dynamic import: tells Next.js to never server-side render this
const MapOnly = dynamic(() => import("./MapOnly"), { ssr: false })

export default function FlightMapWrapper({ flights }) {
  const [isClient, setIsClient] = useState(false)

  // Ensures this component only renders in the browser
  useEffect(() => {
    setIsClient(true)
  }, [])

  // Prevent any SSR crashes
  if (!isClient) return <p className="text-sm text-center">Loading map...</p>

  return <MapOnly flights={flights} />
}
