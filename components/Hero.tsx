import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAt, faGraduationCap } from '@fortawesome/free-solid-svg-icons';
import { faGithub, faLinkedin, faGoogleScholar, faOrcid } from '@fortawesome/free-brands-svg-icons';
import { AuthorProfile } from '../lib/data';

interface HeroProps {
  author: AuthorProfile;
}

export function Hero({ author }: HeroProps) {
  const socialLinks = [
    { href: `mailto:${author.email}`, label: 'Email', icon: faAt },
    { href: author.github, label: 'GitHub', icon: faGithub },
    { href: author.linkedin, label: 'LinkedIn', icon: faLinkedin },
    { href: author.scholar, label: 'Google Scholar', icon: faGoogleScholar },
    { href: author.orcid, label: 'ORCID', icon: faOrcid },
  ];

  return (
    <section className="hero">
      <div className="hero-image">
        <img src={author.avatar} alt={`Profile photo of ${author.name}`} />
        <p className="hero-role">{author.role}</p>
        <p className="hero-org">
          <a href={author.organizations[0].url} target="_blank" rel="noreferrer">{author.organizations[0].name}</a>
        </p>
        <div className="social-links">
          {socialLinks.map((link) => (
            <a key={link.label} href={link.href} title={link.label} className="social-icon">
              <FontAwesomeIcon icon={link.icon} />
            </a>
          ))}
        </div>
        <Link className="button" href="/cv">
          View CV
        </Link>
      </div>
      <div className="hero-copy">
        <p className="eyebrow">Hi, I'm</p>
        <h1>{author.name}</h1>
        <p className="hero-description">
          {author.description}
        </p>
        <div className="hero-details">
          <div className="hero-detail">
            <h3>Education</h3>
            {author.education.map((edu) => (
              <div key={edu.area} className="education-entry">
                <p className="education-degree">
                  🎓 {edu.area}
                </p>
                <p className="education-institution">{edu.institution}</p>
                <p className="education-dates">{edu.date_start.slice(0, 4)} — {edu.date_end.slice(0, 4)}</p>
              </div>
            ))}
          </div>
          <div className="hero-detail">
            <h3>Interests</h3>
            <ul>
              {author.interests.map((interest) => (
                <li key={interest}>{interest}</li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
