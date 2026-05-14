import './globals.css'; // Ye line sabse upar honi chahiye

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <title>Shivam Studio</title>
      </head>
      <body>
        {children}
      </body>
    </html>
  );
}
