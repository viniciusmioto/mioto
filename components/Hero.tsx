import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faAt,
  faGraduationCap,
  faMapMarkerAlt,
} from "@fortawesome/free-solid-svg-icons";
import {
  faGithub,
  faLinkedin,
  faGoogleScholar,
  faOrcid,
} from "@fortawesome/free-brands-svg-icons";
import { AuthorProfile } from "../lib/data";
import Image from "next/image";

interface HeroProps {
  author: AuthorProfile;
  children?: React.ReactNode;
}

export function Hero({ author, children }: HeroProps) {
  const socialLinks = [
    { href: author.github, label: "GitHub", icon: faGithub },
    { href: author.linkedin, label: "LinkedIn", icon: faLinkedin },
    { href: author.scholar, label: "Google Scholar", icon: faGoogleScholar },
    { href: author.orcid, label: "ORCID", icon: faOrcid },
  ];

  return (
    <section className="hero">
      <div className="hero-image">
        <Image
          src={author.avatar}
          alt={`Profile photo of ${author.name}`}
          width={320}
          height={320}
          priority
        />
        <h1 className="hero-name">{author.name}</h1>
        <p className="hero-role">{author.role}</p>
        {author.organizations?.length > 0 && (
          <div className="hero-organizations" aria-label="Organizations">
            {author.organizations.map((organization) => (
              <a
                key={organization.name}
                href={organization.url}
                target="_blank"
                rel="noopener noreferrer"
                className="hero-organization"
              >
                {organization.name}
              </a>
            ))}
          </div>
        )}
        {author.location && <p className="hero-location">{author.location}</p>}
        <div className="social-links">
          {socialLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              title={link.label}
              className="social-icon"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FontAwesomeIcon icon={link.icon} />
            </a>
          ))}
        </div>
        <Image
          src="/mioto_image.png"
          alt="Email Address"
          className="hero-email-image"
          width={240}
          height={40}
        />
      </div>
      <div className="hero-copy">
        <div className="hero-description">{children}</div>
        <div className="hero-details">
          <div className="hero-detail">
            <h3>Education</h3>
            {author.education.map((edu) => (
              <div key={edu.area} className="education-entry">
                <p className="education-degree">🎓 {edu.area}</p>
                <p className="education-institution">{edu.institution}</p>
                <p className="education-dates">
                  {edu.date_start.slice(0, 4)} — {edu.date_end.slice(0, 4)}
                </p>
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
