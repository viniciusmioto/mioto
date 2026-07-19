'use client';

import dynamic from 'next/dynamic';
import { VisitedCity } from '../lib/data';

interface TravelMapProps {
  cities: VisitedCity[];
}

const DynamicTravelMap = dynamic(
  () => import('./TravelMapInner').then((mod) => mod.TravelMapInner),
  {
    ssr: false,
    loading: () => (
      <div className="travel-map-loading">
        <div className="map-spinner"></div>
        <p>Loading Interactive Travel Map...</p>
      </div>
    ),
  }
);

export function TravelMap({ cities }: TravelMapProps) {
  return <DynamicTravelMap cities={cities} />;
}
