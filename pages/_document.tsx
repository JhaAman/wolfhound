import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        <link
          rel="preload"
          href="/fonts/ibm-plex-sans-var.woff2"
          as="font"
          type="font/woff2"
          crossOrigin="anonymous"
        />
        <link href="/static/favicon_io/favicon.ico" rel="shortcut icon" />
        <link href="/static/favicon_io/site.webmanifest" rel="manifest" />
        <link
          rel="preconnect"
          href="https://cdn.usefathom.com"
          crossOrigin=""
        />
        <link
          href="/static/favicon_io/apple-touch-icon.png"
          rel="apple-touch-icon"
          sizes="180x180"
        />
        <link
          href="/static/favicon_io/favicon-32x32.png"
          rel="icon"
          sizes="32x32"
          type="image/png"
        />
        <link
          href="/static/favicon_io/favicon-16x16.png"
          rel="icon"
          sizes="16x16"
          type="image/png"
        />
        <link
          color="#FE315E"
          href="/static/favicon_io/safari-mask.svg"
          rel="mask-icon"
        />
        <meta content="#FE315E" name="theme-color" />
        <meta content="#FE315E" name="msapplication-TileColor" />
        {/* <meta
          content="/static/favicons/browserconfig.xml"
          name="msapplication-config"
        /> */}
        {/* <meta content="14d2e73487fa6c71" name="yandex-verification" /> */}
        {/* <meta
          content="eZSdmzAXlLkKhNJzfgwDqWORghxnJ8qR9_CHdAh5-xw"
          name="google-site-verification"
        /> */}
      </Head>
      <body className="text-white bg-gray-900">
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
