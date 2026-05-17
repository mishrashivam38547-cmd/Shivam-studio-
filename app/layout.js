import { Analytics } from '@vercel/analytics/react';

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        {/* यहाँ आपका Monetag का कोड जुड़ गया है */}
        <meta name="monetag" content="c12f9ee2dc743b905812bb84de581dc8" />
      </head>
      <body>
        {children}
        <Analytics />
      </body>
    </html>
  );
}
