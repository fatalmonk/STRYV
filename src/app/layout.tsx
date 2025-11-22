import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
    title: 'STRYV - Modern Football Streetwear',
    description: 'High-performance football-heritage-inspired streetwear brand. Vintage collections and iconic moments.',
    keywords: ['football', 'streetwear', 'vintage', 'sports apparel', 'STRYV'],
}

export default function RootLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <html lang="en">
            <body>{children}</body>
        </html>
    )
}
