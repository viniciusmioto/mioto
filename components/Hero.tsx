import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAt } from '@fortawesome/free-solid-svg-icons';
import { faGithub, faLinkedin, faGoogleScholar, faOrcid } from '@fortawesome/free-brands-svg-icons';
import { author } from '../lib/data';

export function Hero() {
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
        <img src="/avatar.jpg" alt="Profile photo of Vinicius Mioto" />
      </div>
      <div className="hero-copy">
        <p className="eyebrow">Hi, I'm</p>
        <h1>{author.name}</h1>
        <p className="hero-description">
          {author.role} at {author.organizations[0].name}, building research and tools for AI, data science, software engineering, and network science.
        </p>
        <div className="hero-actions">
          <Link className="button" href="/cv">
            View CV
          </Link>
          <div className="social-links">
            {socialLinks.map((link) => (
              <a key={link.label} href={link.href} title={link.label} className="social-icon">
                <FontAwesomeIcon icon={link.icon} />
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
