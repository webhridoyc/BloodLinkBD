
import type { Metadata } from 'next';
import { Geist, Geist_Mono, Yellowtail } from 'next/font/google';
import './globals.css';
import { Providers } from '@/components/Providers';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { cn } from '@/lib/utils';
import { SupportChatWidget } from '@/components/chatbot/SupportChatWidget'; // Added import

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

const signatureFont = Yellowtail({
  variable: '--font-signature',
  subsets: ['latin'],
  weight: '400',
});

export const metadata: Metadata = {
  title: 'Hridoy Chondro | Portfolio',
  description: 'Portfolio of Hridoy Chondro, Graphic Designer & Digital Marketer.',
  // manifest: '/manifest.json', // Add if you have a manifest.json for PWA features
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) { 
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        suppressHydrationWarning={true}
        className={cn(
          "min-h-screen bg-background font-sans antialiased flex flex-col overflow-x-hidden",
          geistSans.variable,
          geistMono.variable,
          signatureFont.variable
        )}
      >
        <Providers>
          <Header />
          <main className="flex-grow container mx-auto px-4 py-8">
            {children}
          </main>
          <Footer />
          <SupportChatWidget /> {/* Added Chat Widget */}
        </Providers>
      </body>
    </html>
  );
}
