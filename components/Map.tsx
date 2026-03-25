"use client";

import { useEffect, useRef } from "react";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import { properties } from "../data/properties";

mapboxgl.accessToken = process.env.NEXT_PUBLIC_MAPBOX_TOKEN!;

export default function Map() {
  const mapContainer = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!mapContainer.current) return;

    const map = new mapboxgl.Map({
      container: mapContainer.current,
      style: "mapbox://styles/mapbox/light-v10",
      center: [-122.1215, 47.674],
      zoom: 8.5,
      attributionControl: false,
    });

    map.addControl(new mapboxgl.NavigationControl(), "top-right");

    properties.forEach((home) => {
      if (!home.address) return;

      fetch(
        `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(
          home.address
        )}.json?access_token=${mapboxgl.accessToken}`
      )
        .then((res) => res.json())
        .then((data) => {
          const coords = data.features?.[0]?.center;
          if (!coords) return;

          const markerEl = document.createElement("div");
markerEl.className = "fam-marker";

const size = home.featured ? 34 : 28;

markerEl.style.width = `${size}px`;
markerEl.style.height = `${size}px`;
markerEl.style.borderRadius = "9999px";
markerEl.style.backgroundColor = "#c6a45e";
markerEl.style.border = "2px solid white";
markerEl.style.boxShadow = home.featured
  ? "0 0 0 8px rgba(198,164,94,0.18)"
  : "0 0 0 5px rgba(198,164,94,0.12)";
markerEl.style.cursor = "pointer";
markerEl.style.display = "flex";
markerEl.style.alignItems = "center";
markerEl.style.justifyContent = "center";
markerEl.style.transition = "box-shadow 0.2s ease";

const logoEl = document.createElement("div");
logoEl.style.width = home.featured ? "18px" : "15px";
logoEl.style.height = home.featured ? "18px" : "15px";
logoEl.style.backgroundImage = "url('/fam-pin-logo.png')";
logoEl.style.backgroundSize = "contain";
logoEl.style.backgroundRepeat = "no-repeat";
logoEl.style.backgroundPosition = "center";

markerEl.appendChild(logoEl);

markerEl.addEventListener("mouseenter", () => {
  markerEl.style.boxShadow = home.featured
    ? "0 0 0 10px rgba(198,164,94,0.24)"
    : "0 0 0 7px rgba(198,164,94,0.18)";
});

markerEl.addEventListener("mouseleave", () => {
  markerEl.style.boxShadow = home.featured
    ? "0 0 0 8px rgba(198,164,94,0.18)"
    : "0 0 0 5px rgba(198,164,94,0.12)";
});

          const popup = new mapboxgl.Popup({
            offset: 18,
            closeButton: false,
            maxWidth: "280px",
          }).setHTML(`
            <div style="font-family: Arial, sans-serif; color:#0f1720; padding:2px 2px 4px;">
              ${
                home.featured
                  ? `<div style="display:inline-block; margin-bottom:8px; padding:4px 8px; border-radius:999px; background:#f3ead7; color:#8a6b16; font-size:11px; font-weight:700; letter-spacing:.08em; text-transform:uppercase;">Featured</div>`
                  : ""
              }
              <div style="font-size:16px; font-weight:700; line-height:1.4; margin-bottom:6px;">
                ${home.address}
              </div>
              <div style="font-size:13px; color:#475569; margin-bottom:10px;">
                ${home.city || ""}${home.day ? ` · ${home.day}` : ""}${home.time ? ` · ${home.time}` : ""}
              </div>
              ${
                home.link
                  ? `<a href="${home.link}" target="_blank" rel="noreferrer" style="display:inline-block; text-decoration:none; background:#0f1720; color:white; padding:10px 14px; border-radius:999px; font-size:13px; font-weight:600;">View Property</a>`
                  : ""
              }
            </div>
          `);

          new mapboxgl.Marker(markerEl)
            .setLngLat(coords)
            .setPopup(popup)
            .addTo(map);
        })
        .catch(() => {});
    });

    return () => map.remove();
  }, []);

  return <div ref={mapContainer} className="h-[480px] w-full rounded-[1.5rem]" />;
}