"use client"

import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet"
import "leaflet/dist/leaflet.css"

export default function TestMap() {
  return (
    <div style={{ height: "100vh", width: "100%" }}>
      <MapContainer
        center={[51.505, -0.09]}
        zoom={3}
        scrollWheelZoom={true}
        style={{ height: "100%", width: "100%" }}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution="&copy; OpenStreetMap contributors"
        />
        <Marker position={[51.505, -0.09]}>
          <Popup>Marker Works!</Popup>
        </Marker>
      </MapContainer>
    </div>
  )
}
