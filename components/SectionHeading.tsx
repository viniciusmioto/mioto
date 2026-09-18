interface SectionHeadingProps {
  title: string;
  description?: string;
  /**
   * 'section' renders the CLI-style prompt heading used to label page
   * sections. 'title' is for real titles (page and entry headings), which stay
   * in the UI font with their original casing.
   */
  variant?: 'section' | 'title';
}

export function SectionHeading({ title, description, variant = 'section' }: SectionHeadingProps) {
  const className = variant === 'title' ? 'section-heading section-heading--title' : 'section-heading';

  return (
    <div className={className}>
      <h2>{title}</h2>
      {description ? <p>{description}</p> : null}
    </div>
  );
}
