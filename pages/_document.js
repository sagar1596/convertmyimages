import { Html, Head, Main, NextScript } from 'next/document'
import Script from 'next/script';

export default function Document() {
  return (
    <Html>
      <Head>
      <Script async strategy="afterInteractive" src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-7914014072217717"
     crossOrigin="anonymous" data-checked-head="true"></Script>
    </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}