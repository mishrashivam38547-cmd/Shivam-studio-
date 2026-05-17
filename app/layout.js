import { Analytics } from '@vercel/analytics/react';
import Script from 'next/script';

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        {/* आपका Monetag वेरिफिकेशन टैग */}
        <meta name="monetag" content="c12f9ee2dc743b905812bb84de581dc8" />
        
        {/* आपका Monetag In-Page Push विज्ञापन कोड */}
        <Script 
          id="monetag-ad"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              (function(s){
                s.dataset.zone='11018734';
                s.src='https://nap5k.com/tag.min.js';
              })([document.documentElement, document.body].filter(Boolean).pop().appendChild(document.createElement('script')));
            `
          }}
        />
      </head>
      <body>
        {children}
        <Analytics />
      </body>
    </html>
  );
}
