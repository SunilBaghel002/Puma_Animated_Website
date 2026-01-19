import type { Metadata } from 'next';
import { Rajdhani, Inter } from 'next/font/google';
import './globals.css';

const rajdhani = Rajdhani({
    subsets: ['latin'],
    weight: ['300', '400', '500', '600', '700'],
    variable: '--font-rajdhani',
    display: 'swap',
});

const inter = Inter({
    subsets: ['latin'],
    weight: ['300', '400', '500', '600', '700'],
    variable: '--font-inter',
    display: 'swap',
});

export const metadata: Metadata = {
    title: 'Puma Velocity X | Born to Run',
    description: 'Experience explosive energy return with NITRO™ foam technology and carbon fiber plate propulsion.',
    keywords: ['Puma', 'Velocity X', 'Running Shoes', 'NITRO Foam', 'Carbon Fiber', 'Athletic Shoes'],
    authors: [{ name: 'PUMA' }],
    openGraph: {
        title: 'Puma Velocity X | Born to Run',
        description: 'Experience explosive energy return with NITRO™ foam technology and carbon fiber plate propulsion.',
        type: 'website',
    },
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en" className={`${rajdhani.variable} ${inter.variable}`}>
            <body className="antialiased">
                {children}
            </body>
        </html>
    );
}
