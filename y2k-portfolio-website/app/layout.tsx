import type { Metadata } from 'next';
import './globals.css';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import DecorativeElements from '@/components/layout/DecorativeElements';

export const metadata: Metadata = {
  title: 'Your Name - Portfolio',
  description: 'Creative developer and designer portfolio with Y2K aesthetic',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <script src="https://cdn.jsdelivr.net/npm/@tailwindcss/browser@4"></script>
      </head>
      <body className="font-mono">
        <div className="min-h-screen bg-linear-to-br from-purple-200 via-pink-200 to-blue-200 relative overflow-hidden">
          <DecorativeElements />
          <Navbar />
          <main className="relative z-10">
            {children}
          </main>
          <Footer />
        </div>
      </body>
    </html>
  );
}