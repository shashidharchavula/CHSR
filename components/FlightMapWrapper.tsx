"use client"

import { useEffect, useState } from "react"
import dynamic from "next/dynamic"
import "leaflet/dist/leaflet.css"

// Dynamically load MapOnly with SSR disabled
const MapOnly = dynamic(() => import("./MapOnly"), { ssr: false })

export default function FlightMapWrapper({ flights }) {
  const [isClient, setIsClient] = useState(false)

  useEffect(() => {
    setIsClient(true)
  }, [])

  if (!isClient) return <p className="text-sm text-center">Loading map...</p>

  return <MapOnly flights={flights} />
}
