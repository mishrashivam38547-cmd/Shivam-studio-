import { Analytics } from '@vercel/analytics/react';
import Script from 'next/script';

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
      </head>
      <body>
        {children}
        <Analytics />
      </body>
    </html>
  );
}
