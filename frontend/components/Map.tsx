import mapboxgl from "mapbox-gl";
import React from "react";
import { useEffect } from "react";

mapboxgl.accessToken =
  "pk.eyJ1IjoiYWxhcGFub3NraSIsImEiOiJjbGVxMjhjbmowaTZpNDVvNWQ4NTBsc2JtIn0.LFIPoIEmYQJv5bfRPueMQQ";

interface MapProps {
  lat: any;
  lng: any;
}

export default function Map({ lat, lng }: MapProps) {
  useEffect(() => {
    if (lat && lng) {
      const map = new mapboxgl.Map({
        container: "map",
        style: "mapbox://styles/mapbox/streets-v11",
        attributionControl: false,
        center: [lng, lat],
        zoom: 12,
      });

      map.addControl(new mapboxgl.NavigationControl(), "bottom-right");
      map.addControl(
        new mapboxgl.GeolocateControl({
          positionOptions: {
            enableHighAccuracy: true,
          },
          trackUserLocation: true,
          showUserHeading: true,
        }),
        "bottom-right"
      );

      new mapboxgl.Marker({ color: "#ff0000" })
        .setLngLat([lng, lat])
        .addTo(map);
    }
  }, [lat, lng]);

  return (
    <>
      <div
        id="map"
        className="absolute inset-0 m-0 overflow-hidden z-100 shadow-md  rounded-2xl "
      ></div>
    </>
  );
}
