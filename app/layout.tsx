import type { Metadata } from 'next';
import type { ReactNode } from 'react';
import { JetBrains_Mono } from 'next/font/google';
import '../styles/globals.css';
import { Header } from '../components/Header';
import { Footer } from '../components/Footer';

// One typeface for the whole site. Italic is loaded because prose and news
// headlines use <em>, and a real italic beats a synthesised oblique.
const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  style: ['normal', 'italic'],
  display: 'swap',
  variable: '--font-jetbrains-mono',
});

export const metadata: Metadata = {
  title: 'Vinicius Mioto',
  description: 'Academic portfolio and CV of Vinicius Mioto.',
  icons: {
    icon: '/icon.png',
  },
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" className={jetbrainsMono.variable}>
      <body suppressHydrationWarning>
        <Header />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
