import Image from 'next/image';
import Link from 'next/link';
import type { ReactNode } from 'react';

export interface PortfolioImage {
  src: string;
  alt: string;
  caption?: string;
  contain?: boolean;
}

export interface PortfolioLink {
  label: string;
  href: string;
}

interface PortfolioProjectProps {
  id: string;
  title: string;
  context: string;
  date?: string;
  summary: string;
  images: PortfolioImage[];
  tags: string[];
  links?: PortfolioLink[];
  children?: ReactNode;
}

export function PortfolioProject({
  id,
  title,
  context,
  date,
  summary,
  images,
  tags,
  links = [],
  children,
}: PortfolioProjectProps) {
  const hasGallery = images.length > 1;

  return (
    <article className="portfolio-project" id={id}>
      <div className="portfolio-project-layout">
        <div className={`portfolio-project-gallery${hasGallery ? ' portfolio-project-gallery--multiple' : ''}`}>
          {images.map((image, index) => (
            <figure className="portfolio-project-figure" key={`${image.src}-${index}`}>
              <div className="portfolio-project-image-frame">
                <Image
                  src={image.src}
                  alt={image.alt}
                  fill
                  sizes={hasGallery ? '(max-width: 760px) 50vw, 24vw' : '(max-width: 900px) 100vw, 42vw'}
                  className={image.contain ? 'portfolio-project-image portfolio-project-image--contain' : 'portfolio-project-image'}
                />
              </div>
              {image.caption ? <figcaption>{image.caption}</figcaption> : null}
            </figure>
          ))}
        </div>

        <div className="portfolio-project-copy">
          <p className="portfolio-project-context">
            <span>{context}</span>
            {date ? <time>{date}</time> : null}
          </p>
          <h3>{title}</h3>
          <p className="portfolio-project-summary">{summary}</p>

          {children ? <div className="portfolio-project-body">{children}</div> : null}

          <div className="tag-list" aria-label="Technologies and topics">
            {tags.map((tag) => (
              <span key={tag} className="tag">{tag}</span>
            ))}
          </div>

          {links.length > 0 ? (
            <div className="project-links">
              {links.map((link) => (
                link.href.startsWith('/') ? (
                  <Link className="meta-link" href={link.href} key={link.href}>
                    {link.label}
                  </Link>
                ) : (
                  <a className="meta-link" href={link.href} target="_blank" rel="noreferrer" key={link.href}>
                    {link.label}
                  </a>
                )
              ))}
            </div>
          ) : null}
        </div>
      </div>
    </article>
  );
}
