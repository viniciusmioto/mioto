import Link from 'next/link';

export function Header() {
  return (
    <header className="site-header">
      <div className="container">
        <Link className="brand" href="/">Vinicius Mioto</Link>
        <nav className="site-nav">
          <Link href="/publications">Publications</Link>
          <Link href="/projects">Projects</Link>
          <Link href="/cv">CV</Link>
          <Link href="/talks">Talks</Link>
        </nav>
      </div>
    </header>
  );
}
