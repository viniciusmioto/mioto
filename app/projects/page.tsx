import type { Metadata } from 'next';
import Link from 'next/link';
import { PortfolioProject } from '../../components/PortfolioProject';
import { SectionHeading } from '../../components/SectionHeading';

export const metadata: Metadata = {
  title: 'Portfolio | Vinicius Mioto',
  description: 'Selected research, software engineering, community, and visual design work by Vinicius Mioto.',
};

export default function ProjectsPage() {
  return (
    <div className="page-shell">
      <section>
        <div className="bio-article-content portfolio-intro">
          <h1>portfolio</h1>
          <p>
            I like projects that sit between research and implementation: understanding a
            problem, building something concrete, and documenting what I learned along the
            way. This page brings together the work that best represents that path so far.
          </p>
          <p>
            The first projects are part of my current master&apos;s work at Concordia University.
            The rest moves through my bachelor&apos;s research, community work, visual design,
            and a few course projects that made computer-science concepts much more tangible.
          </p>
        </div>
      </section>

      <section className="portfolio-group">
        <SectionHeading
          title="Current work"
          description="Research software I am developing with the Ptidej Team during my master's."
        />
        <div className="portfolio-project-list">
          <PortfolioProject
            id="citydata"
            title="CITYdata"
            context="Master's research · Concordia University"
            date="2026–present"
            summary="A middleware for turning heterogeneous urban datasets into reusable, composable data services."
            images={[
              {
                src: '/projects/citydata/featured.png',
                alt: 'Simplified CITYdata architecture showing middleware, runners, producers, operations, and data sources',
                caption: 'Simplified CITYdata architecture from the project repository.',
                contain: true,
              },
            ]}
            tags={['Java 21', 'Spring Boot', 'REST APIs', 'Apache POI', 'JUnit', 'Smart Cities']}
            links={[
              { label: 'GitHub', href: 'https://github.com/ptidejteam/tools4cities-CITYdata' },
              { label: 'Documentation', href: 'https://tools4cities-wiki.readthedocs.io/en/latest/citydata/index.html' },
              { label: 'TOOLS4CITIES', href: 'https://tools4cities.org/' },
            ]}
          >
            <p>
              Cities generate a great deal of useful data, but it rarely arrives in one clean
              format. As a research assistant and software contributor, I work on CITYdata,
              the data middleware in the TOOLS4CITIES ecosystem. Its producers retrieve data,
              operations transform it, and runners coordinate the workflow before results are
              exposed through an API.
            </p>
            <p>
              My current contribution extends its data-source support with JPG and XLSX
              producers. This includes workbook parsing, metadata-aware access, reuse of
              existing CSV operations, and automated tests. The work is active and still being
              integrated into the wider middleware.
            </p>
          </PortfolioProject>

          <PortfolioProject
            id="crvja"
            title="CRVJA"
            context="Master's research · Ptidej Team"
            date="2026–present"
            summary="A browser-based tool suite for writing, running, and preserving AMOS programs and games from the Commodore Amiga."
            images={[
              {
                src: '/projects/crvja/featured.png',
                alt: 'CINA browser IDE running an AMOS Pac-Man example beside its source code',
                caption: 'The CINA IDE running an AMOS Pac-Man example in the browser.',
                contain: true,
              },
            ]}
            tags={['Next.js', 'React', 'Express', 'ANTLR4', 'JavaScript', 'Software Preservation']}
            links={[
              { label: 'Live tool', href: 'https://crvja.reanimate.school/' },
              { label: 'Front-end', href: 'https://github.com/ptidejteam/reanimate-CRVJA-frontend' },
              { label: 'Back-end', href: 'https://github.com/ptidejteam/reanimate-CRVJA-backend' },
              { label: 'v2 release article', href: 'https://blog.ptidej.net/the-release-of-crvja-v2/' },
            ]}
          >
            <p>
              Old software does not have to disappear with its original hardware. CRVJA
              transpiles AMOS BASIC into browser JavaScript and provides CINA, a Workbench-style
              IDE for editing and running the result. The suite also handles AMOS binaries and
              sprite banks used by preserved games.
            </p>
            <p>
              I implemented much of the v2 architecture: a standalone, versioned Express
              back-end; its integration with the CINA front-end; and metadata-based transpiler
              selection so older projects keep running with the version they were built for.
              I also worked on language support, tests, interface improvements, and fixes for
              games used during ReAnimate 2026.
            </p>
          </PortfolioProject>
        </div>
      </section>

      <section className="portfolio-group">
        <SectionHeading
          title="Research & community"
          description="Research that became publications, tools built with student groups, and work beyond code."
        />
        <div className="portfolio-project-list">
          <PortfolioProject
            id="beyond-boundaries"
            title="Beyond Boundaries"
            context="Bachelor's thesis · Network science"
            date="2024–2025"
            summary="A reproducible study of international and cross-subfield collaboration in Brazilian computer science."
            images={[
              {
                src: '/projects/network_science/featured.png',
                alt: 'World map connected by a research collaboration network centered on Brazil',
                caption: 'Brazilian computer-science collaboration viewed as an international network.',
              },
            ]}
            tags={['Python', 'OpenAlex', 'NetworkX', 'Gephi', 'Scientometrics', 'Data Science']}
            links={[
              {
                label: 'Bachelor thesis',
                href: 'https://www.inf.ufpr.br/bcc/tcc/2025/2025%20Beyond%20Boundaries%20-%20Collaboration%20Networks%20And%20Research%20Output%20In%20Brazilian%20Computer%20Science.pdf',
              },
              { label: 'BraSNAM paper', href: 'https://doi.org/10.5753/brasnam.2025.8329' },
              { label: 'Reproducibility code', href: 'https://github.com/viniciusmioto/beyond_boundaries' },
            ]}
          >
            <p>
              For my bachelor&apos;s thesis, I built an OpenAlex pipeline covering 2015–2024 and
              used bibliometric and network analysis to study how Brazilian computer-science
              researchers collaborate across countries and subfields. The cleaned analysis
              covers 68,142 publications and 128,847 authors.
            </p>
            <p>
              Roughly three quarters of the publications were domestic-only. Internationally
              co-authored work was associated with higher citation counts, while the network
              structure revealed substantial differences between subfields and a small number
              of bridge researchers connecting otherwise separate communities. An earlier
              version of the study was published at BraSNAM 2025.
            </p>
          </PortfolioProject>

          <PortfolioProject
            id="adega"
            title="ADEGA"
            context="PET Computação UFPR · Data & software"
            date="2021"
            summary="A Django system that turns academic records into decision-support views for university course coordinators."
            images={[
              {
                src: '/projects/adega/featured.png',
                alt: 'ADEGA interface displaying academic records and charts',
                caption: 'One of the academic-analysis views in ADEGA.',
                contain: true,
              },
            ]}
            tags={['Python', 'Django', 'Data Science', 'Education', 'Software Engineering']}
            links={[
              { label: 'Live system', href: 'https://adega.c3sl.ufpr.br/' },
              { label: 'Published paper', href: 'https://doi.org/10.5902/2448190467933' },
            ]}
          >
            <p>
              ADEGA—<em>Análise de Dados Estatísticos da Grade Acadêmica</em>—was developed by
              students from PET Computação at UFPR. It transforms grade and attendance histories
              into charts, tables, and other views that are not normally available in academic
              management systems.
            </p>
            <p>
              The tool supports decisions around failure patterns, internship eligibility,
              prerequisites, equivalencies, and students at risk of compulsory withdrawal. I
              contributed to the project while working with PET Computação, and the team later
              published a paper describing the system and its use in higher education.
            </p>
          </PortfolioProject>

          <PortfolioProject
            id="enactus"
            title="Enactus UFPR"
            context="Community · Marketing & IT"
            date="2021–2022"
            summary="Communication and technology work for a student team focused on social entrepreneurship."
            images={[
              {
                src: '/projects/enactus/featured.svg',
                alt: 'Enactus logo',
                caption: 'Enactus UFPR was an important part of my undergraduate community work.',
                contain: true,
              },
            ]}
            tags={['Social Entrepreneurship', 'Communication', 'WordPress', 'Events', 'Teamwork']}
            links={[
              { label: 'Enactus UFPR', href: 'https://enactus.ufpr.br/' },
            ]}
          >
            <p>
              Enactus was one of the places where I learned that a technical background can be
              useful well beyond writing code. I worked with the marketing team, created content
              for social media, helped organise events, and maintained the team&apos;s WordPress site.
            </p>
            <p>
              At the time, the team&apos;s main initiative was ECOlchão, a social project exploring
              how everyday sponges could be recycled as mattress filling. Working with people
              from different courses made this a particularly valuable team experience.
            </p>
          </PortfolioProject>

          <PortfolioProject
            id="design-media"
            title="Visual Design & Video Editing"
            context="Creative work"
            summary="Logos, sports identities, merchandise artwork, and video editing alongside my technical work."
            images={[
              {
                src: '/design/bcc_2.jpg',
                alt: 'UFPR Computer Science bull logo with circuit-board linework',
                caption: 'UFPR Computer Science identity.',
                contain: true,
              },
              {
                src: '/design/volley.jpg',
                alt: 'Blue fox wrapping around a volleyball on a yellow field',
                caption: 'Volleyball team identity.',
                contain: true,
              },
              {
                src: '/design/ptidej_logo.png',
                alt: 'Black and grey Ptidej typographic logo',
                caption: 'Ptidej logo.',
                contain: true,
              },
              {
                src: '/design/jersey_2.png',
                alt: 'Black sports jersey carrying the Ptidej logo',
                caption: 'Ptidej jersey application.',
                contain: true,
              },
            ]}
            tags={['Logo Design', 'Apparel', 'Merchandise', 'Video Editing', 'Social Media']}
          >
            <p>
              I also enjoy visual work. During my bachelor&apos;s, some of the logos and graphics I
              designed for the Computer Science class and its teams became real jerseys, mugs,
              T-shirts, and hoodies. I like the challenge of reducing a group&apos;s personality to
              a mark that still works when printed, embroidered, or seen from a distance.
            </p>
            <p>
              The gallery also includes a Ptidej logo and its application on a jersey. Beyond
              static graphics, I edit short videos for Instagram and TikTok, and I edited the
              video shown during my bachelor&apos;s graduation ceremony. It is a different kind
              of problem solving, but one I genuinely enjoy.
            </p>
          </PortfolioProject>
        </div>
      </section>

      <section className="portfolio-group">
        <SectionHeading
          title="Bachelor course projects"
          description="Smaller projects from UFPR courses, kept here for the computer-science ideas they made concrete."
        />
        <div className="portfolio-project-list">
          <PortfolioProject
            id="finta"
            title="FINTA"
            context="Bachelor course project · Football analytics"
            date="2023"
            summary="A C++ terminal application for exploring nine seasons of Brazilian Série A results and statistics."
            images={[
              {
                src: '/projects/finta/featured.png',
                alt: 'FINTA terminal interface showing the Brazilian football league table and qualification zones',
                caption: 'League standings and competition zones in FINTA.',
                contain: true,
              },
            ]}
            tags={['C++20', 'Boost', 'JSON', 'Object-Oriented Design', 'Football Data']}
            links={[
              { label: 'GitHub', href: 'https://github.com/viniciusmioto/finta_cpp' },
            ]}
          >
            <p>
              Football is one of the subjects I never get tired of, so during my bachelor&apos;s I
              turned it into a course project. FINTA reads Brasileirão data from 2014–2022 and
              lets users explore league tables, rounds, team results, detailed match statistics,
              players, cards, goals, and coaching records.
            </p>
            <p>
              I modelled leagues, teams, matches, people, events, and statistics as C++ objects,
              then used Boost.PropertyTree to process the JSON dataset.
            </p>
          </PortfolioProject>

          <PortfolioProject
            id="ping-pong-os"
            title="PingPongOS"
            context="Bachelor course project · Operating systems"
            date="2023"
            summary="An incremental implementation of the student portions of a didactic operating system inside a Unix process."
            images={[
              {
                src: '/projects/ping-pong-os/featured.png',
                alt: 'Terminal output from the PingPongOS virtual disk manager exercise',
                caption: 'Testing the asynchronous virtual-disk manager in PingPongOS.',
                contain: true,
              },
            ]}
            tags={['C', 'POSIX', 'Scheduling', 'Concurrency', 'Systems Programming']}
            links={[
              { label: 'GitHub', href: 'https://github.com/viniciusmioto/ping-pong-os' },
              { label: 'Course specification', href: 'https://wiki.inf.ufpr.br/maziero/doku.php?id=so:pingpongos' },
            ]}
          >
            <p>
              In an Operating Systems course, I implemented the student components of
              PingPongOS, a didactic system designed by Prof. Carlos Maziero at UFPR. Across
              thirteen stages, the project grew from a circular queue and task contexts into
              a user-level threading environment with a dispatcher and scheduler.
            </p>
            <p>
              Later stages added priority aging, timer-driven preemption, task accounting,
              semaphores, message queues, and an asynchronous virtual-disk manager. It was one
              of the projects that made operating-system concepts feel much less abstract.
            </p>
          </PortfolioProject>

          <PortfolioProject
            id="backup-system"
            title="File Backup over Raw Ethernet"
            context="Bachelor course project · Computer networks"
            date="2023"
            summary="A C++ client-server system for backing up and restoring binary files directly over Ethernet raw sockets."
            images={[
              {
                src: '/projects/backup-system/featured.png',
                alt: 'Two terminal windows showing a file transferred between the backup client and server',
                caption: 'A client and server completing a file backup over the custom protocol.',
                contain: true,
              },
            ]}
            tags={['C++', 'Raw Sockets', 'Ethernet', 'Protocol Design', 'OpenSSL']}
            links={[
              { label: 'GitHub', href: 'https://github.com/viniciusmioto/backup_system' },
            ]}
          >
            <p>
              For a Computer Networks course, Pedro H. Kochinski and I built a backup system
              that transfers files without relying on TCP or UDP. We defined a compact frame
              format and implemented Stop-and-Wait delivery with sequence numbers,
              acknowledgements, timeouts, duplicate handling, and retransmission.
            </p>
            <p>
              The system handles binary files and groups of files, detects transmission errors
              with parity, and verifies completed backups with MD5. It can run between two
              cable-connected Linux machines or through the loopback interface for testing.
            </p>
          </PortfolioProject>
        </div>
      </section>

      <div className="page-actions">
        <a className="button button-secondary" href="https://github.com/viniciusmioto" target="_blank" rel="noreferrer">
          Browse all GitHub repositories
        </a>
        <Link className="button" href="/">Back to home</Link>
      </div>
    </div>
  );
}
