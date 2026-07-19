'use client';

import { useEffect, useState, useMemo, useRef } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { VisitedCity } from '../lib/data';

interface TravelMapInnerProps {
  cities: VisitedCity[];
}

// Custom Leaflet DivIcon for simple static SVG pin icon
const createCustomPinIcon = (city: VisitedCity) => {
  return L.divIcon({
    className: 'custom-city-svg-marker',
    html: `
      <div class="static-city-pin" title="${city.city}, ${city.country}">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
          <path fill-rule="evenodd" d="M11.54 22.351l.07.04.028.016a.76.76 0 00.723 0l.028-.015.071-.041a16.975 16.975 0 001.144-.742 19.58 19.58 0 002.683-2.282c1.944-1.99 3.963-4.98 3.963-8.827a8.25 8.25 0 00-16.5 0c0 3.846 2.02 6.837 3.963 8.827a19.58 19.58 0 002.682 2.282 16.975 16.975 0 001.145.742zM12 13.5a3 3 0 100-6 3 3 0 000 6z" clip-rule="evenodd" />
        </svg>
      </div>
    `,
    iconSize: [28, 28],
    iconAnchor: [14, 28],
    popupAnchor: [0, -28],
  });
};

const darkTileProvider = {
  url: 'https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png',
  attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>',
};

export function TravelMapInner({ cities }: TravelMapInnerProps) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const mapRef = useRef<L.Map | null>(null);
  const tileLayerRef = useRef<L.TileLayer | null>(null);
  const geoJsonLayerRef = useRef<L.GeoJSON | null>(null);
  const markersRef = useRef<L.Marker[]>([]);

  const [geoData, setGeoData] = useState<any>(null);

  // Normalize visited country names for matching with GeoJSON
  const visitedCountries = useMemo(() => {
    const set = new Set<string>();
    cities.forEach((c) => {
      set.add(c.country.trim().toLowerCase());
      if (c.country.toLowerCase() === 'united states' || c.country.toLowerCase() === 'usa') {
        set.add('united states of america');
        set.add('united states');
      }
    });
    return set;
  }, [cities]);

  // Load GeoJSON dataset for world countries
  useEffect(() => {
    fetch('/data/world-countries.json')
      .then((res) => res.json())
      .then((data) => setGeoData(data))
      .catch((err) => console.error('Failed to load world GeoJSON:', err));
  }, []);

  // Initialize map instance safely
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    if ((container as any)._leaflet_id) {
      delete (container as any)._leaflet_id;
    }

    const map = L.map(container, {
      center: [20, 0],
      zoom: 2,
      minZoom: 2,
      maxZoom: 12,
      scrollWheelZoom: true,
      zoomControl: true,
    });

    mapRef.current = map;

    // Load Tile Layer (Dark Mode only)
    const newTileLayer = L.tileLayer(darkTileProvider.url, {
      attribution: darkTileProvider.attribution,
    }).addTo(map);
    tileLayerRef.current = newTileLayer;

    return () => {
      if (mapRef.current) {
        mapRef.current.remove();
        mapRef.current = null;
      }
      if (container) {
        delete (container as any)._leaflet_id;
      }
    };
  }, []);

  // Sync GeoJSON Layer
  useEffect(() => {
    const map = mapRef.current;
    if (!map || !geoData) return;

    if (geoJsonLayerRef.current) {
      map.removeLayer(geoJsonLayerRef.current);
    }

    const countryStyle = (feature: any) => {
      const name = (feature.properties?.name || feature.properties?.ADMIN || feature.id || '').toLowerCase();
      const isVisited = visitedCountries.has(name);

      if (isVisited) {
        return {
          fillColor: '#60a5fa',
          fillOpacity: 0.35,
          color: '#93c5fd',
          weight: 1.5,
          opacity: 0.9,
        };
      }

      return {
        fillColor: '#2a2d37',
        fillOpacity: 0.12,
        color: '#3f4452',
        weight: 0.7,
        opacity: 0.5,
      };
    };

    const onEachFeature = (feature: any, layer: L.Layer) => {
      const name = feature.properties?.name || feature.properties?.ADMIN || feature.id;
      const isVisited = visitedCountries.has(name?.toLowerCase());

      layer.bindTooltip(
        `<strong>${name}</strong>${isVisited ? ' <span class="visited-badge">Visited</span>' : ''}`,
        { sticky: true, className: 'country-tooltip' }
      );

      layer.on({
        mouseover: (e) => {
          const target = e.target;
          target.setStyle({
            fillOpacity: isVisited ? 0.55 : 0.25,
            weight: 2,
            color: isVisited ? '#38bdf8' : '#94a3b8',
          });
        },
        mouseout: (e) => {
          const target = e.target;
          target.setStyle(countryStyle(feature));
        },
      });
    };

    const geoLayer = L.geoJSON(geoData, {
      style: countryStyle,
      onEachFeature: onEachFeature,
    }).addTo(map);

    geoJsonLayerRef.current = geoLayer;
  }, [geoData, visitedCountries]);

  // Sync City Markers
  useEffect(() => {
    const map = mapRef.current;
    if (!map) return;

    // Clear previous markers
    markersRef.current.forEach((marker) => map.removeLayer(marker));
    markersRef.current = [];

    // Add markers for each city
    cities.forEach((city) => {
      const icon = createCustomPinIcon(city);
      const marker = L.marker([city.latitude, city.longitude], { icon });

      const popupContent = `
        <div class="popup-card">
          <div class="popup-header">
            <h3 class="popup-title">${city.city}</h3>
            <span class="popup-country">${city.country}</span>
          </div>
          <div class="popup-body">
            <span class="popup-coords">
              📍 ${city.latitude.toFixed(4)}°, ${city.longitude.toFixed(4)}°
            </span>
          </div>
        </div>
      `;

      marker.bindPopup(popupContent, { className: 'custom-city-popup' });

      marker.on('click', () => {
        map.flyTo([city.latitude, city.longitude], 6, { duration: 1.2 });
      });

      marker.addTo(map);
      markersRef.current.push(marker);
    });
  }, [cities]);

  return (
    <div className="travel-map-wrapper">
      {/* Main Map Container */}
      <div className="map-container-inner" style={{ height: '520px', borderRadius: '1.25rem', overflow: 'hidden' }}>
        <div ref={containerRef} className="leaflet-map-instance" />
      </div>
    </div>
  );
}
