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
      <section>
        <div className="bio-article-content">
          <BioContent />
        </div>
      </section>

      {/* Travel Map Section */}
      <section>
        <SectionHeading title="Travel map" />
        <TravelMap cities={cities} />
      </section>

      {/* Visited Destinations breakdown */}
      <section>
        <div className="travel-table-wrapper">
          <table className="travel-table">
            <thead>
              <tr>
                <th>Country</th>
                <th className="is-numeric">Cities Visited</th>
              </tr>
            </thead>
            <tbody>
              {sortedCountries.map((country) => {
                const countryCities = citiesByCountry[country];
                const flag = countryCities[0]?.flag || '🏳️';

                return (
                  <tr key={country}>
                    <td>
                      <span className="country-cell">
                        <span className="country-flag" aria-hidden="true">{flag}</span>
                        <span>{country}</span>
                      </span>
                    </td>
                    <td className="is-numeric">{countryCities.length}</td>
                  </tr>
                );
              })}
              {/* Total Row */}
              <tr className="total-row">
                <td>
                  Total: {totalCountries} {totalCountries === 1 ? 'country' : 'countries'}
                </td>
                <td className="is-numeric">
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
