import { useEffect } from "react";
import {
  MapContainer,
  TileLayer,
  CircleMarker,
  Tooltip,
  useMap,
} from "react-leaflet";
import { isMobile } from "react-device-detect";
import { City } from "../lib/city";
import "leaflet/dist/leaflet.css";

type Props = {
  guesses: City[];
  win: boolean;
};

// Smoothly pans to the latest guess whenever a new one is added.
function FlyToLatest({ guesses, win }: { guesses: City[]; win: boolean }) {
  const map = useMap();

  useEffect(() => {
    if (win || guesses.length === 0) return;
    const latest = guesses[guesses.length - 1];
    map.flyTo([latest.lat, latest.lng], map.getZoom(), { duration: 1.2 });
  }, [guesses, win, map]);

  // Disable all interaction on win
  useEffect(() => {
    if (win) {
      map.dragging.disable();
      map.touchZoom.disable();
      map.doubleClickZoom.disable();
      map.scrollWheelZoom.disable();
      map.keyboard.disable();
    }
  }, [win, map]);

  return null;
}

export default function Globe({ guesses, win }: Props) {
  const size = isMobile ? 320 : 550;
  const height = Math.round(size * 0.75);

  return (
    // position: relative + low z-index keeps the Leaflet map below the
    // absolutely-positioned win modal (which uses z-10).
    <div
      className="mx-auto my-4"
      style={{ width: `${size}px`, position: "relative", zIndex: 0 }}
    >
      <MapContainer
        center={[50.435, 6.165]}
        zoom={11}
        style={{
          width: `${size}px`,
          height: `${height}px`,
          border: "2px solid #ccc",
          borderRadius: "12px",
          // Dim the map slightly when the game is over
          opacity: win ? 0.5 : 1,
          transition: "opacity 0.6s ease",
        }}
        scrollWheelZoom={false}
        zoomControl={!win}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        {guesses.map((city, idx) => (
          <CircleMarker
            key={idx}
            center={[city.lat, city.lng]}
            radius={7}
            pathOptions={{
              color: "#cc0000",
              fillColor: "#ff3333",
              fillOpacity: 0.85,
              weight: 2,
            }}
          >
            <Tooltip direction="top" offset={[0, -8]} opacity={1} permanent={false}>
              {city.name}
            </Tooltip>
          </CircleMarker>
        ))}

        <FlyToLatest guesses={guesses} win={win} />
      </MapContainer>

      <p className="text-center text-sm text-gray-500 dark:text-gray-400 mt-1">
        Ostbelgien / Eifel
      </p>
    </div>
  );
}
