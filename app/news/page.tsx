import Link from 'next/link';
import { getAllNews } from '../../lib/content';
import { SectionHeading } from '../../components/SectionHeading';
import { NewsListItem } from '../../components/NewsListItem';

export default async function NewsPage() {
  const news = await getAllNews();

  return (
    <div className="page-shell">
      <SectionHeading title="All News" />
      
      {news.length === 0 ? (
        <div className="empty-state">
          <p>No news items are available yet.</p>
        </div>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
          {news.map((newsItem, index) => (
            <NewsListItem key={index} newsItem={newsItem} />
          ))}
        </div>
      )}
      
      <div className="page-actions" style={{ marginTop: '2rem' }}>
        <Link className="button" href="/">Back to home</Link>
      </div>
    </div>
  );
}
