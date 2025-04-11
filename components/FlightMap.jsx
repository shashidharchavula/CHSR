"use client"
import dynamic from "next/dynamic"

// Lazy load Leaflet map itself to avoid SSR crash
const LeafletMap = dynamic(() => import("./LeafletMap").then(mod => mod.default), {
  ssr: false,
})

const FlightMap = ({ flights }) => {
  return <LeafletMap flights={flights} />
}

export default FlightMap
