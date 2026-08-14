import type { Metadata } from 'next';
import './globals.css';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import ChatWidgetWrapper from '@/components/ChatWidgetWrapper';

export const metadata: Metadata = {
  title: 'Skill Gap Analysis',
  description:
    'Skill Gap Analysis at Daffodil Smart City (DSC), Birulia, Savar, Dhaka-1216 - Premier coaching institute. Book your free demo class today.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="min-h-screen flex flex-col font-sans antialiased bg-slate-50 text-slate-900" suppressHydrationWarning>
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />
        <ChatWidgetWrapper />
      </body>
    </html>
  );
}
