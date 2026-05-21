import Link from 'next/link';
import { author } from '../../lib/data';
import { SectionHeading } from '../../components/SectionHeading';

export default function CVPage() {
  return (
    <div className="page-shell">
      <SectionHeading title="Curriculum Vitae" description="Education, work experience, and professional background." />

      <section className="panel-block">
        <h2>About</h2>
        <p>{author.description}</p>
      </section>

      <section className="panel-block">
        <h2>Education</h2>
        <div className="timeline-list">
          {author.education.map((item) => (
            <div key={item.area} className="timeline-item">
              <strong>{item.area}</strong>
              <span>{item.institution}</span>
              <span>{item.date_start} — {item.date_end}</span>
            </div>
          ))}
        </div>
      </section>

      <section className="panel-block">
        <h2>Work</h2>
        <div className="timeline-list">
          {author.work.map((item) => (
            <div key={`${item.position}-${item.company_name}`} className="timeline-item">
              <strong>{item.position}</strong>
              <span><a href={item.company_url} target="_blank" rel="noreferrer">{item.company_name}</a></span>
              <span>{item.date_start} — {item.date_end ?? 'Present'}</span>
            </div>
          ))}
        </div>
      </section>

      <section className="panel-block">
        <h2>Contact</h2>
        <p>
          <a className="meta-link" href={`mailto:${author.email}`}>Email</a>
          <a className="meta-link" href={author.github} target="_blank" rel="noreferrer">GitHub</a>
          <a className="meta-link" href={author.linkedin} target="_blank" rel="noreferrer">LinkedIn</a>
        </p>
      </section>

      <div className="page-actions">
        <Link className="button" href="/">Back to home</Link>
      </div>
    </div>
  );
}
