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

const cartoBasemapKey = process.env.NEXT_PUBLIC_CARTO_BASEMAP_KEY;

const darkTileProvider = {
  // CARTO basemap keys are supplied as a query parameter. This component runs
  // in the browser, so the key must be a restricted public basemap key.
  url: `https://{s}.basemaps.cartocdn.com/rastertiles/dark_all/{z}/{x}/{y}{r}.png?key=${encodeURIComponent(cartoBasemapKey ?? '')}`,
  attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>',
};

// The country GeoJSON uses ISO 3166-1 alpha-3 identifiers. Convert them to
// the two-letter form used by Unicode regional-indicator flag emoji.
const iso2ByIso3 = Object.fromEntries(
  `AFG:AF AGO:AO ALB:AL ARE:AE ARG:AR ARM:AM ATA:AQ ATF:TF AUS:AU AUT:AT AZE:AZ
  BDI:BI BEL:BE BEN:BJ BFA:BF BGD:BD BGR:BG BHS:BS BIH:BA BLR:BY BLZ:BZ BMU:BM
  BOL:BO BRA:BR BRN:BN BTN:BT BWA:BW CAF:CF CAN:CA CHE:CH CHL:CL CHN:CN CIV:CI
  CMR:CM COD:CD COG:CG COL:CO CRI:CR CUB:CU CYP:CY CZE:CZ DEU:DE DJI:DJ DNK:DK
  DOM:DO DZA:DZ ECU:EC EGY:EG ERI:ER ESP:ES EST:EE ETH:ET FIN:FI FJI:FJ FLK:FK
  FRA:FR GAB:GA GBR:GB GEO:GE GHA:GH GIN:GN GMB:GM GNB:GW GNQ:GQ GRC:GR GRL:GL
  GTM:GT GUF:GF GUY:GY HND:HN HRV:HR HTI:HT HUN:HU IDN:ID IND:IN IRL:IE IRN:IR
  IRQ:IQ ISL:IS ISR:IL ITA:IT JAM:JM JOR:JO JPN:JP KAZ:KZ KEN:KE KGZ:KG KHM:KH
  KOR:KR CS-KM:XK KWT:KW LAO:LA LBN:LB LBR:LR LBY:LY LKA:LK LSO:LS LTU:LT LUX:LU
  LVA:LV MAR:MA MDA:MD MDG:MG MEX:MX MKD:MK MLI:ML MLT:MT MMR:MM MNE:ME MNG:MN
  MOZ:MZ MRT:MR MWI:MW MYS:MY NAM:NA NCL:NC NER:NE NGA:NG NIC:NI NLD:NL NOR:NO
  NPL:NP NZL:NZ OMN:OM PAK:PK PAN:PA PER:PE PHL:PH PNG:PG POL:PL PRI:PR PRK:KP
  PRT:PT PRY:PY QAT:QA ROU:RO RUS:RU RWA:RW ESH:EH SAU:SA SDN:SD SSD:SS SEN:SN
  SLB:SB SLE:SL SLV:SV SOM:SO SRB:RS SUR:SR SVK:SK SVN:SI SWE:SE SWZ:SZ SYR:SY
  TCD:TD TGO:TG THA:TH TJK:TJ TKM:TM TLS:TL TTO:TT TUN:TN TUR:TR TWN:TW TZA:TZ
  UGA:UG UKR:UA URY:UY USA:US UZB:UZ VEN:VE VNM:VN VUT:VU PSE:PS YEM:YE ZAF:ZA
  ZMB:ZM ZWE:ZW`
    .trim()
    .split(/\s+/)
    .map((entry) => entry.split(':'))
);

const flagEmojiForCountry = (feature: any) => {
  const iso2 = iso2ByIso3[feature.id];

  if (iso2) {
    return String.fromCodePoint(...iso2.split('').map((letter: string) => 0x1f1a5 + letter.charCodeAt(0)));
  }

  // These two features share a placeholder GeoJSON ID, so use their names.
  return feature.properties?.name === 'Northern Cyprus' ? '🇨🇾' : feature.properties?.name === 'Somaliland' ? '🇸🇴' : '';
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
    if (!cartoBasemapKey) {
      console.warn('CARTO basemap key is not configured. Set NEXT_PUBLIC_CARTO_BASEMAP_KEY to remove the CARTO watermark.');
    }

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
      const flag = flagEmojiForCountry(feature);

      layer.bindTooltip(
        `<strong>${flag ? `${flag} ` : ''}${name}</strong>${isVisited ? ' <span class="visited-badge">Visited</span>' : ''}`,
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
