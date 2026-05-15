export const metadata = {
  title: 'Shivam Studio',
  description: 'Anime and APK Store',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body style={{ margin: 0, padding: 0 }}>{children}</body>
    </html>
  )
}
