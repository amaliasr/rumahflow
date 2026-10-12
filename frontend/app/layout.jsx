import './globals.css';

export const metadata = {
  title: 'RumahFlow · Keuangan rumah tangga',
  description: 'Catatan keuangan rumah tangga, rekening, dan kartu kredit dalam satu tempat.',
  icons: { icon: '/assets/favicon.svg' },
};

export const viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: '#7964d5',
};

export default function RootLayout({ children }) {
  return (
    <html lang="id" data-theme="light" suppressHydrationWarning>
      <body>{children}</body>
    </html>
  );
}
