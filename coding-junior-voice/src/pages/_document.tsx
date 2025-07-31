// ... existing code ...
import { Html, Head, Main, NextScript } from 'next/document';

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        <link rel="manifest" href="/manifest.json" />
        <meta name="theme-color" content="#0070f3" />
        {/* Add icons for PWA */}
        <link rel="icon" href="/icon-192.png" sizes="192x192" />
        <link rel="icon" href="/icon-512.png" sizes="512x512" />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}