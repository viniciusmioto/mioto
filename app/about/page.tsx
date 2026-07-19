import { Metadata } from 'next';
import { getVisitedCities } from '../../lib/content';
import { TravelMap } from '../../components/TravelMap';
import { SectionHeading } from '../../components/SectionHeading';
import { VisitedCity } from '../../lib/data';
import BioContent from '../../content/about.md';

export const metadata: Metadata = {
  title: 'About Me | Vinicius Mioto',
  description: 'Bio and interactive travel map visualizing visited destinations.',
};

export default function AboutPage() {
  const cities = getVisitedCities();

  // Group cities by country
  const citiesByCountry = cities.reduce<Record<string, VisitedCity[]>>((acc, city) => {
    if (!acc[city.country]) {
      acc[city.country] = [];
    }
    acc[city.country].push(city);
    return acc;
  }, {});

  const sortedCountries = Object.keys(citiesByCountry).sort((a, b) => {
    const countA = citiesByCountry[a].length;
    const countB = citiesByCountry[b].length;
    if (countB !== countA) {
      return countB - countA; // Descending order of visited cities count
    }
    return a.localeCompare(b); // Alphabetical tie-breaker
  });

  const totalCountries = sortedCountries.length;
  const totalCities = cities.length;

  return (
    <div className="page-shell">
      {/* Short Bio Section */}
      <section style={{ marginBottom: '3rem' }}>
        <div className="bio-article-content">
          <BioContent />
        </div>
      </section>

      {/* Travel Map Section */}
      <section style={{ marginBottom: '2.5rem' }}>
        <SectionHeading
          title="🗺️ Travel Map"
        />
        <TravelMap cities={cities} />
      </section>

      {/* Visited Destinations breakdown */}
      <section style={{ marginBottom: '2rem' }}>
        <div className="travel-table-wrapper" style={{ overflowX: 'auto', marginTop: '1.5rem' }}>
          <table className="travel-table" style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
            <thead>
              <tr style={{ borderBottom: '1px solid var(--border-color)', color: 'var(--text-primary)' }}>
                <th style={{ padding: '0.75rem 1rem', fontWeight: '600' }}>Country</th>
                <th style={{ padding: '0.75rem 1rem', fontWeight: '600', textAlign: 'right' }}>Cities Visited</th>
              </tr>
            </thead>
            <tbody>
              {sortedCountries.map((country) => {
                const countryCities = citiesByCountry[country];
                const flag = countryCities[0]?.flag || '🏳️';

                return (
                  <tr key={country} style={{ borderBottom: '1px solid rgba(255, 255, 255, 0.05)' }}>
                    <td style={{ padding: '0.85rem 1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                      <span style={{ fontSize: '1.2rem' }}>{flag}</span>
                      <span>{country}</span>
                    </td>
                    <td style={{ padding: '0.85rem 1rem', textAlign: 'right', fontWeight: '500', color: 'var(--accent-blue)' }}>
                      {citiesByCountry[country].length}
                    </td>
                  </tr>
                );
              })}
              {/* Total Row */}
              <tr style={{ borderTop: '2px solid var(--border-color)', fontWeight: '700', color: 'var(--text-primary)', background: 'rgba(255, 255, 255, 0.02)' }}>
                <td style={{ padding: '1rem' }}>
                  Total: {totalCountries} {totalCountries === 1 ? 'country' : 'countries'}
                </td>
                <td style={{ padding: '1rem', textAlign: 'right', color: 'var(--accent-blue)' }}>
                  {totalCities} {totalCities === 1 ? 'city' : 'cities'}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}
