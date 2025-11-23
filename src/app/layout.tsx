import type { Metadata } from 'next';
import { Providers } from '@/components/providers';
import './globals.css';

export const metadata: Metadata = {
  title: {
    default: 'STRYV – Modern Football Streetwear',
    template: '%s | STRYV'
  },
  description:
    'STRYV is a modern football-inspired streetwear brand featuring vintage kits, iconic moments, and premium fan apparel.',
  keywords: ['football', 'streetwear', 'vintage jerseys', 'sportswear', 'STRYV', 'soccer'],
  metadataBase: new URL('https://stryv.vercel.app'), // change to your custom domain when ready
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://stryv.vercel.app',
    siteName: 'STRYV',
    title: 'STRYV – Modern Football Streetwear',
    description:
      'Vintage football-inspired drops, iconic moments and premium fits for real fans.',
    images: [
      {
        url: '/images/hero_og.jpg', // create this image
        width: 1200,
        height: 630,
        alt: 'STRYV – Football Streetwear Hero'
      }
    ]
  },
  twitter: {
    card: 'summary_large_image',
    title: 'STRYV – Modern Football Streetwear',
    description: 'Premium football-inspired streetwear and vintage collections.',
    images: ['/images/hero_og.jpg'],
    creator: '@yourhandle'
  },
  icons: {
    icon: '/favicon.ico',
    shortcut: '/favicon.ico',
    apple: '/apple-touch-icon.png'
  }
};

export default function RootLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}