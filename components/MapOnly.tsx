import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet"
import L from "leaflet"

export default function MapOnly({ flights }) {
  return (
    <MapContainer
      center={[20, 0]}
      zoom={2}
      scrollWheelZoom={true}
      style={{ height: "500px", width: "100%", borderRadius: "12px", zIndex: 0 }}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {flights.map((flight, idx) => {
        if (!flight.latitude || !flight.longitude) return null

        return (
          <Marker
            key={idx}
            position={[flight.latitude, flight.longitude]}
            icon={
              new L.DivIcon({
                className: "",
                html: `
                  <div style="transform: rotate(${flight.heading || 0}deg); width: 32px; height: 32px;">
                    <img 
                      src="/plane.png" 
                      style="width: 32px; height: 32px; transform: rotate(${flight.heading || 0}deg);" 
                    />
                  </div>
                `,
                iconSize: [32, 32],
                iconAnchor: [16, 16],
              })
            }
          >
            <Popup>
              <strong>{flight.callsign || "Unknown"}</strong><br />
              Country: {flight.originCountry}<br />
              Altitude: {Math.round(flight.altitude)} m<br />
              Speed: {(flight.velocity * 3.6).toFixed(0)} km/h
            </Popup>
          </Marker>
        )
      })}
    </MapContainer>
  )
}
