import type { Metadata } from 'next';
import './globals.css';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import DecorativeElements from '@/components/layout/DecorativeElements';

export const metadata: Metadata = {
  title: 'Aulia Farhan Hanif | Fullstack Developer',
  description: "Fullstack Developer with a hobby of creating apps to make people's lives easier. ",
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
        <div className="min-h-screen bg-purple-100 relative overflow-hidden">
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