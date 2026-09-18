import { NewsItem } from '../lib/data';

interface NewsListItemProps {
  newsItem: NewsItem;
}

export function NewsListItem({ newsItem }: NewsListItemProps) {
  return (
    <div className="news-list-item">
      <span className="news-date">{newsItem.date}</span>
      <span className="news-separator" aria-hidden="true">—</span>
      <div
        className="news-headline"
        dangerouslySetInnerHTML={{ __html: newsItem.headline }}
      />
    </div>
  );
}
