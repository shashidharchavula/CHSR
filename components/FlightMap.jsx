"use client";

import { useEffect, useRef } from "react";
import dynamic from "next/dynamic";

// Dynamically import react-leaflet components
const MapContainer = dynamic(() => import("react-leaflet").then((mod) => mod.MapContainer), { ssr: false });
const TileLayer = dynamic(() => import("react-leaflet").then((mod) => mod.TileLayer), { ssr: false });
const Marker = dynamic(() => import("react-leaflet").then((mod) => mod.Marker), { ssr: false });
const Popup = dynamic(() => import("react-leaflet").then((mod) => mod.Popup), { ssr: false });

// Load Leaflet CSS only on client
import "leaflet/dist/leaflet.css";

const FlightMap = ({ flights = [] }) => {
  const mapRef = useRef(null);

  useEffect(() => {
    if (typeof window !== "undefined") {
      // Fix Leaflet icon issues client-side
      import("leaflet").then((L) => {
        delete L.Icon.Default.prototype._getIconUrl;
        L.Icon.Default.mergeOptions({
          iconRetinaUrl: "/leaflet/marker-icon-2x.png",
          iconUrl: "/leaflet/marker-icon.png",
          shadowUrl: "/leaflet/marker-shadow.png",
        });
      });
    }
  }, []);

  if (typeof window === "undefined") {
    return null; // Prevent server-side rendering
  }

  return (
    <MapContainer
      center={[20, 0]}
      zoom={2}
      scrollWheelZoom={true}
      style={{ height: "500px", width: "100%", borderRadius: "12px", zIndex: 0 }}
      ref={mapRef}
    >
      <TileLayer
        attribution='© <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {flights.map((flight, idx) => {
        if (!flight.latitude || !flight.longitude) return null;

        return (
          <Marker
            key={idx}
            position={[flight.latitude, flight.longitude]}
            icon={
              new (require("leaflet").DivIcon)({
                className: "",
                html: `
                  <div style="transform: rotate(${flight.heading || 0}deg); width: 32px; height: 32px;">
                    <img 
                      src="/plane.png" 
                      style="width: 32px; height: 32px;" 
                      onerror="this.src='/leaflet/marker-icon.png';" 
                    dizia/>
                  </div>
                `,
                iconSize: [32, 32],
                iconAnchor: [16, 16],
              })
            }
          >
            <Popup>
              <strong>{flight.callsign || "Unknown"}</strong>
              <br />
              Country: {flight.originCountry || "Unknown"}
              <br />
              Altitude: {Math.round(flight.altitude)} m
              <br />
              Speed: {(flight.velocity * 3.6).toFixed(0)} km/h
            </Popup>
          </Marker>
        );
      })}
    </MapContainer>
  );
};

export default FlightMap;