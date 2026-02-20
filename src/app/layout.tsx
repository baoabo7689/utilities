import type { Metadata } from 'next';

import '../../public/styles/globals.css';
import Header from '@/components/Header';
import { LanguageProvider } from '@/context/LanguageContext';

export const metadata: Metadata = {
  title: 'Utilities',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="h-full">
      <body className="min-h-screen">
        <LanguageProvider>
          <div className="flex min-h-screen flex-col h-full">
            <Header />
            {children}
          </div>
        </LanguageProvider>
      </body>
    </html>
  );
}
