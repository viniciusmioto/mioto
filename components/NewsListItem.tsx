import { NewsItem } from '../lib/data';

interface NewsListItemProps {
  newsItem: NewsItem;
}

export function NewsListItem({ newsItem }: NewsListItemProps) {
  return (
    <div className="news-list-item" style={{ display: 'flex', gap: '0.5rem', alignItems: 'baseline', fontSize: '0.95rem', lineHeight: '1.4' }}>
      <span style={{ color: 'var(--text-muted)', fontStyle: 'italic', whiteSpace: 'nowrap' }}>
        {newsItem.date}
      </span>
      <span style={{ color: 'var(--text-muted)' }}>—</span>
      <div 
        className="news-headline"
        style={{ margin: 0 }}
        dangerouslySetInnerHTML={{ __html: newsItem.headline }} 
      />
    </div>
  );
}
